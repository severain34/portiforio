import { copyFile, mkdir } from 'node:fs/promises';

await mkdir('dist', { recursive: true });
await copyFile('portiforio.html', 'dist/portiforio.html');
console.log('Copied the existing portfolio page to dist/portiforio.html');
