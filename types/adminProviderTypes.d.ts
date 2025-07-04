import type { Dispatch, SetStateAction } from 'react';

export interface AuthorsAdmin {
    id: string;
    name: string;
    description: string;
    jobRole: string;
    linkedin: string | null;
    github: string | null;
    genericSocial: string | null;
}

export interface PostsAdmin {
    id: string;

    title: string;
    description: string;
    content: string;
    author: {
        name: string;
    };
    category: {
        name: string;
        slug: string;
    };
    slug: string;
    createdAt: Date;
    tags: string[];
}
[];

export interface CategoryAdmin {
    id: string;

    slug: string;
    name: string;
}

export interface AdminContextType {
    posts: PostsAdmin[];
    authors: AuthorsAdmin[];
    categories: CategoryAdmin[];
    Tab: string;
    EditingData: AuthorsAdmin | CategoryAdmin | PostsAdmin | null;
    setEditingData: Dispatch<SetStateAction<PostsAdmin | AuthorsAdmin | CategoryAdmin | null>>;
    setTab: Dispatch<SetStateAction<string>>;
    setPosts: Dispatch<SetStateAction<PostsAdmin[]>>;
    setAuthors: Dispatch<SetStateAction<AuthorsAdmin[]>>;
    setCategories: Dispatch<SetStateAction<CategoryAdmin[]>>;
}
