import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import PreviewPost from '@/components/PreviewPost';
import { colorClasses, colorsKeys } from '@/lib/colors';
import { getAllPostsByCategories } from '@/lib/services/categories';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: SlugType): Promise<Metadata> {
    const post = await getAllPostsByCategories((await params).slug);

    if (!post?.length) {
        return {
            title: 'Categoria não encontrada',
        };
    }

    return {
        title: 'Pagina da categoria - ' + post[0].category.name,
        description: 'Todos os posts relacionado a ' + post[0].category.name,
        openGraph: {
            title: 'Pagina da categoria - ' + post[0].category.name,
            description: 'Todos os posts relacionado a ' + post[0].category.name,
        },
    };
}

export default async function CategoryPage({ params }: SlugType) {
    const posts = await getAllPostsByCategories((await params).slug);
    const random = Math.floor(Math.random() * 4);

    if (!posts) {
        notFound();
    }

    return (
        <>
            <Navbar />

            <main>
                <header className={colorClasses[colorsKeys[random]].border + ' text-center mb-16 border-b-2 pb-6'}>
                    <h1 className="text-4xl md:text-5xl font-bold font-chakra text-white">
                        <span
                            className={
                                colorClasses[colorsKeys[random]].text +
                                ' text-glow-pink font-normal text-2xl block tracking-widest'
                            }
                        >
                            // ARQUIVOS DA CATEGORIA
                        </span>
                        {(await params).slug}
                    </h1>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <PreviewPost key={post.id} post={post} colorKey={colorsKeys[random]} />
                    ))}
                </div>

                {/*<div className="text-center mt-16">
                    <button className="font-chakra bg-transparent border-2 border-cyan-400 text-cyan-400 text-glow-cyan py-3 px-12 rounded-md hover:bg-cyan-400 hover:text-gray-900 hover:shadow-lg hover:shadow-cyan-400/30 transition-all duration-300">
                        CARREGAR MAIS
                    </button>
                </div>*/}
            </main>

            <Footer />
        </>
    );
}
