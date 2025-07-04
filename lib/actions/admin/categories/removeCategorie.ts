'use server';

import database from '@/lib/database';
import { revalidateCategoryCache } from '../../revalidateCache';
import { verifyAuth } from '../auth';

export interface ActionResponse {
    success: boolean;
    message: string;
    oldSlug?: string;
}

export async function removeCategory(
    prevState: ActionResponse | undefined,
    formData: FormData
): Promise<ActionResponse> {
    if (!(await verifyAuth())) {
        return { success: false, message: 'Acesso não autorizado.' };
    }

    const slug = formData.get('slug');

    if (typeof slug !== 'string') {
        return { success: false, message: 'Não foi fornecido um slug valido para deletar' };
    }

    try {
        const actualCategory = await database.category.findUnique({
            where: { slug },
            select: { slug: true },
        });

        if (!actualCategory) {
            return { success: false, message: 'Não foi possivel encontrar essa categoria' };
        }

        const fallbackCategory = await database.category.upsert({
            where: { slug: 'sem-categoria' },
            update: {},
            create: {
                name: 'Sem categoria',
                slug: 'sem-categoria',
            },
        });

        // Move todos os posts da categoria atual para 'sem categoria'
        await database.post.updateMany({
            where: { category: { slug } },
            data: { categoryId: fallbackCategory.id },
        });

        await database.category.delete({ where: { slug } });

        await revalidateCategoryCache();
        return { success: true, message: 'Categoria deletada com sucesso!', oldSlug: slug };
    } catch (erro) {
        return {
            success: false,
            message: 'Ocorreu um erro inesperado no servidor. Tente novamente mais tarde.' + erro,
        };
    }
}
