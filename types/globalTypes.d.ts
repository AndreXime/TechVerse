interface PostType {
    id: string;

    title: string;
    description: string;
    tags: string[];
    category: CategoryType;
    createdAt: Date;
    content: string;
    author: string;

    link: string;
    imageUrl: string;
}

interface CategoryType {
    name: string;
    link: string;
}
