import cacheFn from '../cacheWrapper';
import database from '../database';

export const getAllAuthors = cacheFn(async () => {
    return await database.author.findMany({
        select: { name: true, description: true, jobRole: true, genericSocial: true, github: true, linkedin: true },
    });
}, 'all-authors');
