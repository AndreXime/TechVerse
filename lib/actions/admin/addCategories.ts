'use server';

import { z } from 'zod';
import database, { PrismaType } from '../../database';
import { verifyAuth } from './auth';
import { revalidatePath } from 'next/cache';

export interface ActionResponse {
    success: boolean;
    message: string;
    errors?: Record<string, string[]>;
}

const CategorySchema = z.object({
    name: z.string().min(3, { message: 'O nome deve ter no mínimo 3 caracteres.' }),
    slug: z
        .string()
        .min(3, { message: 'O slug deve ter no mínimo 3 caracteres.' })
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
            message: 'Slug inválido. Use apenas letras minúsculas, números e hífens.',
        }),
});

export async function addCategories(
    prevState: ActionResponse | undefined,
    formData: FormData
): Promise<ActionResponse> {
    // 2. Verificar autenticação
    if (!(await verifyAuth())) {
        return { success: false, message: 'Acesso não autorizado.' };
    }

    // 3. Validar os dados do formulário
    const validatedFields = CategorySchema.safeParse({
        name: formData.get('name'),
        slug: formData.get('slug'),
    });

    if (!validatedFields.success) {
        return {
            success: false,
            message: 'Erro de validação. Verifique os campos.',
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { name, slug } = validatedFields.data;

    try {
        // 4. Criar a categoria no banco de dados
        await database.category.create({
            data: {
                name,
                slug,
            },
        });

        // 5. Revalidar o cache para atualizar a lista na página
        revalidatePath('/admin/categories'); // Ajuste o caminho se for diferente

        return { success: true, message: `Categoria "${name}" criada com sucesso!` };
    } catch (error) {
        // Tratar erro de slug/nome duplicado
        if (error instanceof PrismaType.PrismaClientKnownRequestError && error.code === 'P2002') {
            return { success: false, message: 'Erro: Este "slug" ou "nome" já está em uso.' };
        }

        // Erro genérico
        return { success: false, message: 'Ocorreu um erro inesperado no servidor.' };
    }
}
