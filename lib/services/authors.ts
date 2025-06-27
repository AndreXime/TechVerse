import cacheFn from '../cacheWrapper';
import database from '../database';

export const getAllAuthors = cacheFn(async () => {
    return await database.author.findMany();
}, 'all-authors');
