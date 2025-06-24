import { unstable_cache } from 'next/cache';

function serializeArgs(args: unknown[]): string {
    return args.map((arg) => (typeof arg === 'object' ? JSON.stringify(arg) : String(arg))).join(':');
}

export function cacheFn<Args extends unknown[], Return>(
    fn: (...args: Args) => Promise<Return>,
    baseKey: string
): (...args: Args) => Promise<Return> {
    return (...args: Args) => {
        // Gera um key dinamica com base nos argumentos para gerar cache diferente para cada argumento
        const key = `${baseKey}:${serializeArgs(args)}`;

        const cached = unstable_cache(() => fn(...args), [key], {
            revalidate: false,
            tags: [baseKey],
        });
        return cached();
    };
}
