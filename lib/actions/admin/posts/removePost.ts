'use server';
import database from '@/lib/database';
import { revalidatePostCache } from '../../revalidateCache';
import { verifyAuth } from '../auth';

export interface ActionResponse {
    success: boolean;
    message: string;
    oldSlug?: string;
}

export async function removePost(prevState: ActionResponse | undefined, formData: FormData): Promise<ActionResponse> {
    if (!(await verifyAuth())) {
        return { success: false, message: 'Acesso não autorizado.' };
    }

    const slug = formData.get('slug');

    if (typeof slug !== 'string' || !slug) {
        return { success: false, message: 'Não foi fornecido um slug valido para deletar' };
    }

    try {
        const actualPost = await database.post.findUnique({
            where: { slug },
            select: { slug: true, category: { select: { slug: true } } },
        });

        if (!actualPost) {
            return { success: false, message: 'Não foi possivel encontrar esse post' };
        }

        await database.post.delete({ where: { slug } });

        await revalidatePostCache(actualPost.slug, actualPost.category.slug);
        return { success: true, message: 'Post deletado com sucesso!', oldSlug: slug };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: 'Ocorreu um erro inesperado no servidor. Tente novamente mais tarde.' + error,
        };
    }
}
