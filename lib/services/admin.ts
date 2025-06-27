import cacheFn from '../cacheWrapper';
import database from '../database';

export const getAdminData = cacheFn(async () => {
    return {
        authors: await database.author.findMany(),
        categories: await database.category.findMany(),
        posts: await database.post.findMany({ include: { category: true, author: true } }),
    };
}, 'admin-data');
