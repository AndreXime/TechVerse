'use client';
import { useAdminData } from '@/components/admin/AdminProvider';
import { ActionResponse, removePost } from '@/lib/actions/admin/posts/removePost';
import { Pencil, Trash } from 'lucide-react';
import { useActionState, useState, useEffect } from 'react';
import Popup from '../Popup';
export default function AllPosts() {
    const { posts, setPosts, setEditingData, setTab } = useAdminData();

    const initialState: ActionResponse = { success: false, message: '' };
    const [serverState, formAction] = useActionState(removePost, initialState);
    const [popupData, setPopupData] = useState<ActionResponse | null>(null);

    useEffect(() => {
        if (!serverState?.message) return;

        setPopupData(serverState);

        if (!serverState.success) return;

        setPosts((prev) => prev.filter((post) => post.slug !== serverState.oldSlug));
    }, [serverState, setPosts]);

    function onClosePopup() {
        setPopupData(null);
    }

    return (
        <>
            <h2 className="font-chakra text-4xl text-white mb-8 tracking-wider">Todas as Transmissões</h2>

            <div className="w-full overflow-x-auto table-wrapper">
                <table className="min-w-[600px] w-full admin-table">
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
                            <tr key={post.title}>
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
                                <td>
                                    {new Date(post.createdAt).toLocaleString('pt-BR', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </td>
                                <td className="flex gap-4">
                                    <button
                                        onClick={() => {
                                            setEditingData(post);
                                            setTab('UpdatePost');
                                        }}
                                        className="text-cyan-400 hover:text-white"
                                        title="Editar"
                                    >
                                        <Pencil />
                                    </button>
                                    <form action={formAction}>
                                        <input type="text" name="slug" value={post.slug} readOnly className="hidden" />
                                        <button
                                            type="submit"
                                            className="text-pink-400 hover:text-white"
                                            title="Excluir"
                                        >
                                            <Trash />
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Popup data={popupData} onClose={onClosePopup} />
        </>
    );
}
