'use server'; // Fundamental para definir como uma Server Action

import { revalidatePostCache } from '../revalidateCache';
import database, { Prisma } from '../../database';

// Interface para um estado de retorno, útil para mostrar erros no formulário
export interface ActionResponse {
    success: boolean;
    message: string;
    newSlug?: string;
}

export async function addPostAction(
    // O estado anterior é usado com o hook useFormState para feedback no cliente
    prevState: ActionResponse | undefined,
    formData: FormData
): Promise<ActionResponse> {
    // 1. Extrair e validar dados do formulário
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const content = formData.get('content') as string;
    const description = formData.get('description') as string;
    const imageUrl = formData.get('imageUrl') as string;
    const authorName = formData.get('author') as string;
    const categorySlug = formData.get('category') as string;

    if (!title || !slug || !content || !authorName || !categorySlug) {
        return { success: false, message: 'Erro: Título, Slug, Conteúdo, Autor e Categoria são obrigatórios.' };
    }

    try {
        // 2. Buscar IDs das relações (Autor e Categoria)
        const author = await database.author.findUnique({ where: { name: authorName } });
        const category = await database.category.findUnique({ where: { slug: categorySlug } });

        if (!author || !category) {
            return { success: false, message: 'Erro: Autor ou Categoria não encontrado.' };
        }

        // 3. Criar o post no banco de dados
        const newPost = await database.post.create({
            data: {
                title,
                slug,
                content,
                description,
                imageUrl,
                authorId: author.id,
                categoryId: category.id,
            },
            // Incluir a categoria no retorno para usar na revalidação
            include: {
                category: true,
            },
        });

        // 4. Revalidar/Limpar o cache
        await revalidatePostCache(newPost.slug, newPost.category.slug);

        // 5. Retornar sucesso. O redirecionamento ocorrerá no cliente ou aqui.
        // A action teve sucesso, agora podemos redirecionar.
    } catch (error) {
        // Tratar erros comuns, como slug duplicado
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            return { success: false, message: 'Erro: Este "slug" já está em uso. Por favor, escolha outro.' };
        }
        console.error('Falha ao criar o post:', error);
        return { success: false, message: 'Ocorreu um erro inesperado no servidor.' };
    }

    return { success: true, message: 'Post criado com sucesso!', newSlug: slug };
}
