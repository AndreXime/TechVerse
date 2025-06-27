'use server';

import { z } from 'zod';
import { revalidatePostCache } from '../revalidateCache';
import database, { PrismaType } from '../../database';
import { verifyAuth } from './auth';

export interface ActionResponse {
    success: boolean;
    message: string;
    errors?: Record<string, string[]>;
    newSlug?: string;
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
    imageUrl: z.string().url({ message: 'URL da imagem inválida.' }).or(z.literal('')),
    authorName: z.string({ required_error: 'O nome do autor é obrigatório.' }),
    categorySlug: z.string({ required_error: 'A categoria é obrigatória.' }),
});

export async function addPostAction(
    prevState: ActionResponse | undefined,
    formData: FormData
): Promise<ActionResponse> {
    if (!(await verifyAuth())) {
        return { success: false, message: 'Acesso não autorizado.' };
    }

    const validatedFields = PostSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return {
            success: false,
            message: 'Erro de validação. Verifique os campos.',
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { title, slug, content, description, imageUrl, authorName, categorySlug } = validatedFields.data;

    try {
        const [author, category] = await Promise.all([
            database.author.findUnique({ where: { name: authorName } }),
            database.category.findUnique({ where: { slug: categorySlug } }),
        ]);

        if (!author) {
            return { success: false, message: `Erro: Autor "${authorName}" não encontrado.` };
        }
        if (!category) {
            return { success: false, message: `Erro: Categoria "${categorySlug}" não encontrada.` };
        }

        const newPost = await database.post.create({
            data: {
                title,
                slug,
                content,
                description: description,
                imageUrl: imageUrl,
                authorId: author.id,
                categoryId: category.id,
            },
            include: {
                category: true,
            },
        });

        await revalidatePostCache(newPost.slug, newPost.category.slug);
        return { success: true, message: 'Post criado com sucesso!', newSlug: slug };
    } catch (error) {
        if (error instanceof PrismaType.PrismaClientKnownRequestError && error.code === 'P2002') {
            return { success: false, message: 'Erro: Este "slug" já está em uso. Por favor, escolha outro.' };
        }

        return { success: false, message: 'Ocorreu um erro inesperado no servidor. Tente novamente mais tarde.' };
    }
}
