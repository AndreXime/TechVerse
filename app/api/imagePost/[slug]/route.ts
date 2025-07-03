import { NextResponse } from 'next/server';
import database from '@/lib/database';

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
    try {
        const post = await database.post.findUnique({
            where: { slug: (await params).slug },
            select: { image: true },
        });

        if (!post || !post.image) {
            return new NextResponse('Image not found', { status: 404 });
        }

        return new NextResponse(post.image, {
            headers: {
                'Content-Type': 'image/jpeg',
                'Content-Length': String(post.image.length),
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
        });
    } catch {
        return new NextResponse('Error fetching image', { status: 500 });
    }
}
