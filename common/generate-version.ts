import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// 替代 __dirname 获取当前脚本路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 读取版本号
const pkg = JSON.parse(readFileSync(resolve(__dirname, '../package.json'), 'utf-8'));
const version = pkg.version;

// 保证 src 目录存在
const targetDir = resolve(__dirname, '../common');
if (!existsSync(targetDir)) {
  mkdirSync(targetDir, { recursive: true });
}

// 写入 version.ts
const content = `// Auto-generated file. Do not edit manually.
export const VERSION = "${version}";
`;

writeFileSync(resolve(targetDir, 'version.ts'), content);

console.log(`✅ version.ts generated: ${version}`);
