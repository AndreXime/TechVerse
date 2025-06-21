interface PostType {
    id: string;

    title: string;
    description: string;
    tags: string[];
    createdAt: Date;
    content: string;
    category: CategoryType;
    author: AuthorType;

    link: string;
    imageUrl: string;
}

interface CategoryType {
    name: string;
    link: string;
}

interface AuthorType {
    name: string;
    imageUrl: string;
    description: string;
    jobRole: string;
    linkedin: string;
    github: string;
    genericSocial: string;
}
