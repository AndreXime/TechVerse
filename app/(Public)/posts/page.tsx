import { FilterOptions, PaginationResponse, searchPosts } from '@/lib/services/posts';
import PageClient from './pageClient';

import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'TechVerse | Todos os posts',
    description: 'Seu portal de tecnologia com um toque retrofuturista.',
};

export default async function PagePostServer({ searchParams }: QueryTypes) {
    const params = await searchParams;
    const querys: FilterOptions = {
        title: params.title,
        author: params.author,
        category: params.category,
        dateFrom: params.dateFrom ? new Date(params.dateFrom) : undefined,
        dateTo: params.dateTo ? new Date(params.dateTo) : undefined,
        inputSimple: params.s,
    };

    let filteredPosts: PaginationResponse;

    if (querys.inputSimple) {
        filteredPosts = await searchPosts('simple', querys);
    } else {
        filteredPosts = await searchPosts('structured', querys);
    }

    return <PageClient posts={filteredPosts.posts} total={filteredPosts.total} options={filteredPosts.options} />;
}
