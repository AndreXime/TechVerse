'use server';

import { z } from 'zod';
import { revalidatePostCache } from '../../revalidateCache';
import database, { PrismaType } from '@/lib/database';
import { verifyAuth } from '../auth';
import { PostsAdmin } from '@/types/adminProviderTypes';
import { processImage } from '@/lib/processImage';

export interface ActionResponse {
    success: boolean;
    message: string;
    errors?: Record<string, string[]>;
    data?: PostsAdmin;
}

const PostSchema = z.object({
    title: z.string().min(3, { message: 'O título deve ter no mínimo 3 caracteres.' }),
    slug: z
        .string()
        .trim()
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
            message: 'Slug inválido. Use apenas letras minúsculas, números e hífens.',
        }),
    content: z.string().min(10, { message: 'O conteúdo é muito curto.' }),
    description: z.string(),
    authorName: z.string({ required_error: 'O nome do autor é obrigatório.' }),
    categorySlug: z.string({ required_error: 'A categoria é obrigatória.' }),
    originalSlug: z.string(),
});

export async function updatePostAction(
    prevState: ActionResponse | undefined,
    formData: FormData
): Promise<ActionResponse> {
    if (!(await verifyAuth())) {
        return { success: false, message: 'Acesso não autorizado.' };
    }

    // pega o slug original para localizar o registro
    const originalSlug = formData.get('originalSlug');
    if (typeof originalSlug !== 'string') {
        return { success: false, message: 'Slug original não fornecido.' };
    }

    const entries = Object.fromEntries(formData.entries());

    const validated = PostSchema.safeParse(entries);
    if (!validated.success) {
        return {
            success: false,
            message: 'Erro de validação. Verifique os campos.',
            errors: validated.error.flatten().fieldErrors,
        };
    }

    const { title, slug, content, description, authorName, categorySlug } = validated.data;
    const imageFile = formData.get('image') as File | null;

    try {
        const existingPost = await database.post.findUnique({
            where: { slug: originalSlug },
            select: { category: { select: { slug: true } } },
        });

        if (!existingPost) {
            return { success: false, message: 'Erro: O post que você está tentando editar não foi encontrado.' };
        }

        // Se o slug mudou, verificar se o novo já existe
        if (slug !== originalSlug) {
            const slugInUse = await database.post.findUnique({ where: { slug }, select: { id: true } });
            if (slugInUse) {
                return {
                    success: false,
                    message: 'Erro: Este "slug" já está em uso. Por favor, escolha outro.',
                };
            }
        }

        let imageImage: Buffer | undefined;
        if (imageFile instanceof File && imageFile.size > 0) {
            const { imageBuffer, error } = await processImage(imageFile);
            if (error) {
                return { success: false, message: error };
            }
            imageImage = imageBuffer;
        }

        const [author, category] = await Promise.all([
            database.author.findUnique({ where: { name: authorName }, select: { id: true } }),
            database.category.findUnique({ where: { slug: categorySlug }, select: { id: true } }),
        ]);

        if (!author) {
            return { success: false, message: `Erro: Autor "${authorName}" não encontrado.` };
        }
        if (!category) {
            return { success: false, message: `Erro: Categoria "${categorySlug}" não encontrada.` };
        }

        const updated = await database.post.update({
            where: { slug: originalSlug },
            data: {
                title,
                slug,
                content,
                description,
                categoryId: category.id,
                authorId: author.id,
                ...(imageImage ? { image: imageImage } : {}),
            },
            select: {
                title: true,
                content: true,
                slug: true,
                description: true,
                tags: true,
                createdAt: true,
                category: { select: { name: true, slug: true } },
                author: { select: { name: true } },
            },
        });

        await revalidatePostCache(updated.slug, updated.category.slug);
        await revalidatePostCache(originalSlug, existingPost.category.slug);

        return { success: true, message: 'Post atualizado com sucesso!', data: updated };
    } catch (error) {
        if (error instanceof PrismaType.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return { success: false, message: 'Erro: Este "slug" já está em uso. Por favor, escolha outro.' };
            }
            if (error.code === 'P2025') {
                return {
                    success: false,
                    message: 'Erro: O post que você tentou editar não foi encontrado no banco de dados.',
                };
            }
        }
        return {
            success: false,
            message: 'Ocorreu um erro inesperado no servidor. Tente novamente mais tarde.',
        };
    }
}
