import { Pencil, Trash } from 'lucide-react';

export default function Tags() {
    return (
        <>
            <h2 className="font-chakra text-4xl text-white mb-8 tracking-wider">Gerenciar Tags</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="table-wrapper">
                        <table className="admin-table w-full">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Total de Posts</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="text-white font-bold">Demoscene</td>
                                    <td>3</td>
                                    <td className="flex gap-3">
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
                </div>

                <div>
                    <div className="form-card sticky top-8">
                        <h3 className="font-chakra text-xl mb-4 text-cyan-300 border-b border-cyan-400/20 pb-2">
                            Adicionar Nova Tag
                        </h3>
                        <form className="space-y-6">
                            <div>
                                <label htmlFor="tag-name" className="block font-chakra text-sm mb-2">
                                    Nome da Tag
                                </label>
                                <input
                                    type="text"
                                    id="tag-name"
                                    name="tag-name"
                                    className="form-input"
                                    placeholder="Ex: Cyberpunk"
                                />
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
