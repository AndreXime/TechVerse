'use server';

import { z } from 'zod';
import database, { PrismaType } from '@/lib/database';
import { verifyAuth } from '../auth';
import { revalidateAuthorCache } from '../../revalidateCache';
import { AuthorsAdmin } from '@/types/adminProviderTypes';
import { processImage } from '@/lib/processImage';

export interface ActionResponse {
    success: boolean;
    message: string;
    errors?: Record<string, string[]>;
    data?: AuthorsAdmin;
}

const AuthorSchema = z.object({
    name: z.string().min(3, { message: 'O nome deve ter no mínimo 3 caracteres.' }),
    jobRole: z.string().min(3, { message: 'O cargo deve ter no mínimo 3 caracteres.' }),
    description: z.string().min(10, { message: 'A descrição precisa ter pelo menos 10 caracteres.' }),
    linkedin: z.string().url({ message: 'URL do LinkedIn inválida.' }).optional().or(z.literal('')),
    github: z.string().url({ message: 'URL do GitHub inválida.' }).optional().or(z.literal('')),
    genericSocial: z.string().url({ message: 'URL da rede social inválida.' }).optional().or(z.literal('')),
    originalName: z.string(),
});

export async function updateAuthorAction(
    prevState: ActionResponse | undefined,
    formData: FormData
): Promise<ActionResponse> {
    if (!(await verifyAuth())) {
        return { success: false, message: 'Acesso não autorizado.' };
    }

    const originalName = formData.get('originalName');
    if (typeof originalName !== 'string') {
        return { success: false, message: 'Nome original do autor não fornecido.' };
    }

    const entries = Object.fromEntries(formData.entries());
    const validatedFields = AuthorSchema.safeParse(entries);

    if (!validatedFields.success) {
        return {
            success: false,
            message: 'Erro de validação. Verifique os campos informados.',
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const data = validatedFields.data;
    const imageFile = formData.get('image') as File | null;

    try {
        if (data.name !== originalName) {
            const nameInUse = await database.author.findUnique({ where: { name: data.name }, select: { id: true } });
            if (nameInUse) {
                return {
                    success: false,
                    message: 'Erro: Este nome já está em uso. Por favor, escolha outro.',
                };
            }
        }

        let imageBuffer: Buffer | undefined;
        if (imageFile instanceof File && imageFile.size > 0) {
            const result = await processImage(imageFile);
            if (result.error) {
                return { success: false, message: result.error };
            }
            imageBuffer = result.imageBuffer;
        }

        const author = await database.author.update({
            where: { name: originalName },
            data: {
                name: data.name,
                jobRole: data.jobRole,
                description: data.description,
                linkedin: data.linkedin || null,
                github: data.github || null,
                genericSocial: data.genericSocial || null,
                ...(imageBuffer ? { image: imageBuffer } : {}),
            },
        });

        await revalidateAuthorCache();

        return { success: true, message: `Autor "${data.name}" atualizado com sucesso!`, data: author };
    } catch (error) {
        if (error instanceof PrismaType.PrismaClientKnownRequestError && error.code === 'P2002') {
            return { success: false, message: 'Erro: Já existe um autor com este nome.' };
        }

        return { success: false, message: 'Ocorreu um erro inesperado no servidor. Tente novamente.' };
    }
}
