import { NextResponse } from 'next/server';
import database from '@/lib/database';

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
    try {
        const post = await database.author.findUnique({
            where: { name: (await params).slug },
            select: { image: true },
        });

        if (!post || !post.image) {
            return new NextResponse('Imagem não encontrado', { status: 404 });
        }

        return new NextResponse(post.image, {
            headers: {
                'Content-Type': 'image/jpeg',
                'Content-Length': String(post.image.length),
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
        });
    } catch {
        return new NextResponse('Erro buscando a imagem', { status: 500 });
    }
}
