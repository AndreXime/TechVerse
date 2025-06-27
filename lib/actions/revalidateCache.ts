'use server';

import { revalidateTag } from 'next/cache';

/**
 * Invalida os caches relacionados a posts.
 * Chamar quando um post for criado, atualizado ou excluído.
 */
export async function revalidatePostCache(postSlug?: string, categorySlug?: string) {
    revalidateTag('home-posts');
    revalidateTag('sample-posts');
    revalidateTag('recommend-posts');
    revalidateTag('admin-data');

    // Se uma categoria específica foi afetada
    if (categorySlug) {
        revalidateTag(categorySlug);
        revalidateTag('posts-by-category');
    }

    // Se um post específico foi afetado
    if (postSlug) {
        revalidateTag(postSlug);
        revalidateTag('post-by-slug');
    }
}

/**
 * Invalida os caches relacionados a categorias.
 * Chamar quando uma categoria for criada, atualizada ou excluída.
 */
export async function revalidateCategoryCache() {
    revalidateTag('sample-posts');
    revalidateTag('posts-by-category');
    revalidateTag('admin-data');

    // A alteração em uma categoria pode afetar a exibição de posts.
    await revalidatePostCache();
}

/**
 * Invalida os caches relacionados a autores.
 * Chamar quando um autor for criado, atualizado ou excluído.
 */
export async function revalidateAuthorCache() {
    revalidateTag('all-authors');
    revalidateTag('admin-data');

    // A alteração de um autor afeta todos os posts dele.
    await revalidatePostCache();
}
