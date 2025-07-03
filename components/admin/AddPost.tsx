import { ActionResponse, addPostAction } from '@/lib/actions/admin/addPost';
import { useAdminData } from '@/components/admin/AdminProvider';
import { useEffect, useRef, useState } from 'react';
import { useActionState } from 'react';
import Popup from '../Popup';

export default function AddPosts() {
    const { authors, categories } = useAdminData();

    const initialState: ActionResponse = { success: false, message: '' };
    const [serverState, formAction] = useActionState(addPostAction, initialState);
    const [popupData, setPopupData] = useState<ActionResponse | null>(null);

    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (serverState?.message) {
            setPopupData(serverState);

            if (serverState.success) {
                formRef.current?.reset();
            }
        }
    }, [serverState]);

    function onClosePopup() {
        setPopupData(null);
    }

    return (
        <>
            <h2 className="font-chakra text-4xl text-white mb-8 tracking-wider">Adicionar Nova Transmissão</h2>

            <form
                ref={formRef}
                action={formAction}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div className="form-card">
                        <label
                            htmlFor="title"
                            className="block font-chakra text-lg mb-2 text-cyan-300">
                            Título do Post
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className="form-input text-xl"
                            placeholder="Insira o título aqui..."
                        />
                    </div>
                    <div className="form-card">
                        <label
                            htmlFor="description"
                            className="block font-chakra text-lg mb-2 text-cyan-300">
                            Descrição (Resumo)
                        </label>
                        <textarea
                            id="description"
                            rows={2}
                            name="description"
                            className="form-textarea"
                            placeholder="Pequeno resumo para os cards de preview..."></textarea>
                    </div>
                    <div className="form-card">
                        <label
                            htmlFor="content"
                            className="block font-chakra text-lg mb-2 text-cyan-300">
                            Conteúdo Principal
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            rows={5}
                            className="form-textarea min-w-[400px]"
                            placeholder="Escreva o conteúdo completo do post aqui. Use Markdown se desejar..."></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full font-chakra bg-pink-500 text-gray-900 py-3 rounded-md hover:bg-pink-400 hover:shadow-lg hover:shadow-pink-400/30 transition-all duration-300 font-bold text-lg">
                        PUBLICAR AGORA
                    </button>
                </div>

                <div className="space-y-8">
                    <div className="form-card flex flex-col gap-5">
                        <div>
                            <label
                                htmlFor="author"
                                className="block font-chakra text-lg mb-2 text-cyan-300">
                                Autor
                            </label>
                            <select
                                id="author"
                                name="authorName"
                                className="form-select">
                                {authors.map((author) => (
                                    <option
                                        key={author.name}
                                        value={author.name}>
                                        {author.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label
                                htmlFor="category"
                                className="block font-chakra text-lg mb-2 text-cyan-300">
                                Categoria
                            </label>
                            <select
                                id="category"
                                name="categorySlug"
                                className="form-select">
                                {categories.map((category) => (
                                    <option
                                        key={category.slug}
                                        value={category.slug}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label
                                htmlFor="tags"
                                className="block font-chakra text-lg mb-2 text-cyan-300">
                                Tags
                            </label>
                            <input
                                type="text"
                                id="tags"
                                name="tags"
                                className="form-input"
                                placeholder="NVIDIA, GPU, Benchmark..."
                            />
                            <p className="text-xs text-gray-500 mt-2">Separe as tags com vírgulas.</p>
                        </div>
                    </div>
                    <div className="form-card">
                        <label
                            htmlFor="imageUrl"
                            className="block font-chakra text-lg mb-2 text-cyan-300">
                            Imagem de Destaque
                        </label>
                        <input
                            type="file"
                            id="imageUrl"
                            name="image"
                            className="form-input"
                            placeholder="https://exemplo.com/imagem.png"
                        />
                    </div>
                    <div className="form-card">
                        <label
                            htmlFor="slug"
                            className="block font-chakra text-lg mb-2 text-cyan-300">
                            Slug do Post
                        </label>
                        <input
                            type="text"
                            id="slug"
                            name="slug"
                            className="form-input"
                            placeholder="analise-rtx-5090"
                        />
                        <p className="text-xs text-gray-500 mt-2">URL amigável para o post.</p>
                    </div>
                </div>
            </form>

            <Popup
                data={popupData}
                onClose={onClosePopup}
            />
        </>
    );
}
