import * as path from 'path';
// 定义文件存储目录
export const diskStoragePath = 'staticFiles';
// 定义文件存储路径
export const fileStoragePath = path.join(process.cwd(), '..', diskStoragePath);
