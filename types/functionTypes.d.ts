export interface PaginationResponse {
    posts: PostType[];
    total: number;
    options: {
        authors: AuthorType[];
        categories: CategoryType[];
    };
}

export interface DatabaseData {
    posts: PostType[];
    authors: AuthorType[];
    categories: CategoryType[];
    tags: TagType[];
}
