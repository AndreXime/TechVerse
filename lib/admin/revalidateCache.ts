'use server';

import { revalidateTag } from 'next/cache';

/**
 * Invalida os caches relacionados a posts.
 * Chame esta função sempre que um post for criado, atualizado ou excluído.
 */
export async function revalidatePostCache(postSlug?: string, categorySlug?: string) {
    // Caches que listam múltiplos posts - sempre precisam ser revalidados
    revalidateTag('home-posts');
    revalidateTag('sample-posts');
    revalidateTag('recommend-posts');
    revalidateTag('admin-data');

    // Se uma categoria específica foi afetada
    if (categorySlug) {
        revalidateTag(categorySlug);
        revalidateTag('posts-by-category'); // Invalida a busca geral também
    }

    // Se um post específico foi afetado
    if (postSlug) {
        revalidateTag(postSlug); // Invalida o cache de getPostBySlug(postSlug)
        revalidateTag('post-by-slug'); // Invalida a busca geral também
    }
}

/**
 * Invalida os caches relacionados a categorias.
 * Chame esta função sempre que uma categoria for criada, atualizada ou excluída.
 */
export async function revalidateCategoryCache() {
    console.log('Revalidando caches de CATEGORIAS...');

    revalidateTag('sample-posts');
    revalidateTag('posts-by-category');
    revalidateTag('admin-data');

    // A alteração em uma categoria pode afetar a exibição de posts.
    // É mais seguro invalidar os caches de posts também.
    await revalidatePostCache();
}

/**
 * Invalida os caches relacionados a autores.
 * Chame esta função sempre que um autor for criado, atualizado ou excluído.
 */
export async function revalidateAuthorCache() {
    console.log('Revalidando caches de AUTORES...');

    revalidateTag('all-authors');
    revalidateTag('admin-data');

    // A alteração de um autor (ex: nome) afeta todos os posts dele.
    // É mais seguro invalidar os caches de posts.
    await revalidatePostCache();
}
