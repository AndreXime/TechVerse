'use server';

import database from '@/lib/database';
import { revalidateAuthorCache } from '../../revalidateCache';
import { verifyAuth } from '../auth';

export interface ActionResponse {
    success: boolean;
    message: string;
    oldName?: string;
}

export async function removeAuthor(prevState: ActionResponse | undefined, formData: FormData): Promise<ActionResponse> {
    if (!(await verifyAuth())) {
        return { success: false, message: 'Acesso não autorizado.' };
    }

    const name = formData.get('name');

    if (typeof name !== 'string') {
        return { success: false, message: 'Não foi fornecido um nome de autor valido para deletar' };
    }

    if (name.toLowerCase() === 'sem autor') {
        return { success: false, message: 'Não é permitido deletar o autor padrão "sem autor".' };
    }

    try {
        const actualAuthor = await database.author.findUnique({
            where: { name },
            select: { name: true },
        });

        if (!actualAuthor) {
            return { success: false, message: 'Não foi possível encontrar esse autor' };
        }

        const fallbackAuthor = await database.author.upsert({
            where: { name: 'Sem autor' },
            update: {},
            create: {
                name: 'Sem autor',
                description: '',
                jobRole: '',
            },
        });

        // Move todos os posts da autor atual para 'sem autor'
        await database.post.updateMany({
            where: { author: { name } },
            data: { authorId: fallbackAuthor.id },
        });

        await database.author.delete({ where: { name } });

        await revalidateAuthorCache();
        return { success: true, message: 'Autor deletado com sucesso!', oldName: name };
    } catch (err) {
        return { success: false, message: 'Ocorreu um erro inesperado no servidor. Tente novamente mais tarde.' + err };
    }
}
