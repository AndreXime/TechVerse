export interface PaginationResponse {
    posts: PostType[];
    total: number;
    options: {
        authors: AuthorType[];
        categories: CategoryType[];
    };
}
