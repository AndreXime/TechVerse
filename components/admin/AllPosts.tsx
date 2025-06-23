import { Pencil, Trash } from 'lucide-react';

export default function AllPosts() {
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
                        <tr>
                            <td className="text-white font-bold">O Fim do DevOps?</td>
                            <td>Jane Doe</td>
                            <td>DevOps</td>
                            <td>
                                <div className="flex flex-wrap gap-1">
                                    <span className="tag-badge">NoOps</span>
                                    <span className="tag-badge">AIOps</span>
                                </div>
                            </td>
                            <td>2024-05-15</td>
                            <td className="flex gap-4">
                                <a href="#" className="text-cyan-400 hover:text-white" title="Editar">
                                    <Pencil />
                                </a>
                                <a href="#" className="text-pink-400 hover:text-white" title="Excluir">
                                    <Trash />
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}
