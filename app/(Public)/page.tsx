import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import PreviewPost from '@/components/PreviewPost';
import { getHomePosts } from '@/lib/services/posts';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
    const posts = await getHomePosts();

    return (
        <>
            <Navbar />

            <main>
                <section className="text-center my-40 content-section animate-fadeInUp">
                    <h2 className="text-4xl md:text-6xl font-bold font-chakra text-white mb-4">
                        DESVENDANDO O <span className="text-cyan-400 animate-glow-breathe">AMANHÃ</span>, HOJE.
                    </h2>
                    <p className="max-w-3xl mx-auto text-lg">
                        Bem-vindo ao TechVerse, seu portal para o futuro da tecnologia. Exploramos a fronteira entre o
                        cyberpunk, inovações em hardware, e a cultura digital que molda o nosso mundo.
                    </p>
                </section>

                {posts.length > 0 ? (
                    <>
                        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
                            <FeaturedPost {...posts[0]} />
                        </section>

                        {posts.length > 1 && (
                            <section>
                                <h3 className="font-chakra text-2xl text-center text-white mb-12 tracking-widest">
                                    &gt;&gt; ARQUIVOS RECENTES
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {posts.slice(1).map((post) => (
                                        <PreviewPost key={post.id} post={post} colorKey="pink" />
                                    ))}
                                </div>
                            </section>
                        )}
                    </>
                ) : (
                    <div className="text-glow-purple text-purple-500 text-xl text-center">
                        Nenhum post foi criado no momento. Aguarde para atualizações.
                    </div>
                )}
            </main>

            <Footer />
        </>
    );
}

function FeaturedPost({ category, title, description, tags, imageUrl, slug }: PostType) {
    return (
        <>
            <div className="border-l-2 border-cyan-500 pl-6">
                <p className="font-chakra text-cyan-400 text-sm tracking-widest mb-2">// {category.name}</p>
                <h2 className="text-4xl md:text-5xl font-bold font-chakra text-white mb-4">{title}</h2>
                <p className="text-lg mb-6">{description}</p>
                <div className="flex flex-wrap gap-2 mb-8">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="bg-cyan-900/50 text-cyan-300 text-xs font-medium px-2.5 py-1 rounded-full"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                <Link
                    href={'/posts/' + slug}
                    className="font-chakra inline-block bg-transparent border-2 border-cyan-400 text-cyan-400 text-glow-cyan py-3 px-8 rounded-md hover:bg-cyan-400 hover:text-gray-900 hover:shadow-lg hover:shadow-cyan-400/30 transition-all duration-300"
                >
                    DECODIFICAR ARTIGO
                </Link>
            </div>
            <div className="border border-cyan-400/30 rounded-lg glass-effect border-glow-cyan">
                <Image
                    width={600}
                    height={600}
                    src={imageUrl}
                    alt={`Imagem do post sobre ${category}`}
                    className="object-cover w-full h-full"
                />
            </div>
        </>
    );
}
