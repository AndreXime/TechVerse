import Link from 'next/link';

export default async function NotFound() {
    return (
        <section className="flex items-center justify-center min-h-screen text-center p-4">
            <div>
                <h1 className="font-chakra glitch" data-text="404">
                    404
                </h1>

                <h2 className="font-chakra text-2xl md:text-3xl text-pink-400 text-glow-pink mt-4 tracking-widest">
                    // TRANSMISSÃO PERDIDA
                </h2>

                <p className="max-w-md mx-auto mt-4">
                    O recurso que você tentou acessar não foi encontrado. O sinal pode ter sido corrompido ou o endereço
                    não existe mais nos nossos arquivos.
                </p>

                <div className="mt-8">
                    <Link
                        href="/"
                        className="font-chakra inline-block bg-transparent border-2 border-cyan-400 text-cyan-400 text-glow-cyan py-3 px-12 rounded-md hover:bg-cyan-400 hover:text-gray-900 hover:shadow-lg hover:shadow-cyan-400/30 transition-all duration-300"
                    >
                        INICIAR RETORNO À BASE
                    </Link>
                </div>
            </div>
        </section>
    );
}
