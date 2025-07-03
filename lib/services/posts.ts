import cacheFn from '../cacheWrapper';
import database, { PrismaType } from '../database';

export const getHomePosts = cacheFn(async () => {
    return await database.post.findMany({
        orderBy: { createdAt: 'desc' },
        take: 4,
        select: {
            title: true,
            slug: true,
            description: true,
            tags: true,
            category: {
                select: {
                    name: true,
                },
            },
        },
    });
}, 'home-posts');

export const getPostBySlug = cacheFn(async (slug: string) => {
    return await database.post.findUnique({
        where: { slug },
        select: {
            id: true,
            title: true,
            content: true,
            slug: true,
            description: true,
            tags: true,
            createdAt: true,
            author: {
                select: {
                    name: true,
                    description: true,
                },
            },
            category: {
                select: {
                    name: true,
                    slug: true,
                },
            },
        },
    });
}, 'post-by-slug');

export const getRecommendPosts = cacheFn(async (categorySlug: string, excludeId: string) => {
    const sameCategory = await database.post.findMany({
        where: {
            category: { slug: categorySlug },
            NOT: { id: excludeId },
        },
        take: 2,
        select: {
            title: true,
            slug: true,
            description: true,
            tags: true,
            category: {
                select: {
                    name: true,
                },
            },
        },
    });

    if (sameCategory.length >= 2) return sameCategory;

    return await database.post.findMany({
        where: { id: { not: excludeId } },
        orderBy: { createdAt: 'desc' },
        take: 2,
        select: {
            title: true,
            slug: true,
            description: true,
            tags: true,
            category: {
                select: {
                    name: true,
                },
            },
        },
    });
}, 'recommend-posts');

export async function searchPosts(mode: ModeOptions = 'structured', options: FilterOptions = {}) {
    const { inputSimple, title, author, category, dateFrom, dateTo } = options;

    const where: PrismaType.PostWhereInput = {};

    if (mode === 'simple' && inputSimple) {
        const term = inputSimple.toLowerCase();

        where.OR = [
            {
                title: {
                    contains: term,
                    mode: 'insensitive',
                },
            },
            {
                description: {
                    contains: term,
                    mode: 'insensitive',
                },
            },
            {
                category: {
                    name: {
                        contains: term,
                        mode: 'insensitive',
                    },
                },
            },
        ];
    }

    if (mode === 'structured') {
        if (title) {
            where.title = {
                contains: title,
                mode: 'insensitive',
            };
        }

        if (author) {
            where.author = {
                name: {
                    contains: author,
                    mode: 'insensitive',
                },
            };
        }

        if (category) {
            where.category = {
                slug: {
                    equals: category.toLowerCase(),
                },
            };
        }

        if (dateFrom || dateTo) {
            where.createdAt = {};
            if (dateFrom) where.createdAt.gte = dateFrom;
            if (dateTo) where.createdAt.lte = dateTo;
        }
    }

    const [posts, total, authors, categories] = await Promise.all([
        database.post.findMany({
            where,
            orderBy: {
                createdAt: 'desc',
            },
            select: {
                title: true,
                slug: true,
                description: true,
                tags: true,
                category: {
                    select: {
                        name: true,
                    },
                },
            },
        }),
        database.post.count({ where }),
        database.author.findMany({ select: { name: true } }),
        database.category.findMany({ select: { name: true, slug: true } }),
    ]);

    return {
        posts,
        total,
        options: {
            authors,
            categories,
        },
    };
}

export type FilterOptions = {
    inputSimple?: string;
    title?: string;
    author?: string;
    category?: string;
    dateFrom?: Date;
    dateTo?: Date;
};

export type PaginationResponse = Awaited<ReturnType<typeof searchPosts>>;

type ModeOptions = 'simple' | 'structured';
