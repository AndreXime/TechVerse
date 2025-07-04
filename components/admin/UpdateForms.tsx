'use client';
import { useAdminData } from '@/components/admin/AdminProvider';
import { addCategories, ActionResponse } from '@/lib/actions/admin/categories/addCategories';
import { useActionState, useState, useRef, useEffect } from 'react';
import Popup from '../Popup';
import { AuthorsAdmin, CategoryAdmin, PostsAdmin } from '@/types/adminProviderTypes';

export default function UpdatesForms() {
    const { categories, authors, setCategories, Tab, EditingData } = useAdminData();

    const initialState: ActionResponse = { success: false, message: '' };
    const [serverState, formAction] = useActionState(addCategories, initialState);
    const [popupData, setPopupData] = useState<ActionResponse | null>(null);

    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (!serverState?.message) return;

        setPopupData(serverState);

        if (!serverState.success || !serverState.data) return;

        formRef.current?.reset();
        const data = serverState.data;
        setCategories((prev) => [...prev, data]);
    }, [serverState, setCategories]);

    function onClosePopup() {
        setPopupData(null);
    }

    if (!EditingData) return null;

    if (Tab == 'UpdateAuthor') {
        const data = EditingData as AuthorsAdmin;
        return (
            <div className="form-card sticky top-8">
                <h3 className="font-chakra text-xl mb-4 text-cyan-300 border-b border-cyan-400/20 pb-2">
                    Editando {data.name}
                </h3>
                <form ref={formRef} action={formAction} className="space-y-4">
                    <div>
                        <label htmlFor="author-name" className="block font-chakra text-sm mb-2">
                            Nome
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="author-name"
                            defaultValue={data.name}
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
                            name="role"
                            defaultValue={data.jobRole}
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
                            name="description"
                            defaultValue={data.description}
                            className="form-textarea"
                            placeholder="Breve biografia do autor..."
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="author-imageUrl" className="block font-chakra text-sm mb-2">
                            URL da Imagem (Avatar)
                        </label>
                        <input
                            type="file"
                            id="author-imageUrl"
                            className="form-input"
                            name="image"
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
                            name="linkedinUrl"
                            defaultValue={data.linkedin || ''}
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
                            name="githubUrl"
                            defaultValue={data.github || ''}
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
                            name="socialUrl"
                            defaultValue={data.genericSocial || ''}
                            placeholder="Link do Twitter, Site Pessoal, etc."
                        />
                    </div>
                    <div className="pt-2">
                        <button
                            type="submit"
                            className="w-full font-chakra bg-pink-500 text-gray-900 py-2 rounded-md hover:bg-pink-400 hover:shadow-lg hover:shadow-pink-400/30 transition-all duration-300 font-bold"
                        >
                            SALVAR AUTOR
                        </button>
                    </div>
                </form>
            </div>
        );
    }
    if (Tab == 'UpdateCategory') {
        const data = EditingData as CategoryAdmin;

        return (
            <div className="form-card sticky top-8">
                <h3 className="font-chakra text-xl mb-4 text-cyan-300 border-b border-cyan-400/20 pb-2">
                    Editando categoria {data.name}
                </h3>
                <form ref={formRef} action={formAction} className="space-y-6">
                    <div>
                        <label htmlFor="category-name" className="block font-chakra text-sm mb-2">
                            Nome da Categoria
                        </label>
                        <input
                            type="text"
                            id="category-name"
                            defaultValue={data.name}
                            name="name"
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
                            name="slug"
                            defaultValue={data.slug}
                            className="form-input"
                            placeholder="ex: ciberseguranca"
                        />
                        <p className="text-xs text-gray-500 mt-2">Versão amigável para URL, sem espaços ou acentos.</p>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full font-chakra bg-pink-500 text-gray-900 py-2 rounded-md hover:bg-pink-400 hover:shadow-lg hover:shadow-pink-400/30 transition-all duration-300 font-bold"
                        >
                            Salvar
                        </button>
                    </div>
                </form>
                <Popup data={popupData} onClose={onClosePopup} />
            </div>
        );
    }

    const data = EditingData as PostsAdmin;
    return (
        <div>
            <h2 className="font-chakra text-4xl text-white mb-8 tracking-wider">Editando Post {data.title}</h2>

            <form ref={formRef} action={formAction} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div className="form-card">
                        <label htmlFor="title" className="block font-chakra text-lg mb-2 text-cyan-300">
                            Título do Post
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            defaultValue={data.title}
                            className="form-input text-xl"
                            placeholder="Insira o título aqui..."
                        />
                        <label htmlFor="slug" className="block font-chakra text-lg mb-2 mt-4 text-cyan-300">
                            Slug do Post
                        </label>
                        <input
                            type="text"
                            id="slug"
                            name="slug"
                            defaultValue={data.slug}
                            className="form-input"
                            placeholder="analise-rtx-5090"
                        />
                        <p className="text-xs text-gray-500 mt-2">URL amigável para o post.</p>
                    </div>

                    <div className="form-card">
                        <label htmlFor="description" className="block font-chakra text-lg mb-2 text-cyan-300">
                            Descrição (Resumo)
                        </label>
                        <textarea
                            id="description"
                            rows={2}
                            name="description"
                            defaultValue={data.description}
                            className="form-textarea"
                            placeholder="Pequeno resumo para os cards de preview..."
                        ></textarea>
                        <label htmlFor="content" className="block font-chakra text-lg mb-2 mt-5 text-cyan-300">
                            Conteúdo Principal
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            rows={5}
                            className="form-textarea"
                            defaultValue={data.content}
                            placeholder="Escreva o conteúdo completo do post aqui. Use Markdown se desejar..."
                        ></textarea>
                    </div>
                </div>

                <div className="form-card flex flex-col justify-start gap-5">
                    <div>
                        <label htmlFor="author" className="block font-chakra text-lg mb-2 text-cyan-300">
                            Autor
                        </label>
                        <select id="author" name="authorName" className="form-select">
                            {authors.map((author) => (
                                <option key={author.name} value={author.name}>
                                    {author.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="category" className="block font-chakra text-lg mb-2 text-cyan-300">
                            Categoria
                        </label>
                        <select id="category" name="categorySlug" className="form-select">
                            {categories.map((category) => (
                                <option key={category.slug} value={category.slug}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="tags" className="block font-chakra text-lg mb-2 text-cyan-300">
                            Tags
                        </label>
                        <input
                            type="text"
                            id="tags"
                            name="tags"
                            defaultValue={data.tags.join(',')}
                            className="form-input"
                            placeholder="NVIDIA, GPU, Benchmark..."
                        />
                        <p className="text-xs text-gray-500 mt-2">Separe as tags com vírgulas.</p>
                    </div>
                    <div>
                        <label htmlFor="imageUrl" className="block font-chakra text-lg mb-2 text-cyan-300">
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
                </div>
                <button
                    type="submit"
                    className="col-span-full w-full font-chakra bg-pink-500 text-gray-900 py-3 rounded-md hover:bg-pink-400 hover:shadow-lg hover:shadow-pink-400/30 transition-all duration-300 font-bold text-lg"
                >
                    SALVAR AGORA
                </button>
            </form>

            <Popup data={popupData} onClose={onClosePopup} />
        </div>
    );
}
