import sharp from 'sharp';

type ProcessImageResult = { error: undefined; imageBuffer: Buffer } | { imageBuffer: undefined; error: string };
/*
 * Processa um arquivo de imagem para garantir que ele tenha no máximo um tamanho específico.
 */
export async function processImage(file: File, targetSizeInMb: number = 1.5): Promise<ProcessImageResult> {
    try {
        if (!file || file.size === 0) {
            return { imageBuffer: undefined, error: 'Não foi fornecido nenhuma imagem' };
        }

        const TARGET_SIZE_BYTES = targetSizeInMb * 1024 * 1024;
        const MAX_ATTEMPTS = 10;

        const initialBuffer = Buffer.from(await file.arrayBuffer());

        if (initialBuffer.length <= TARGET_SIZE_BYTES) {
            return { error: undefined, imageBuffer: initialBuffer };
        }

        let currentBuffer: Buffer = initialBuffer;
        let attempts = 0;
        let scale = 0.9;
        let quality = 80;

        while (currentBuffer.length > TARGET_SIZE_BYTES && attempts < MAX_ATTEMPTS) {
            attempts++;

            currentBuffer = await sharp(initialBuffer)
                .resize({
                    width: Math.round((await sharp(initialBuffer).metadata()).width! * scale),
                })
                .jpeg({ quality: quality, progressive: true, optimizeScans: true })
                .toBuffer();

            scale -= 0.1;
            if (quality > 40) {
                quality -= 5;
            }
        }

        if (currentBuffer.length > TARGET_SIZE_BYTES) {
            return {
                imageBuffer: undefined,
                error: `Não foi possível reduzir a imagem para menos de ${targetSizeInMb} MB.`,
            };
        }

        return { error: undefined, imageBuffer: currentBuffer }; // Retorno de sucesso
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro desconhecido.';
        return { imageBuffer: undefined, error: `Falha ao processar imagem: ${errorMessage}` };
    }
}
