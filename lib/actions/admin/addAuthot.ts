'use server';

import { z } from 'zod';
import database, { PrismaType } from '../../database';
import { verifyAuth } from './auth';
import { revalidatePath } from 'next/cache';

export interface ActionResponse {
    success: boolean;
    message: string;
    errors?: Record<string, string[]>;
}

const AuthorSchema = z.object({
    name: z.string().min(3, { message: 'O nome deve ter no mínimo 3 caracteres.' }),
    role: z.string().min(3, { message: 'O cargo deve ter no mínimo 3 caracteres.' }),
    description: z.string().min(10, { message: 'A descrição precisa ter pelo menos 10 caracteres.' }),
    imageUrl: z.string().url({ message: 'URL da imagem inválida.' }),
    linkedinUrl: z.string().url({ message: 'URL do LinkedIn inválida.' }).optional().or(z.literal('')),
    githubUrl: z.string().url({ message: 'URL do GitHub inválida.' }).optional().or(z.literal('')),
    socialUrl: z.string().url({ message: 'URL da rede social inválida.' }).optional().or(z.literal('')),
});

export async function addAuthorAction(
    prevState: ActionResponse | undefined,
    formData: FormData
): Promise<ActionResponse> {
    if (!(await verifyAuth())) {
        return { success: false, message: 'Acesso não autorizado.' };
    }

    // 3. Validação dos dados do formulário com o schema Zod
    const validatedFields = AuthorSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return {
            success: false,
            message: 'Erro de validação. Verifique os campos informados.',
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const data = validatedFields.data;

    try {
        // 4. Criação do autor no banco de dados
        await database.author.create({
            data: {
                name: data.name,
                jobRole: data.role,
                description: data.description,
                imageUrl: data.imageUrl,
                linkedin: data.linkedinUrl || null,
                github: data.githubUrl || null,
                genericSocial: data.socialUrl || null,
            },
        });

        // 5. Revalidação do Cache
        // Se você tem uma página que lista todos os autores (ex: /autores), revalide-a.
        revalidatePath('/autores');

        return { success: true, message: `Autor "${data.name}" criado com sucesso!` };
    } catch (error) {
        if (error instanceof PrismaType.PrismaClientKnownRequestError && error.code === 'P2002') {
            return { success: false, message: 'Erro: Já existe um autor com este nome.' };
        }

        return { success: false, message: 'Ocorreu um erro inesperado no servidor. Tente novamente.' };
    }
}
