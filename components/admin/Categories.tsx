'use client';
import { useAdminData } from '@/lib/admin/admin.context';
import { Pencil, Trash } from 'lucide-react';

export default function Categories() {
    const { categories } = useAdminData();
    return (
        <>
            <h2 className="font-chakra text-4xl text-white mb-8 tracking-wider">Gerenciar Categorias</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="table-wrapper">
                        <table className="admin-table w-full">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Slug</th>
                                    <th>Total de Posts</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category) => (
                                    <tr key={category.slug}>
                                        <td className="text-white font-bold">{category.name}</td>
                                        <td>{category.slug}</td>
                                        <td>15</td>
                                        <td>
                                            <span className="flex items-center justify-start h-full gap-3">
                                                <a href="#" className="text-cyan-400 hover:text-white" title="Editar">
                                                    <Pencil />
                                                </a>
                                                <a href="#" className="text-pink-400 hover:text-white" title="Excluir">
                                                    <Trash />
                                                </a>
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div>
                    <div className="form-card sticky top-8">
                        <h3 className="font-chakra text-xl mb-4 text-cyan-300 border-b border-cyan-400/20 pb-2">
                            Adicionar Nova Categoria
                        </h3>
                        <form className="space-y-6">
                            <div>
                                <label htmlFor="category-name" className="block font-chakra text-sm mb-2">
                                    Nome da Categoria
                                </label>
                                <input
                                    type="text"
                                    id="category-name"
                                    name="category-name"
                                    className="form-input"
                                    placeholder="Ex: Cybersegurança"
                                />
                            </div>
                            <div>
                                <label htmlFor="category-slug" className="block font-chakra text-sm mb-2">
                                    Slug
                                </label>
                                <input
                                    type="text"
                                    id="category-slug"
                                    name="category-slug"
                                    className="form-input"
                                    placeholder="ex: ciberseguranca"
                                />
                                <p className="text-xs text-gray-500 mt-2">
                                    Versão amigável para URL, sem espaços ou acentos.
                                </p>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full font-chakra bg-pink-500 text-gray-900 py-2 rounded-md hover:bg-pink-400 hover:shadow-lg hover:shadow-pink-400/30 transition-all duration-300 font-bold"
                                >
                                    ADICIONAR
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
