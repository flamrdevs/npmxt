import fs from 'node:fs/promises';

const woff = async (file: string) => {
	const source = `${file}.woff`;
	const target = `${file}.ts`;

	const buffer = await fs.readFile(source);
	await fs.writeFile(target, `export default "${buffer.toString('base64')}"`);
	console.log(`${source} -> ${target}`);
};

Promise.all(['source-code-pro-400', 'source-code-pro-500', 'source-code-pro-600', 'source-code-pro-700'].map((file) => woff(file)));
