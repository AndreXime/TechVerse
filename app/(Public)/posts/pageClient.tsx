'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PreviewPost from '@/components/PreviewPost';
import { useRouter } from 'next/navigation';
import { colorsKeys } from '@/lib/colors';
import type { PaginationResponse } from '@/lib/services/posts';

export default function PostsPageClient({ posts, total, options }: PaginationResponse) {
    const router = useRouter();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const title = formData.get('title')?.toString().trim();
        const category = formData.get('category')?.toString();
        const author = formData.get('author')?.toString();
        const dateFrom = formData.get('dateFrom')?.toString();
        const dateTo = formData.get('dateTo')?.toString();

        const searchParams = new URLSearchParams();

        if (title) searchParams.set('title', title);
        if (category && category !== 'all') searchParams.set('category', category);
        if (author && author !== 'all') searchParams.set('author', author);
        if (dateFrom) searchParams.set('dateFrom', dateFrom);
        if (dateTo) searchParams.set('dateTo', dateTo);

        router.push(`/posts?${searchParams.toString()}`);
    }

    return (
        <>
            <Navbar />

            <main>
                <header className="mb-12">
                    <h1 className="font-chakra text-4xl text-center md:text-left text-white mb-8 tracking-widest">
                        ARQUIVO DE TRANSMISSÕES
                    </h1>

                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 p-6 border border-cyan-400/30 rounded-lg glass-effect"
                    >
                        <div>
                            <label htmlFor="filter-title" className="block font-chakra text-sm mb-2 text-cyan-300">
                                FILTRAR POR NOME
                            </label>
                            <input name="title" type="text" id="filter-title" className="filter-input" />
                        </div>
                        <div>
                            <label htmlFor="filter-category" className="block font-chakra text-sm mb-2 text-cyan-300">
                                POR CATEGORIA
                            </label>
                            <select name="category" id="filter-category" className="filter-select">
                                <option value="all">Todas</option>
                                {options.categories.map((category) => (
                                    <option key={category.slug} value={category.slug}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="filter-author" className="block font-chakra text-sm mb-2 text-cyan-300">
                                POR AUTOR
                            </label>
                            <select name="author" id="filter-author" className="filter-select">
                                <option value="all">Todos</option>
                                {options.authors.map((author) => (
                                    <option key={author.name} value={author.name}>
                                        {author.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="filter-date" className="block font-chakra text-sm mb-2 text-cyan-300">
                                DE
                            </label>
                            <input name="dateFrom" type="date" id="filter-date" className="filter-input" />
                        </div>
                        <div>
                            <label htmlFor="filter-date" className="block font-chakra text-sm mb-2 text-cyan-300">
                                ATÉ
                            </label>
                            <input name="dateTo" type="date" id="filter-date" className="filter-input" />
                        </div>
                        <div className="flex items-end col-span-full">
                            <button
                                type="submit"
                                className="w-full font-chakra bg-pink-500 text-gray-900 py-2 px-8 rounded-md hover:bg-pink-400 hover:shadow-lg hover:shadow-pink-400/30 transition-all duration-300 font-bold"
                            >
                                FILTRAR
                            </button>
                        </div>
                    </form>
                    <div className="text-right mt-4 pt-4 border-t border-cyan-400/10">
                        <p className="font-chakra text-cyan-300">{total} TRANSMISSÕES ENCONTRADAS</p>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                        <PreviewPost key={post.title} post={post} colorKey={colorsKeys[index % colorsKeys.length]} />
                    ))}
                </div>
                {posts.length == 0 && (
                    <div className="text-glow-red text-red-500 text-xl text-center py-20">
                        Não foi possivel encontrar nenhum post.
                    </div>
                )}
            </main>

            <Footer />
        </>
    );
}
