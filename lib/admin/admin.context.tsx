'use client';
import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

interface AdminContextType {
    posts: PostType[];
    authors: AuthorType[];
    categories: CategoryType[];
    tags: TagType[];
    setPosts: Dispatch<SetStateAction<PostType[]>>;
    setAuthors: Dispatch<SetStateAction<AuthorType[]>>;
    setCategories: Dispatch<SetStateAction<CategoryType[]>>;
    setTags: Dispatch<SetStateAction<string[]>>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({
    children,
    authorsServer,
    categoriesServer,
    postsServer,
    tagsServer,
}: {
    children: ReactNode;
    authorsServer: AuthorType[];
    categoriesServer: CategoryType[];
    postsServer: PostType[];
    tagsServer: TagType[];
}) {
    const [posts, setPosts] = useState<PostType[]>(postsServer);
    const [authors, setAuthors] = useState<AuthorType[]>(authorsServer);
    const [categories, setCategories] = useState<CategoryType[]>(categoriesServer);
    const [tags, setTags] = useState<TagType[]>(tagsServer);

    return (
        <AdminContext.Provider
            value={{ posts, authors, categories, tags, setPosts, setCategories, setAuthors, setTags }}
        >
            {children}
        </AdminContext.Provider>
    );
}

export function useAdminData() {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error('usePosts deve ser usado dentro de um PostsProvider');
    }
    return context;
}
