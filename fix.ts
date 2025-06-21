import fs from 'fs';
import path from 'path';

/*
    Para facilitar transformar html em tsx esse script tenta aproximar o mais possivel de um tsx do next valido
*/

function processFile(filePath: string) {
    let content = fs.readFileSync(filePath, 'utf-8');
    console.log('Modificando ' + filePath);
    // Substituições simples
    content = content.replace(/\bclass(?=\s*=)/g, 'className');

    // <a> -> <Link>
    content = content.replace(/<a\b/g, '<Link').replace(/<\/a>/g, '</Link>');

    // <img> -> <Image> + adiciona width/height se não tiver
    content = content.replace(/<img\b([^>]*?)\/?>/g, (match, attrs) => {
        const hasWidth = /width\s*=/.test(attrs);
        const hasHeight = /height\s*=/.test(attrs);

        const finalAttrs = `${attrs.trim()}${hasWidth ? '' : ' width={800}'}${hasHeight ? '' : ' height={800}'}`.trim();

        return `<Image ${finalAttrs} />`;
    });

    // </img> → </Image> (caso exista)
    content = content.replace(/<\/img>/g, '</Image>');

    // Substituições SVG
    content = content
        .replace(/stroke-linecap=/g, 'strokeLinecap=')
        .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
        .replace(/stroke-width=/g, 'strokeWidth=');

    // Remove linhas com <!--
    content = content
        .split('\n')
        .filter((line) => !line.includes('<!--'))
        .join('\n');

    // Adiciona imports se necessário
    const imports: string[] = [];

    if (content.includes('<Link') && !content.includes('import Link from')) {
        imports.push(`import Link from 'next/link';`);
    }

    if (content.includes('<Image') && !content.includes('import Image from')) {
        imports.push(`import Image from 'next/image';`);
    }

    if (imports.length > 0) {
        content = `${imports.join('\n')}\n${content}`;
    }

    fs.writeFileSync(filePath, content);
}

function processDir(dir: string) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            processDir(fullPath);
        } else if (file.endsWith('.tsx')) {
            processFile(fullPath);
        }
    }
}

const targetPath = process.argv[2];

if (!targetPath) {
    console.error('Erro: informe o caminho do arquivo ou pasta.\nUso: node fix.js caminho/para/arquivo.tsx');
    process.exit(1);
}

const resolvedPath = path.resolve(targetPath);
const stat = fs.statSync(resolvedPath);

if (stat.isDirectory()) {
    processDir(resolvedPath);
} else {
    processFile(resolvedPath);
}
