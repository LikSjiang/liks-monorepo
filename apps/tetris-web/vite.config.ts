import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  server: {
    port: 5140, // 指定dev sever的端口号，默认为5173
    host: '0.0.0.0', // 监听所有IP地址
    // 自动打开浏览器运行以下路径的页面
    open: '/',
  },
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
    },
  },
  build: {
    outDir: 'dist', // 指定打包输出目录，默认为dist
    assetsDir: 'assets', // 指定静态资源输出目录，默认为assets
  },
});
