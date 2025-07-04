'use client';
import { useAdminData } from '@/components/admin/AdminProvider';
import { useActionState, useState, useEffect } from 'react';
import Popup from '../Popup';

import { AuthorsAdmin, CategoryAdmin, PostsAdmin } from '@/types/adminProviderTypes';
import { updatePostAction, ActionResponse as PostActionResponse } from '@/lib/actions/admin/posts/updatePost';
import { updateAuthorAction, ActionResponse as AuthorActionResponse } from '@/lib/actions/admin/author/updateAuthor';
import {
    updateCategoryAction,
    ActionResponse as CategoryActionResponse,
} from '@/lib/actions/admin/categories/updateCategory';

export default function UpdatesForms() {
    const { categories, authors, setCategories, setPosts, setAuthors, Tab, EditingData } = useAdminData();

    // Estado para controlar os dados do popup
    const [popupData, setPopupData] = useState<
        PostActionResponse | AuthorActionResponse | CategoryActionResponse | null
    >(null);

    // Estados para cada action (Post, Autor, Categoria)
    const [serverStatePost, formActionPost] = useActionState(updatePostAction, { success: false, message: '' });
    const [serverStateAuthor, formActionAuthor] = useActionState(updateAuthorAction, { success: false, message: '' });
    const [serverStateCategory, formActionCategory] = useActionState(updateCategoryAction, {
        success: false,
        message: '',
    });

    // Efeito para a action de ATUALIZAR POST
    useEffect(() => {
        if (!serverStatePost?.message) return;
        setPopupData(serverStatePost);
        if (serverStatePost.success && serverStatePost.data) {
            const updatedPost = serverStatePost.data;
            // Substitui o post antigo pelo novo no estado
            setPosts((prev) => prev.map((post) => (post.id === updatedPost.id ? updatedPost : post)));
        }
    }, [serverStatePost, setPosts]);

    // Efeito para a action de ATUALIZAR AUTOR
    useEffect(() => {
        if (!serverStateAuthor?.message) return;
        setPopupData(serverStateAuthor);
        if (serverStateAuthor.success && serverStateAuthor.data) {
            const updatedAuthor = serverStateAuthor.data;
            // Substitui o autor antigo pelo novo no estado
            setAuthors((prev) => prev.map((author) => (author.id === updatedAuthor.id ? updatedAuthor : author)));
        }
    }, [serverStateAuthor, setAuthors]);

    // Efeito para a action de ATUALIZAR CATEGORIA
    useEffect(() => {
        if (!serverStateCategory?.message) return;
        setPopupData(serverStateCategory);
        if (serverStateCategory.success && serverStateCategory.data) {
            const updatedCategory = serverStateCategory.data;
            // Substitui a categoria antiga pela nova no <estado></estado>
            setCategories((prev) =>
                prev.map((cat) => (cat.slug === (EditingData as CategoryAdmin)?.slug ? updatedCategory : cat))
            );
        }
    }, [serverStateCategory, setCategories, EditingData]);

    function onClosePopup() {
        setPopupData(null);
    }

    const ActiveForm = () => {
        switch (Tab) {
            case 'UpdateAuthor':
                return <UpdateAuthorForm data={EditingData as AuthorsAdmin} formActionAuthor={formActionAuthor} />;
            case 'UpdateCategory':
                return (
                    <UpdateCategoryForm data={EditingData as CategoryAdmin} formActionCategory={formActionCategory} />
                );
            default:
                return (
                    <UpdatePostForm
                        data={EditingData as PostsAdmin}
                        authors={authors}
                        categories={categories}
                        formActionPost={formActionPost}
                    />
                );
        }
    };

    if (!EditingData) return null;

    return (
        <>
            <ActiveForm />
            <Popup data={popupData} onClose={onClosePopup} />;
        </>
    );
}

