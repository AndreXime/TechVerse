import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getSamplePostsByCategories } from '@/lib/postsService';
import { colorsKeys, colorClasses } from '@/lib/colors';
import PreviewPost from '@/components/PreviewPost';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'TechVerse | Todas as categorias',
    description: 'Seu portal de tecnologia com um toque retrofuturista.',
};
export default async function CategoriesPage() {
    const postsByCategories = await getSamplePostsByCategories();

    return (
        <>
            <Navbar />

            <main>
                <header className="text-center mb-20">
                    <h1 className="text-4xl md:text-5xl font-bold font-chakra text-white tracking-widest">
                        ARQUIVOS DE CATEGORIAS
                    </h1>
                </header>

                {postsByCategories.map(({ category, posts }, index) => (
                    <CategoryPosts
                        key={category.name}
                        category={category}
                        posts={posts}
                        color={colorsKeys[index % colorsKeys.length]}
                    />
                ))}
                {postsByCategories.length == 0 && (
                    <div className="text-glow-purple text-purple-500 text-xl text-center font-bold">
                        Nenhuma categoria foi criada no momento. Aguarde para atualizações.
                    </div>
                )}
            </main>

            <Footer />
        </>
    );
}

function CategoryPosts({
    category,
    posts,
    color,
}: {
    category: CategoryType;
    posts: PostType[];
    color: keyof typeof colorClasses;
}) {
    const c = colorClasses[color];
    return (
        <section className="mb-20">
            <header className={`flex justify-between items-baseline mb-8 pb-2 border-b-2 ${c.border}`}>
                <h2 className={`font-chakra text-3xl ${c.text} ${c.glow}`}>{category.name}</h2>
                <Link
                    href={'/categorias/' + category.slug}
                    className="font-chakra text-cyan-400 hover:text-white transition-colors duration-300"
                >
                    Ver mais &gt;
                </Link>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                    <PreviewPost key={post.id} colorKey={color} post={post} />
                ))}
            </div>
        </section>
    );
}
