'use client';
import { useAdminData } from '@/lib/admin/admin.context';
import { Pencil, Trash } from 'lucide-react';
export default function AllPosts() {
    const { posts } = useAdminData();
    return (
        <>
            <h2 className="font-chakra text-4xl text-white mb-8 tracking-wider">Todas as Transmissões</h2>

            <div className="table-wrapper">
                <table className="admin-table w-full">
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Autor</th>
                            <th>Categoria</th>
                            <th>Tags</th>
                            <th>Data</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post) => (
                            <tr key={post.id}>
                                <td className="text-white font-bold">{post.title}</td>
                                <td>{post.author.name}</td>
                                <td>{post.category.name}</td>
                                <td>
                                    <div className="flex flex-wrap gap-1">
                                        {post.tags.map((tag) => (
                                            <span key={tag} className="tag-badge">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td>{post.createdAt.toLocaleDateString()}</td>
                                <td className="flex gap-4">
                                    <button className="text-cyan-400 hover:text-white" title="Editar">
                                        <Pencil />
                                    </button>
                                    <button className="text-pink-400 hover:text-white" title="Excluir">
                                        <Trash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