function UpdateAuthorForm({
    data,
    formActionAuthor,
}: {
    data: AuthorsAdmin;
    formActionAuthor: (payload: FormData) => void;
}) {
    return (
        <div className="form-card sticky top-8">
            <h3 className="font-chakra text-xl mb-4 text-cyan-300 border-b border-cyan-400/20 pb-2">
                Editando {data.name}
            </h3>
            <form action={formActionAuthor} className="space-y-4">
                {/* Campo oculto para enviar o nome original, necessário para encontrar o autor no DB */}
                <input type="hidden" name="originalName" value={data.name} />

                <div>
                    <label htmlFor="author-name" className="block font-chakra text-sm mb-2">
                        Nome
                    </label>
                    <input type="text" name="name" id="author-name" defaultValue={data.name} className="form-input" />
                </div>
                <div>
                    <label htmlFor="author-jobRole" className="block font-chakra text-sm mb-2">
                        Cargo
                    </label>
                    {/* Corrigido: name="role" para name="jobRole" */}
                    <input
                        type="text"
                        id="author-jobRole"
                        name="jobRole"
                        defaultValue={data.jobRole}
                        className="form-input"
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
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="author-image" className="block font-chakra text-sm mb-2">
                        Avatar (Nova Imagem)
                    </label>
                    <input type="file" id="author-image" className="form-input" name="image" />
                </div>
                <div>
                    <label htmlFor="author-linkedin" className="block font-chakra text-sm mb-2">
                        Link do LinkedIn
                    </label>
                    {/* Corrigido: name="linkedinUrl" para name="linkedin" */}
                    <input
                        type="text"
                        id="author-linkedin"
                        name="linkedin"
                        defaultValue={data.linkedin || ''}
                        className="form-input"
                    />
                </div>
                <div>
                    <label htmlFor="author-github" className="block font-chakra text-sm mb-2">
                        Link do GitHub
                    </label>
                    {/* Corrigido: name="githubUrl" para name="github" */}
                    <input
                        type="text"
                        id="author-github"
                        className="form-input"
                        name="github"
                        defaultValue={data.github || ''}
                    />
                </div>
                <div>
                    <label htmlFor="author-genericSocial" className="block font-chakra text-sm mb-2">
                        Outra Rede Social
                    </label>
                    {/* Corrigido: name="socialUrl" para name="genericSocial" */}
                    <input
                        type="text"
                        id="author-genericSocial"
                        className="form-input"
                        name="genericSocial"
                        defaultValue={data.genericSocial || ''}
                    />
                </div>
                <div className="pt-2">
                    <button
                        type="submit"
                        className="w-full font-chakra bg-pink-500 text-gray-900 py-2 rounded-md hover:bg-pink-400 transition-all duration-300 font-bold"
                    >
                        SALVAR AUTOR
                    </button>
                </div>
            </form>
        </div>
    );
}
function UpdateCategoryForm({
    data,
    formActionCategory,
}: {
    data: CategoryAdmin;
    formActionCategory: (payload: FormData) => void;
}) {
    return (
        <div className="form-card sticky top-8">
            <h3 className="font-chakra text-xl mb-4 text-cyan-300 border-b border-cyan-400/20 pb-2">
                Editando categoria {data.name}
            </h3>
            <form action={formActionCategory} className="space-y-6">
                {/* Campo oculto para enviar o slug original, necessário para encontrar a categoria no DB */}
                <input type="hidden" name="originalSlug" value={data.slug} />

                <div>
                    <label htmlFor="category-name" className="block font-chakra text-sm mb-2">
                        Nome da Categoria
                    </label>
                    <input type="text" id="category-name" defaultValue={data.name} name="name" className="form-input" />
                </div>
                <div>
                    <label htmlFor="category-slug" className="block font-chakra text-sm mb-2">
                        Slug
                    </label>
                    <input type="text" id="category-slug" name="slug" defaultValue={data.slug} className="form-input" />
                    <p className="text-xs text-gray-500 mt-2">Versão amigável para URL, sem espaços ou acentos.</p>
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full font-chakra bg-pink-500 text-gray-900 py-2 rounded-md hover:bg-pink-400 transition-all duration-300 font-bold"
                    >
                        SALVAR CATEGORIA
                    </button>
                </div>
            </form>
        </div>
    );
}

function UpdatePostForm({
    data,
    authors,
    categories,
    formActionPost,
}: {
    data: PostsAdmin;
    authors: AuthorsAdmin[];
    categories: CategoryAdmin[];
    formActionPost: (payload: FormData) => void;
}) {
    return (
        <div>
            <h2 className="font-chakra text-4xl text-white mb-8 tracking-wider">Editando Post {data.title}</h2>

            <form action={formActionPost} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
        </div>
    );
}
