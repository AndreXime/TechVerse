import cacheFn from '../cacheWrapper';
import database from '../database';

export const getSamplePostsByCategories = cacheFn(async () => {
    const categories = await database.category.findMany({
        select: {
            id: true,
            slug: true,
            name: true,
        },
    });

    const results = await Promise.all(
        categories.map(async (category) => {
            const posts = await database.post.findMany({
                where: { categoryId: category.id },
                orderBy: { createdAt: 'desc' },
                take: 3,
                select: {
                    slug: true,
                    title: true,
                    description: true,
                    tags: true,
                    category: { select: { name: true } },
                },
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
