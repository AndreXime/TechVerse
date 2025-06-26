import { unstable_cache } from 'next/cache';

function serializeArgs(args: unknown[]): string {
    return args.map((arg) => (typeof arg === 'object' ? JSON.stringify(arg) : String(arg))).join(':');
}

export function cacheFn<Args extends unknown[], Return>(
    fn: (...args: Args) => Promise<Return>,
    baseKey: string
): (...args: Args) => Promise<Return> {
    return (...args: Args) => {
        // A chave única
        const key = `${baseKey}:${serializeArgs(args)}`;

        // Tags dinâmicas: uma genérica e uma específica baseada nos argumentos
        const tags = [baseKey, ...args.map((arg) => String(arg))]; // Ex: ['post-by-slug', 'meu-post-incrivel']

        const cached = unstable_cache(() => fn(...args), [key], {
            revalidate: false,
            tags: tags,
        });
        return cached();
    };
}
