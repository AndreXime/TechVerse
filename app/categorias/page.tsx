import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getSamplePostsByCategories } from '@/lib/postsService';
import { colorsKeys, colorClasses } from '@/lib/colors';
import PreviewPost from '@/components/PreviewPost';

export default async function CategoriesPage() {
    const postsByCategories = await getSamplePostsByCategories();

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Navbar />

            <main>
                <header className="text-center mb-20">
                    <h1 className="text-4xl md:text-5xl font-bold font-chakra text-white tracking-widest">
                        ARQUIVOS DE ARTIGOS
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
            </main>

            <Footer />
        </div>
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
