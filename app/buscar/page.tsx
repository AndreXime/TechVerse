import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import PreviewPost from '@/components/PreviewPost';
import { colorClasses, colorsKeys } from '@/lib/colors';
import { getPostsBySearchAttempt } from '@/lib/getPosts';
import { redirect } from 'next/navigation';

export default async function Search({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
    const searchQuery = (await searchParams).s;
    if (!searchQuery) {
        redirect('/');
    }
    const posts = getPostsBySearchAttempt(searchQuery);
    const random = Math.floor(Math.random() * 4);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Navbar />
            <main>
                <header className={colorClasses[colorsKeys[random]].border + ' mb-16 border-b-2 pb-6'}>
                    <h1 className="text-3xl md:text-4xl font-bold font-chakra text-white">
                        <span className="font-normal text-xl block tracking-widest text-gray-400">
                            // RESULTADOS DA BUSCA
                        </span>
                        "{searchQuery}"
                    </h1>
                    <p className="text-gray-400 mt-2">{posts.length} resultados encontrados.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.length == 0 && (
                        <div className="col-span-full text-center py-16">
                            <p className="font-chakra text-2xl text-gray-500 mb-2">// NENHUM RESULTADO ENCONTRADO</p>
                            <p>Tente buscar por outros termos.</p>
                        </div>
                    )}
                    {posts.map((post) => (
                        <PreviewPost key={post.id} post={post} colorKey={colorsKeys[random]} />
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
