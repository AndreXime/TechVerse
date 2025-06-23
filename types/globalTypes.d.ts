interface PostType {
    id: string;

    title: string;
    description: string;
    createdAt: Date;
    content: string;
    tags: TagType[];
    category: CategoryType;
    author: AuthorType;

    slug: string;
    imageUrl: string;
}

interface CategoryType {
    name: string;
    slug: string;
}

type TagType = string;

interface AuthorType {
    name: string;
    imageUrl: string;
    description: string;
    jobRole: string;
    linkedin: string;
    github: string;
    genericSocial: string;
}
