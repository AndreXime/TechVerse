'use client';
import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

interface AdminContextType {
	posts: PostType[];
	authors: AuthorType[];
	categories: CategoryType[];
	setPosts: Dispatch<SetStateAction<PostType[]>>;
	setAuthors: Dispatch<SetStateAction<AuthorType[]>>;
	setCategories: Dispatch<SetStateAction<CategoryType[]>>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({
	children,
	authorsServer,
	categoriesServer,
	postsServer,
}: {
	children: ReactNode;
	authorsServer: AuthorType[];
	categoriesServer: CategoryType[];
	postsServer: PostType[];
}) {
	const [posts, setPosts] = useState<PostType[]>(postsServer);
	const [authors, setAuthors] = useState<AuthorType[]>(authorsServer);
	const [categories, setCategories] = useState<CategoryType[]>(categoriesServer);

	return (
		<AdminContext.Provider value={{ posts, authors, categories, setPosts, setCategories, setAuthors }}>
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
