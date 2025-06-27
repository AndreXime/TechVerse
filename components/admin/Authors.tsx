'use client';
import { useAdminData } from '@/components/admin/AdminProvider';
import { Pencil, Trash } from 'lucide-react';
import Image from 'next/image';

export default function Authors() {
    const { authors } = useAdminData();
    return (
        <>
            <h2 className="font-chakra text-4xl text-white mb-8 tracking-wider">Gerenciar Autores</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="table-wrapper">
                        <table className="admin-table w-full">
                            <thead>
                                <tr>
                                    <th className="w-20">Avatar</th>
                                    <th>Nome</th>
                                    <th>Cargo</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {authors.map((author) => (
                                    <tr key={author.name}>
                                        <td>
                                            <Image
                                                width={800}
                                                height={800}
                                                src={author.imageUrl || '#'}
                                                alt="Avatar"
                                                className="w-12 h-12 rounded-full object-cover"
                                            />
                                        </td>
                                        <td className="text-white font-bold">{author.name}</td>
                                        <td>{author.jobRole}</td>
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
                            Adicionar Novo Autor
                        </h3>
                        <form className="space-y-4">
                            <div>
                                <label htmlFor="author-name" className="block font-chakra text-sm mb-2">
                                    Nome
                                </label>
                                <input
                                    type="text"
                                    id="author-name"
                                    className="form-input"
                                    placeholder="Nome completo do autor"
                                />
                            </div>
                            <div>
                                <label htmlFor="author-role" className="block font-chakra text-sm mb-2">
                                    Cargo
                                </label>
                                <input
                                    type="text"
                                    id="author-role"
                                    className="form-input"
                                    placeholder="Ex: Especialista em IA"
                                />
                            </div>
                            <div>
                                <label htmlFor="author-description" className="block font-chakra text-sm mb-2">
                                    Descrição
                                </label>
                                <textarea
                                    id="author-description"
                                    rows={3}
                                    className="form-textarea"
                                    placeholder="Breve biografia do autor..."
                                ></textarea>
                            </div>
                            <div>
                                <label htmlFor="author-imageUrl" className="block font-chakra text-sm mb-2">
                                    URL da Imagem (Avatar)
                                </label>
                                <input
                                    type="text"
                                    id="author-imageUrl"
                                    className="form-input"
                                    placeholder="https://exemplo.com/avatar.png"
                                />
                            </div>
                            <div>
                                <label htmlFor="author-linkedin" className="block font-chakra text-sm mb-2">
                                    Link do LinkedIn
                                </label>
                                <input
                                    type="text"
                                    id="author-linkedin"
                                    className="form-input"
                                    placeholder="https://linkedin.com/in/usuario"
                                />
                            </div>
                            <div>
                                <label htmlFor="author-github" className="block font-chakra text-sm mb-2">
                                    Link do GitHub
                                </label>
                                <input
                                    type="text"
                                    id="author-github"
                                    className="form-input"
                                    placeholder="https://github.com/usuario"
                                />
                            </div>
                            <div>
                                <label htmlFor="author-genericSocial" className="block font-chakra text-sm mb-2">
                                    Outra Rede Social
                                </label>
                                <input
                                    type="text"
                                    id="author-genericSocial"
                                    className="form-input"
                                    placeholder="Link do Twitter, Site Pessoal, etc."
                                />
                            </div>
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    className="w-full font-chakra bg-pink-500 text-gray-900 py-2 rounded-md hover:bg-pink-400 hover:shadow-lg hover:shadow-pink-400/30 transition-all duration-300 font-bold"
                                >
                                    ADICIONAR AUTOR
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
