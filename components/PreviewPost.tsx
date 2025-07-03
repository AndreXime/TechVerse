import { colorClasses } from '@/lib/colors';
import Image from 'next/image';
import Link from 'next/link';

export interface PreviewPostProps {
    slug: string;
    category: { name: string };
    title: string;
    description: string;
    tags: string[];
}

export default function PreviewPost({
    post,
    colorKey,
}: {
    post: PreviewPostProps;
    colorKey: keyof typeof colorClasses;
}) {
    const color = colorClasses[colorKey];

    return (
        <div
            className={`border ${color.border} rounded-lg glass-effect hover:${color.borderNormal} transition-colors duration-300 overflow-hidden flex flex-col`}
        >
            <Image
                width={600}
                height={600}
                src={`/api/imagePost/${post.slug}`}
                alt={`Imagem do post sobre ${post.category.name}`}
                className="w-full h-48 object-cover"
            />
            <div className="p-6 flex flex-col flex-grow">
                <p className={`font-chakra text-glow-pink text-xl mb-2 ${color.text}`}>
                    {post.category.name.toUpperCase()}
                </p>
                <h4 className="text-xl font-bold text-white mb-2">{post.title}</h4>
                <p className="mb-4 flex-grow break-words">{post.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags.map((tag) => (
                        <span
                            key={tag}
                            className={`${
                                color.bg + ' ' + color.textBtn
                            } text-xs font-medium px-2.5 py-1 rounded-full}`}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                <Link
                    href={'/posts/' + post.slug}
                    className={`font-chakra mt-auto text-center ${color.bg} border ${color.borderNormal} ${color.textBtn} py-2 px-4 rounded-md ${color.bgHover} hover:text-white transition-colors duration-300`}
                >
                    LER ARTIGO
                </Link>
            </div>
        </div>
    );
}
