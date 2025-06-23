import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getPostBySlug, getRecommendPosts } from '@/lib/postsService';
import { notFound } from 'next/navigation';
import PreviewPost from '@/components/PreviewPost';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const post = getPostBySlug((await params).slug);

    if (!post) {
        notFound();
    }

    const recommendPosts = getRecommendPosts(post.category.slug, post.id);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Navbar />

            <main>
                <article className="max-w-4xl mx-auto">
                    <FullPost {...post} />
                </article>

                <section className="max-w-4xl mx-auto mt-24">
                    <h3 className="font-chakra text-2xl text-center text-white mb-12 tracking-widest">
                        &gt;&gt; VOCÊ TAMBÉM PODE GOSTAR
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {recommendPosts.map((post) => (
                            <PreviewPost key={post.id} post={post} colorKey="purple" />
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

function FullPost({ title, tags, category, createdAt, content, imageUrl, author }: PostType) {
    const formattedDate = createdAt
        ? new Intl.DateTimeFormat('pt-BR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
          }).format(new Date(createdAt))
        : null;

    return (
        <>
            <header className="text-center mb-12">
                <p className="font-chakra text-cyan-400 text-sm tracking-widest mb-2">// {category.name}</p>
                <h1 className="text-4xl md:text-6xl font-bold font-chakra text-white mb-4">{title}</h1>
                <div className="text-sm text-gray-400">
                    <span>
                        Por{' '}
                        <Link href="#" className="text-white hover:text-cyan-400">
                            {author.name}
                        </Link>
                    </span>
                    <span className="mx-2">|</span>
                    <span>Publicado em {formattedDate}</span>
                </div>
            </header>

            <figure className="mb-12 border-2 border-cyan-400/30 rounded-lg p-2 glass-effect">
                <Image
                    width={800}
                    height={800}
                    src={imageUrl}
                    alt={`Imagem do post ${title}`}
                    className="w-full object-cover rounded-md animate-glow-breathe"
                />
            </figure>

            <div className="post-content text-lg">
                {content ? (
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                ) : (
                    <p className="text-gray-300">Estranho... Parece que esse conteudo não tem conteudo.</p>
                )}
            </div>

            <section className="mt-16 p-6 border border-pink-500/30 rounded-lg glass-effect flex items-center gap-6">
                <Image
                    width={800}
                    height={800}
                    src={author.imageUrl}
                    alt={'Avatar de ' + author.name}
                    className="w-24 h-24 rounded-full border-2 border-pink-500/50"
                />
                <div>
                    <h4 className="font-chakra text-xl text-white">SOBRE {author.name.toUpperCase()}</h4>
                    <p className="text-sm mt-2">{author.description}</p>
                </div>
            </section>

            <footer className="mt-12 pt-8 border-t border-gray-700/50">
                {tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-8">
                        <span className="font-chakra text-white mr-2">Tags:</span>
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="bg-cyan-900/50 text-cyan-300 text-xs font-medium px-2.5 py-1 rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
                <Link
                    href={'/posts'}
                    className="font-chakra inline-block bg-transparent border-2 border-cyan-400 text-cyan-400 text-glow-cyan py-3 px-8 rounded-md hover:bg-cyan-400 hover:text-gray-900 transition-all duration-300"
                >
                    &lt;&lt; Voltar aos Artigos
                </Link>
            </footer>
        </>
    );
}
