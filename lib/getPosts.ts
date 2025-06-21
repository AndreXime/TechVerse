import { posts, authors } from './sampleDatabase';

export function getHomePosts(): PostType[] {
    return posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 4);
}

export function getOnePostBSlug(slug: string): PostType | undefined {
    return posts.find((post) => post.link === slug);
}

export function getRecommendPosts(category: string, excludeId: string): PostType[] {
    const available = posts.filter((post) => post.id !== excludeId);

    const sameCategory = available.filter((post) => post.category.link === category);
    if (sameCategory.length >= 2) {
        return sameCategory.slice(0, 2);
    }

    const shuffled = [...available].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 2);
}

export function getSamplePostsByCategories(): { category: CategoryType; posts: PostType[] }[] {
    const grouped: Record<string, PostType[]> = {};
    const categories: Record<string, CategoryType> = {};

    for (const post of posts) {
        const { category } = post;

        if (!grouped[category.name]) {
            grouped[category.name] = [];
            categories[category.name] = category;
        }

        if (grouped[category.name].length < 3) {
            grouped[category.name].push(post);
        }
    }

    return Object.entries(grouped).map(([categoryName, posts]) => ({
        category: categories[categoryName],
        posts,
    }));
}

export function getAllPostsByCategories(category: string) {
    return posts.filter((post) => post.category.link == category);
}

export function getPostsBySearchAttempt(input: string) {
    const term = input.toLowerCase();

    return posts.filter(
        (post) =>
            post.title.toLowerCase().includes(term) ||
            post.description.toLowerCase().includes(term) ||
            post.category.name.toLowerCase().includes(term)
    );
}

export function getAllAuthors() {
    return authors;
}
