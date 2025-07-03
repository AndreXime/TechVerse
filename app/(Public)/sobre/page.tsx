import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getAllAuthors } from '@/lib/services/authors';
import { FaGithub, FaGlobe, FaLinkedinIn } from 'react-icons/fa';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'TechVerse | Sobre nós',
    description: 'Seu portal de tecnologia com um toque retrofuturista.',
};

export default async function SobrePage() {
    const authors = await getAllAuthors();

    return (
        <>
            <Navbar />

            <main className="max-w-5xl mx-auto">
                <header className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold font-chakra text-white">
                        <span className="text-cyan-400 text-glow-cyan font-normal text-2xl block tracking-widest">
                            // NOSSA MISSÃO
                        </span>
                        CONECTANDO VOCÊ AO FUTURO
                    </h1>
                    <p className="max-w-3xl mx-auto text-lg mt-6">
                        O TechVerse nasceu da paixão pela tecnologia e da fascinação pelo futuro que ela promete. Somos
                        um coletivo de entusiastas, analistas e sonhadores que exploram as profundezas do hardware, a
                        evolução da cultura digital e a estética cyberpunk que inspira uma nova geração. Nossa missão é
                        ser o seu terminal de acesso às últimas notícias, análises e tendências que estão definindo o
                        amanhã.
                    </p>
                </header>

                <section>
                    <h2 className="font-chakra text-3xl text-center text-white mb-12 tracking-widest">
                        &gt;&gt; CONHEÇA OS OPERADORES
                    </h2>
                    <div className="flex justify-center gap-8">
                        {authors.map((author) => (
                            <Author key={author.name} {...author} />
                        ))}
                        {authors.length == 0 && (
                            <div className="text-glow-cyan text-cyan-500 text-xl text-center font-bold m-6">
                                Por enquanto não temos nenhum autor no momento. Estamos trabalhando para desenvolver
                                essa plataforma.
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}

interface AuthorProps {
    name: string;
    jobRole: string;
    description: string;
    github: string | null;
    linkedin: string | null;
    genericSocial: string | null;
}

function Author(author: AuthorProps) {
    return (
        <div className="border border-pink-500/30 rounded-lg p-6 text-center glass-effect hover:border-pink-500 transition-all duration-300 hover:-translate-y-2">
            <Image
                src={`/api/imageAutor/${author.name}`}
                alt="Avatar"
                className="w-28 h-28 rounded-full mx-auto mb-4 border-2 border-pink-500/50"
                width={800}
                height={800}
            />
            <h3 className="text-2xl font-bold font-chakra text-white">{author.name}</h3>
            <p className="font-chakra text-pink-400 text-glow-pink mb-4">{author.jobRole}</p>
            <p className="text-sm mb-6">{author.description}</p>
            <div className="flex justify-center gap-4 text-cyan-400 text-xl">
                {author.github && (
                    <Link href={author.github} className="hover:text-white">
                        <FaGithub />
                    </Link>
                )}
                {author.linkedin && (
                    <Link href={author.linkedin} className="hover:text-white">
                        <FaLinkedinIn />
                    </Link>
                )}
                {author.genericSocial && (
                    <Link href={author.genericSocial} className="hover:text-white">
                        <FaGlobe />
                    </Link>
                )}
            </div>
        </div>
    );
}
