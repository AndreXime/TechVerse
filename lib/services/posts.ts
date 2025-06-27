import cacheFn from '../cacheWrapper';
import database, { PrismaType } from '../database';

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

export async function searchPosts(
    mode: ModeOptions = 'structured',
    options: FilterOptions = {}
): Promise<PaginationResponse> {
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
            include: {
                category: true,
                author: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        }),
        database.post.count({ where }),
        database.author.findMany(),
        database.category.findMany(),
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

export interface PaginationResponse {
    posts: PostType[];
    total: number;
    options: {
        authors: AuthorType[];
        categories: CategoryType[];
    };
}

type ModeOptions = 'simple' | 'structured';
