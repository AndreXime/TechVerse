'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Search } from 'lucide-react';

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const [query, setQuery] = useState('');

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        if (query.trim()) {
            router.push(`/buscar?s=${encodeURIComponent(query.trim())}`);
        }
    }

    const links = [
        { href: '/', label: 'Início' },
        { href: '/categorias', label: 'Categorias' },
        { href: '/sobre', label: 'Sobre' },
    ];

    return (
        <header className="flex justify-between items-center mb-16">
            <Link href={'/'}>
                <h1 className="text-3xl font-bold font-chakra text-white tracking-widest">TechVerse</h1>
            </Link>
            <div className="flex items-center gap-8">
                <nav className="hidden md:flex space-x-8">
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
        </header>
    );
}
