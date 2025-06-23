import fs from 'fs';
import path from 'path';
import { faker } from '@faker-js/faker';

const categories: CategoryType[] = [
    { name: 'INTELIGÊNCIA ARTIFICIAL', slug: 'inteligencia-artificial' },
    { name: 'HARDWARE', slug: 'hardware' },
    { name: 'DEVOPS', slug: 'devops' },
    { name: 'RETROWAVE', slug: 'retrowave' },
];

const authors: AuthorType[] = [
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

const categoryMap = Object.fromEntries(categories.map((c) => [c.slug, c]));
const authorMap = Object.fromEntries(authors.map((a) => [a.name.toLowerCase(), a]));

const tags: TagType[] = ['AI', 'DevOps', 'Retrowave', 'Hardware', 'Machine Learning', 'Cloud', 'IoT', 'Deep Learning'];

function generateFakePosts(count: number = 10): PostType[] {
    return Array.from({ length: count }, (_, i) => {
        const category = faker.helpers.arrayElement(categories);
        const title = faker.lorem.sentence(3);
        const slug = faker.helpers.slugify(title.toLowerCase());

        return {
            id: (i + 1).toString(),
            category,
            title: title.toUpperCase(),
            description: faker.lorem.sentence(10),
            content: `<article>${faker.lorem.paragraphs(20, '</p><p>')}</article>`,
            tags: faker.helpers.arrayElements(tags, 3),
            author: authorMap['andre'],
            createdAt: faker.date.recent({ days: 90 }),
            imageUrl: `https://placehold.co/600x400/0d0c1d/ec4899?text=${category.name.split(' ')[0]}`,
            slug,
        };
    });
}

const dataFile = path.join(process.cwd(), 'data/posts.json');

// Função para gerar dados somente uma vez por ambiente de desenvolvimento
// Função para carregar os posts do JSON ou gerar se não existir
function loadOrCreatePosts(): PostType[] {
    if (fs.existsSync(dataFile)) {
        const json = fs.readFileSync(dataFile, 'utf-8');
        const rawPosts = JSON.parse(json);

        const posts: PostType[] = rawPosts.map((post: PostType) => ({
            ...post,
            createdAt: new Date(post.createdAt),
        }));

        return posts;
    }

    const posts = generateFakePosts(20);
    fs.mkdirSync(path.dirname(dataFile), { recursive: true });
    fs.writeFileSync(dataFile, JSON.stringify(posts, null, 2));
    return posts;
}

const posts = loadOrCreatePosts();

export { posts, categories, categoryMap, authors, authorMap };
