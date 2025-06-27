import { faker } from '@faker-js/faker';
import { PrismaClient } from './client/client';

const prisma = new PrismaClient();

type AuthorSeedType = Omit<AuthorType, 'id'>;
type CategorySeedType = Omit<CategoryType, 'id'>;
type PostSeedType = {
    title: string;
    slug: string;
    description: string;
    content: string;
    imageUrl: string;
    createdAt: Date;
    tags: string[];
    category: CategorySeedType;
    author: AuthorSeedType;
};

function generateFakePosts(count: number): {
    posts: PostSeedType[];
    categories: CategorySeedType[];
    authors: AuthorSeedType[];
} {
    const categories = [
        { name: 'INTELIGÊNCIA ARTIFICIAL', slug: 'inteligencia-artificial' },
        { name: 'HARDWARE', slug: 'hardware' },
        { name: 'DEVOPS', slug: 'devops' },
        { name: 'RETROWAVE', slug: 'retrowave' },
    ];

    const authors: AuthorSeedType[] = [
        {
            name: 'André',
            imageUrl: 'https://placehold.co/150x150/0d0c1d/ec4899?text=AD',
            description: 'Minha descrição',
            jobRole: 'Desenvolvedor e Fundador do Blog',
            linkedin: '#',
            genericSocial: 'andreximenes.xyz',
            github: '#',
        },
    ];

    const tags = ['AI', 'DevOps', 'Retrowave', 'Hardware', 'Machine Learning', 'Cloud', 'IoT', 'Deep Learning'];

    const posts = Array.from({ length: count }, (_, i) => {
        const category = faker.helpers.arrayElement(categories);
        const title = faker.lorem.sentence(3);
        const slug = faker.helpers.slugify(title.toLowerCase());

        return {
            title: title.toUpperCase(),
            slug,
            description: faker.lorem.sentence(10),
            content: `<article><p>${faker.lorem.paragraphs(20, '</p><p>')}</p></article>`,
            imageUrl: `https://placehold.co/600x400/0d0c1d/ec4899?text=${category.name.split(' ')[0]}`,
            createdAt: faker.date.recent({ days: 90 }),
            tags: faker.helpers.arrayElements(tags, { min: 2, max: 4 }),
            category,
            author: authors[0],
        };
    });

    return { posts, authors, categories };
}

async function main() {
    const { posts, authors, categories } = generateFakePosts(30);

    await prisma.$transaction([prisma.post.deleteMany(), prisma.author.deleteMany(), prisma.category.deleteMany()]);

    await prisma.author.createMany({ data: authors });
    await prisma.category.createMany({ data: categories });

    for (const post of posts) {
        await prisma.post.create({
            data: {
                title: post.title,
                slug: post.slug,
                description: post.description,
                content: post.content,
                tags: post.tags,
                imageUrl: post.imageUrl,
                createdAt: post.createdAt,
                author: {
                    connect: {
                        name: post.author.name,
                    },
                },
                category: {
                    connect: {
                        slug: post.category.slug,
                    },
                },
            },
        });
    }

    console.log('✅ Seed finalizada com sucesso.');
}

main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error('Erro ao executar seed:\n', e);
        await prisma.$disconnect();
        process.exit(1);
    });
