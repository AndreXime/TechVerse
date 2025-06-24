import database, { Prisma } from './database';

export type FilterOptions = {
	inputSimple?: string;
	title?: string;
	author?: string;
	category?: string;
	dateFrom?: Date;
	dateTo?: Date;
};

export interface PaginationResponse {
	posts: PostType[];
	total: number;
	options: {
		authors: AuthorType[];
		categories: CategoryType[];
	};
}

type ModeOptions = 'simple' | 'structured';

export async function searchPosts(
	mode: ModeOptions = 'structured',
	options: FilterOptions = {}
): Promise<PaginationResponse> {
	const { inputSimple, title, author, category, dateFrom, dateTo } = options;

	const where: Prisma.PostWhereInput = {};

	if (mode === 'simple' && inputSimple) {
		const term = inputSimple.toLowerCase();

		where.OR = [
			{
				title: {
					contains: term,
					mode: 'insensitive',
				},
			},
			{
				description: {
					contains: term,
					mode: 'insensitive',
				},
			},
			{
				category: {
					name: {
						contains: term,
						mode: 'insensitive',
					},
				},
			},
		];
	}

	if (mode === 'structured') {
		if (title) {
			where.title = {
				contains: title,
				mode: 'insensitive',
			};
		}

		if (author) {
			where.author = {
				name: {
					contains: author,
					mode: 'insensitive',
				},
			};
		}

		if (category) {
			where.category = {
				slug: {
					equals: category.toLowerCase(),
				},
			};
		}

		if (dateFrom || dateTo) {
			where.createdAt = {};
			if (dateFrom) where.createdAt.gte = dateFrom;
			if (dateTo) where.createdAt.lte = dateTo;
		}
	}

	const [posts, total, authors, categories] = await Promise.all([
		database.post.findMany({
			where,
			include: {
				category: true,
				author: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
		}),
		database.post.count({ where }),
		database.author.findMany(),
		database.category.findMany(),
	]);

	return {
		posts,
		total,
		options: {
			authors,
			categories,
		},
	};
}
