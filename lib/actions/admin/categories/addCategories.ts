'use server';

import { z } from 'zod';
import database, { PrismaType } from '@/lib/database';
import { verifyAuth } from '../auth';
import { revalidateCategoryCache } from '../../revalidateCache';
import { CategoryAdmin } from '@/types/adminProviderTypes';

export interface ActionResponse {
    success: boolean;
    message: string;
    errors?: Record<string, string[]>;
    data?: CategoryAdmin;
}

const CategorySchema = z.object({
    name: z.string().min(3, { message: 'O nome deve ter no mínimo 3 caracteres.' }),
    slug: z
        .string()
        .min(3, { message: 'O slug deve ter no mínimo 3 caracteres.' })
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
            message: 'Slug inválido. Use apenas letras minúsculas, números e hífens.',
        }),
});

export async function addCategories(
    prevState: ActionResponse | undefined,
    formData: FormData
): Promise<ActionResponse> {
    if (!(await verifyAuth())) {
        return { success: false, message: 'Acesso não autorizado.' };
    }

    const validatedFields = CategorySchema.safeParse({
        name: formData.get('name'),
        slug: formData.get('slug'),
    });

    if (!validatedFields.success) {
        return {
            success: false,
            message: 'Erro de validação. Verifique os campos.',
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { name, slug } = validatedFields.data;

    try {
        const category = await database.category.create({
            data: {
                name,
                slug,
            },
            select: {
                name: true,
                slug: true,
            },
        });

        revalidateCategoryCache();

        return { success: true, message: `Categoria "${name}" criada com sucesso!`, data: category };
    } catch (error) {
        if (error instanceof PrismaType.PrismaClientKnownRequestError && error.code === 'P2002') {
            return { success: false, message: 'Erro: Este "slug" ou "nome" já está em uso.' };
        }

        return { success: false, message: 'Ocorreu um erro inesperado no servidor.' };
    }
}
