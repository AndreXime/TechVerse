'use client';
import AddPosts from '@/components/admin/addPosts';
import AllPosts from '@/components/admin/AllPosts';
import Authors from '@/components/admin/Authors';
import Categories from '@/components/admin/Categories';
import Tags from '@/components/admin/Tags';
import { LogoutAdmin } from '@/lib/admin/actions/authAdmin';
import { File, Folder, LogOutIcon, PlusCircle, Tags as TagIcon, Users } from 'lucide-react';
import { useState } from 'react';

export default function DashboardServer() {
    const [Tab, setTab] = useState('AddPosts');

    const ActiveTab = (() => {
        switch (Tab) {
            case 'AllPosts':
                return <AllPosts />;
            case 'Authors':
                return <Authors />;
            case 'Categories':
                return <Categories />;
            case 'Tags':
                return <Tags />;
            default:
                return <AddPosts />;
        }
    })();

    return (
        <div className="admin-panel-grid">
            <aside className="sidebar flex flex-col p-6 border-r border-cyan-400/20">
                <header className="text-center mb-12">
                    <h1 className="text-3xl font-bold font-chakra text-white tracking-widest">TechVerse</h1>
                    <p className="font-chakra text-cyan-400 text-glow-cyan text-sm">PAINEL DE CONTROLE</p>
                </header>
                <nav className="flex-grow">
                    <ul className="space-y-3">
                        <li>
                            <button
                                onClick={() => setTab('AddPosts')}
                                className="w-full flex items-center gap-3 font-chakra text-lg px-4 py-2 rounded-md transition-colors bg-cyan-500/10 text-cyan-300"
                            >
                                <PlusCircle className="w-6 text-center" /> Adicionar Post
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setTab('AllPosts')}
                                className="w-full flex items-center gap-3 font-chakra text-lg px-4 py-2 rounded-md transition-colors hover:bg-cyan-500/10 hover:text-cyan-300"
                            >
                                <File className="w-6 text-center" /> Todos os Posts
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setTab('Categories')}
                                className="w-full flex items-center gap-3 font-chakra text-lg px-4 py-2 rounded-md transition-colors hover:bg-cyan-500/10 hover:text-cyan-300"
                            >
                                <Folder className="w-6 text-center" /> Categorias
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setTab('Tags')}
                                className="w-full flex items-center gap-3 font-chakra text-lg px-4 py-2 rounded-md transition-colors hover:bg-cyan-500/10 hover:text-cyan-300"
                            >
                                <TagIcon className="w-6 text-center" /> Tags
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setTab('Authors')}
                                className="w-full flex items-center gap-3 font-chakra text-lg px-4 py-2 rounded-md transition-colors hover:bg-cyan-500/10 hover:text-cyan-300"
                            >
                                <Users className="w-6 text-center" /> Autores
                            </button>
                        </li>
                        <li>
                            <form action={LogoutAdmin}>
                                <button
                                    type="submit"
                                    className="w-full flex items-center gap-3 font-chakra text-lg px-4 py-2 rounded-md transition-colors hover:bg-pink-500/10 text-pink-400"
                                >
                                    <LogOutIcon className="w-6 text-center" /> Sair
                                </button>
                            </form>
                        </li>
                    </ul>
                </nav>
            </aside>

            <main className="main-content p-8 overflow-y-auto">{ActiveTab}</main>
        </div>
    );
}
