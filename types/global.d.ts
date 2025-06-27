import type { Prisma } from '../prisma/client/client';

declare global {
    type PostType = Prisma.PostGetPayload<{ include: { category: true; author: true } }>;
    type CategoryType = Prisma.CategoryGetPayload<{}>;
    type AuthorType = Prisma.AuthorGetPayload<{}>;

    interface QueryTypes {
        searchParams: Promise<{ [key: string]: string | undefined }>;
    }

    interface SlugType {
        params: Promise<{ slug: string }>;
    }
}
