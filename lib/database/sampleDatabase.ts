import fs from 'fs';
import path from 'path';
import { faker } from '@faker-js/faker';
import { DatabaseData } from '@/types/functionTypes';

class Database {
    public readonly posts: PostType[];
    public readonly categories: CategoryType[];
    public readonly authors: AuthorType[];
    public readonly tags: TagType[];
    public readonly categoryMap: Record<string, CategoryType>;
    public readonly authorMap: Record<string, AuthorType>;

    private readonly dataFile: string;

    constructor(postCount: number = 20) {
        this.dataFile = path.join(process.cwd(), 'data/posts.json');

        const { categories, tags, authors } = this.getStaticData();
        this.categories = categories;
        this.authors = authors;
        this.tags = tags;

        this.categoryMap = Object.fromEntries(this.categories.map((c) => [c.slug, c]));
        this.authorMap = Object.fromEntries(this.authors.map((a) => [a.name.toLowerCase(), a]));

        this.posts = this.loadOrCreatePosts(postCount);
    }

    private getStaticData(): { categories: CategoryType[]; authors: AuthorType[]; tags: TagType[] } {
        const categories = [
            { name: 'INTELIGÊNCIA ARTIFICIAL', slug: 'inteligencia-artificial' },
            { name: 'HARDWARE', slug: 'hardware' },
            { name: 'DEVOPS', slug: 'devops' },
            { name: 'RETROWAVE', slug: 'retrowave' },
        ];
        const authors = [
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
        return { authors, tags, categories };
    }

    private loadOrCreatePosts(postCount: number): PostType[] {
        try {
            if (fs.existsSync(this.dataFile)) {
                const json = fs.readFileSync(this.dataFile, 'utf-8');
                const rawPosts = JSON.parse(json);

                return rawPosts.map((post: PostType) => ({
                    ...post,
                    createdAt: new Date(post.createdAt),
                }));
            }
        } catch (error) {
            console.error('Erro ao ler o arquivo de posts. Gerando novos dados.', error);
        }

        const newPosts = this.generateFakePosts(postCount);
        try {
            fs.mkdirSync(path.dirname(this.dataFile), { recursive: true });
            fs.writeFileSync(this.dataFile, JSON.stringify(newPosts, null, 2));
        } catch (error) {
            console.error('Não foi possível salvar o arquivo de posts.', error);
        }
        return newPosts;
    }

    private generateFakePosts(count: number): PostType[] {
        return Array.from({ length: count }, (_, i) => {
            const category = faker.helpers.arrayElement(this.categories);
            const title = faker.lorem.sentence(3);
            const slug = faker.helpers.slugify(title.toLowerCase());

            return {
                id: (i + 1).toString(),
                category,
                title: title.toUpperCase(),
                description: faker.lorem.sentence(10),
                content: `<article><p>${faker.lorem.paragraphs(20, '</p><p>')}</p></article>`,
                tags: faker.helpers.arrayElements(this.tags, { min: 2, max: 4 }),
                author: this.authorMap['andre'],
                createdAt: faker.date.recent({ days: 90 }),
                imageUrl: `https://placehold.co/600x400/0d0c1d/ec4899?text=${category.name.split(' ')[0]}`,
                slug,
            };
        });
    }

    public saveData<T extends keyof DatabaseData>(type: T, data: DatabaseData[T]) {
        try {
            const currentData: DatabaseData = {
                posts: this.posts,
                categories: this.categories,
                authors: this.authors,
                tags: this.tags,
            };

            currentData[type] = data;

            fs.mkdirSync(path.dirname(this.dataFile), { recursive: true });
            fs.writeFileSync(this.dataFile, JSON.stringify(currentData, null, 2));
        } catch (error) {
            console.error(`Erro ao salvar ${type} no arquivo.`, error);
        }
    }
}

const database = new Database();

export const saveData = database.saveData.bind(database);

export const { posts, categories, tags, categoryMap, authors, authorMap } = database;
