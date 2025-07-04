'use client';
import AddPosts from '@/components/admin/FormAddPost';
import AllPosts from '@/components/admin/AllPosts';
import Authors from '@/components/admin/FormAuthors';
import Categories from '@/components/admin/FormCategories';
import { LogoutAdmin } from '@/lib/actions/admin/auth';
import { File, Folder, LogOutIcon, Menu, PlusCircle, Users, X } from 'lucide-react';
import { useState } from 'react';
import { useAdminData } from '@/components/admin/AdminProvider';
import UpdatesForms from '@/components/admin/UpdateForms';

const navButtons = [
    {
        label: 'Adicionar Post',
        tab: 'AddPosts',
        Icon: PlusCircle,
    },
    {
        label: 'Todos os Posts',
        tab: 'AllPosts',
        Icon: File,
    },
    {
        label: 'Categorias',
        tab: 'Categories',
        Icon: Folder,
    },
    {
        label: 'Autores',
        tab: 'Authors',
        Icon: Users,
    },
];

export default function DashboardServer() {
    const { Tab, setTab } = useAdminData();
    const [menuOpen, setMenuOpen] = useState(false);

    const ActiveTab = (() => {
        switch (Tab) {
            case 'AllPosts':
                return <AllPosts />;
            case 'Authors':
                return <Authors />;
            case 'Categories':
                return <Categories />;
            case 'UpdateAuthor':
            case 'UpdatePost':
            case 'UpdateCategory':
                return <UpdatesForms />;
            default:
                return <AddPosts />;
        }
    })();

    return (
        <div className="admin-panel-grid">
            <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-4 fixed top-3 right-3 z-20 text-pink-400 bg-pink-500/10 rounded-full"
                aria-label="Toggle menu"
            >
                {menuOpen ? <X size={30} /> : <Menu size={30} />}
            </button>

            <aside
                className={
                    'sidebar flex flex-col p-6 border-r border-cyan-400/20 ' +
                    'fixed inset-y-0 left-0 z-10 ' +
                    'bg-gray-900 transform transition-transform duration-200 ' +
                    (menuOpen ? 'translate-x-0 ' : '-translate-x-full ') +
                    'md:translate-x-0 md:static md:flex w-64'
                }
            >
                <header className="text-center mb-12">
                    <h1 className="text-3xl font-bold font-chakra text-white tracking-widest">TechVerse</h1>
                    <p className="font-chakra text-cyan-400 text-glow-cyan text-sm">PAINEL DE CONTROLE</p>
                </header>
                <nav className="flex-grow">
                    <ul className="space-y-3">
                        {navButtons.map(({ Icon, tab, label }) => (
                            <li key={tab}>
                                <button
                                    onClick={() => setTab(tab)}
                                    className={`w-full flex items-center gap-3 font-chakra text-lg px-4 py-2 rounded-md transition-colors ${
                                        Tab === tab
                                            ? 'bg-cyan-500/10 text-cyan-300'
                                            : 'hover:bg-cyan-500/10 hover:text-cyan-300'
                                    }`}
                                >
                                    <Icon className="w-6 text-center" /> {label}
                                </button>
                            </li>
                        ))}
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
