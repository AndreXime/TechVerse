'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Menu, Search, X } from 'lucide-react';

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        if (query.trim()) {
            router.push(`/posts?s=${encodeURIComponent(query.trim())}`);
            setIsOpen(false);
        }
    }

    const links = [
        { href: '/', label: 'Início' },
        { href: '/posts', label: 'Posts' },
        { href: '/categorias', label: 'Categorias' },
        { href: '/sobre', label: 'Sobre' },
    ];

    // Para funcionar animação
    const openMenu = () => {
        setShowMenu(true);
        setTimeout(() => setIsOpen(true), 10);
    };
    const closeMenu = () => {
        setIsOpen(false);
        setTimeout(() => setShowMenu(false), 300);
    };

    return (
        <header className="flex justify-between items-center mb-16">
            <Link href={'/'}>
                <h1 className="text-3xl font-bold font-chakra text-white tracking-widest">TechVerse</h1>
            </Link>
            <div className="md:hidden">
                <button onClick={openMenu} aria-label="Menu">
                    {isOpen ? <X size={28} className="text-white" /> : <Menu size={28} className="text-white" />}
                </button>
            </div>
            <div className="hidden md:flex items-center gap-8">
                <nav className="flex space-x-8">
                    {links.map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            className={`transition-colors duration-300 ${
                                pathname === href ? 'text-cyan-400 text-glow-cyan' : 'hover:text-cyan-400 text-white'
                            }`}
                        >
                            {label}
                        </Link>
                    ))}
                </nav>
                <form onSubmit={handleSubmit} className="relative">
                    <label htmlFor="searchPost">
                        <input
                            id="searchPost"
                            type="text"
                            placeholder="Buscar post..."
                            onChange={(e) => setQuery(e.currentTarget.value)}
                            className="bg-gray-900/50 border border-cyan-400/30 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:border-cyan-400 text-white font-chakra w-40 md:w-56 transition-all duration-300"
                        />
                        <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2">
                            <Search size={22} className="text-cyan-400/60" />
                        </button>
                    </label>
                </form>
            </div>
            {/* Mobile menu */}
            {showMenu && (
                <div className="fixed inset-0 z-50 flex">
                    {/* Overlay que fecha o menu ao clicar fora */}
                    <div className="flex-1" onClick={closeMenu} />

                    <div
                        className={`fixed top-4 left-4 z-50 transition-all duration-300 transform ${
                            isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
                        }`}
                    >
                        <button
                            onClick={closeMenu}
                            aria-label="Fechar menu"
                            className="fixed top-4 left-4 z-50 text-white text-glow-cyan bg-secondary p-2 rounded-full backdrop-blur border-glow-cyan"
                        >
                            <X size={28} />
                        </button>
                    </div>

                    {/* Menu lateral fixo */}
                    <div
                        className={`w-80 h-full bg-secondary p-6 flex flex-col gap-6 transform transition-transform duration-300 ${
                            isOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}
                    >
                        <p className="text-cyan-400 text-glow-cyan text-xl font-bold font-chakra text-center">
                            Navegação do site
                        </p>

                        <nav className="flex flex-col gap-4">
                            {links.map(({ href, label }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    onClick={closeMenu}
                                    className={`transition-colors duration-300 text-lg ${
                                        pathname === href
                                            ? 'text-cyan-400 text-glow-cyan'
                                            : 'hover:text-cyan-400 text-white'
                                    }`}
                                >
                                    {label}
                                </Link>
                            ))}
                        </nav>
                        <form onSubmit={handleSubmit} className="relative">
                            <label htmlFor="searchPostMobile">
                                <input
                                    id="searchPostMobile"
                                    type="text"
                                    placeholder="Buscar post..."
                                    onChange={(e) => setQuery(e.currentTarget.value)}
                                    className="w-full bg-gray-900/70 border border-cyan-400/30 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:border-cyan-400 text-white font-chakra"
                                />
                                <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2">
                                    <Search size={22} className="text-cyan-400/60" />
                                </button>
                            </label>
                        </form>
                    </div>
                </div>
            )}
        </header>
    );
}
