import { PaginationResponse } from '@/types/functionTypes';
import { authors, categories, posts } from './database/sampleDatabase';

export type FilterOptions = {
    inputSimple?: string;
    title?: string;
    author?: string;
    category?: string;
    dateFrom?: Date;
    dateTo?: Date;
};

type ModeOptions = 'simple' | 'structured';

export function searchPosts(mode: ModeOptions = 'structured', options: FilterOptions = {}): PaginationResponse {
    // Filtro geral
    let filtered = posts;

    if (mode === 'simple' && options.inputSimple) {
        const term = options.inputSimple.toLowerCase();
        filtered = filtered.filter(
            (post) =>
                post.title.toLowerCase().includes(term) ||
                post.description.toLowerCase().includes(term) ||
                post.category.name.toLowerCase().includes(term)
        );
    }

    const { title, author, category, dateFrom, dateTo } = options;

    if (title) {
        const lower = title.toLowerCase();
        filtered = filtered.filter((p) => p.title.toLowerCase().includes(lower));
    }

    if (author) {
        const lower = author.toLowerCase();
        filtered = filtered.filter((p) => p.author.name.toLowerCase().includes(lower));
    }

    if (category) {
        const lower = category.toLowerCase();
        filtered = filtered.filter((p) => p.category.slug.toLowerCase() === lower);
    }

    if (dateFrom) {
        filtered = filtered.filter((p) => p.createdAt >= dateFrom);
    }

    if (dateTo) {
        filtered = filtered.filter((p) => p.createdAt <= dateTo);
    }

    const total = filtered.length;

    return {
        posts: filtered,
        total,
        options: {
            authors,
            categories,
        },
    };
}
