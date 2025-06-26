import { cacheFn } from './cacheWrap';
import database from './database';

export const getHomePosts = cacheFn(async () => {
    return await database.post.findMany({
        orderBy: { createdAt: 'desc' },
        take: 4,
        include: { category: true, author: true },
    });
}, 'home-posts');

export const getPostBySlug = cacheFn(async (slug: string) => {
    return await database.post.findUnique({
        where: { slug },
        include: { category: true, author: true },
    });
}, 'post-by-slug');

export const getRecommendPosts = cacheFn(async (categorySlug: string, excludeId: string) => {
    const sameCategory = await database.post.findMany({
        where: {
            category: { slug: categorySlug },
            NOT: { id: excludeId },
        },
        include: { category: true, author: true },
        take: 2,
    });

    if (sameCategory.length >= 2) return sameCategory;

    return await database.post.findMany({
        where: { id: { not: excludeId } },
        include: { category: true, author: true },
        orderBy: { createdAt: 'desc' },
        take: 2,
    });
}, 'recommend-posts');

export const getSamplePostsByCategories = cacheFn(async () => {
    const categories = await database.category.findMany();

    const results = await Promise.all(
        categories.map(async (category) => {
            const posts = await database.post.findMany({
                where: { categoryId: category.id },
                orderBy: { createdAt: 'desc' },
                take: 3,
                include: { category: true, author: true },
            });

            return { category, posts };
        })
    );

    return results.filter((group) => group.posts.length > 0);
}, 'sample-posts');

export const getAllPostsByCategories = cacheFn(async (categorySlug: string) => {
    if (!(await database.category.findUnique({ where: { slug: categorySlug } }))) {
        // Não existe
        return null;
    }

    return await database.post.findMany({
        where: { category: { slug: categorySlug } },
        orderBy: { createdAt: 'desc' },
        include: { category: true, author: true },
    });
}, 'posts-by-category');

export const getAllAuthors = cacheFn(async () => {
    return await database.author.findMany();
}, 'all-authors');

export const getAdminData = cacheFn(async () => {
    return {
        authors: await database.author.findMany(),
        categories: await database.category.findMany(),
        posts: await database.post.findMany({ include: { category: true, author: true } }),
    };
}, 'admin-data');
