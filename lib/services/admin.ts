import cacheFn from '../cacheWrapper';
import database from '../database';

export const getAdminData = cacheFn(async () => {
    return {
        authors: await database.author.findMany({
            select: { name: true, description: true, jobRole: true, genericSocial: true, github: true, linkedin: true }
        }),
        categories: await database.category.findMany(),
        posts: await database.post.findMany({
            select: {
                title: true,
                content: true,
                slug: true,
                description: true,
                tags: true,
                createdAt: true,
                category: { select: { name: true, slug: true } },
                author: { select: { name: true } }
            }
        }),
    };
}, 'admin-data');
