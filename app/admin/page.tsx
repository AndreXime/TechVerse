'use client';
import Link from 'next/link';
export default function AdminPage() {
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <section className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md mx-auto">
                <header className="text-center mb-8">
                    <h1 className="text-5xl font-bold font-chakra text-white tracking-widest">TechVerse</h1>
                    <p className="font-chakra text-cyan-400 text-glow-cyan">Admin Terminal</p>
                </header>

                <main className="border border-pink-500/30 rounded-lg p-8 glass-effect">
                    <form onSubmit={handleSubmit}>
                        <h2 className="font-chakra text-2xl text-center text-pink-400 text-glow-pink mb-8 tracking-widest">
                            // ACESSO RESTRITO
                        </h2>

                        <div className="mb-6">
                            <label htmlFor="username" className="block font-chakra text-sm mb-2">
                                E-MAIL
                            </label>
                            <div className="relative">
                                <i className="fa fa-user absolute left-3 top-1/2 -translate-y-1/2 text-pink-400/60"></i>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    className="w-full bg-gray-900/50 border border-pink-400/30 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 text-white font-chakra transition-all duration-300"
                                />
                            </div>
                        </div>

                        <div className="mb-8">
                            <label htmlFor="password" className="block font-chakra text-sm mb-2">
                                SENHA
                            </label>
                            <div className="relative">
                                <i className="fa fa-key absolute left-3 top-1/2 -translate-y-1/2 text-pink-400/60"></i>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="w-full bg-gray-900/50 border border-pink-400/30 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 text-white font-chakra transition-all duration-300"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full font-chakra bg-cyan-500 text-gray-900 py-3 px-8 rounded-md hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-400/30 transition-all duration-300 text-lg font-bold"
                        >
                            CONECTAR
                        </button>
                    </form>
                </main>

                <footer className="text-center mt-8">
                    <Link href="/" className="text-sm text-gray-500 hover:text-cyan-400 transition-colors duration-300">
                        &lt;&lt; Voltar para o site
                    </Link>
                </footer>
            </div>
        </section>
    );
}
