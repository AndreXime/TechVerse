'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import { AdminContextType, AuthorsAdmin, PostsAdmin, CategoryAdmin } from '@/types/adminProviderTypes';

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({
    children,
    authorsServer,
    categoriesServer,
    postsServer,
}: {
    children: ReactNode;
    authorsServer: AuthorsAdmin[];
    categoriesServer: CategoryAdmin[];
    postsServer: PostsAdmin[];
}) {
    const [posts, setPosts] = useState<PostsAdmin[]>(postsServer);
    const [authors, setAuthors] = useState<AuthorsAdmin[]>(authorsServer);
    const [categories, setCategories] = useState<CategoryAdmin[]>(categoriesServer);
    const [Tab, setTab] = useState('AddPosts');
    const [EditingData, setEditingData] = useState<PostsAdmin | AuthorsAdmin | CategoryAdmin | null>(null);

    return (
        <AdminContext.Provider
            value={{
                EditingData,
                setEditingData,
                Tab,
                setTab,
                posts,
                authors,
                categories,
                setPosts,
                setCategories,
                setAuthors,
            }}
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
