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
    originalSlug: z.string(),
});

export async function updateCategoryAction(
    prevState: ActionResponse | undefined,
    formData: FormData
): Promise<ActionResponse> {
    if (!(await verifyAuth())) {
        return { success: false, message: 'Acesso não autorizado.' };
    }

    const originalSlug = formData.get('originalSlug');
    if (typeof originalSlug !== 'string') {
        return { success: false, message: 'Slug original da categoria não fornecido.' };
    }

    const validatedFields = CategorySchema.safeParse({
        name: formData.get('name'),
        slug: formData.get('slug'),
        originalSlug: originalSlug,
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
        if (slug !== originalSlug) {
            const slugInUse = await database.category.findUnique({ where: { slug }, select: { id: true } });
            if (slugInUse) {
                return {
                    success: false,
                    message: 'Erro: Este "slug" já está em uso. Por favor, escolha outro.',
                };
            }
        }

        const category = await database.category.update({
            where: { slug: originalSlug },
            data: {
                name,
                slug,
            },
            select: {
                id: true,
                name: true,
                slug: true,
            },
        });

        revalidateCategoryCache();

        return { success: true, message: `Categoria "${name}" atualizada com sucesso!`, data: category };
    } catch (error) {
        if (error instanceof PrismaType.PrismaClientKnownRequestError && error.code === 'P2002') {
            return { success: false, message: 'Erro: Este "slug" ou "nome" já está em uso.' };
        }

        return { success: false, message: 'Ocorreu um erro inesperado no servidor.' };
    }
}
