/*
 * @Description: 插件配置
 * @Author: liks
 * @Date: 2025-10-29 15:27:37
 * @LastEditors: liks
 * @LastEditTime: 2025-10-29 15:39:52
 */
import type { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue'; // 提供 Vue 3 单文件组件支持
import vueJsx from '@vitejs/plugin-vue-jsx'; // 提供 Vue 3 JSX 支持
// import UnoCSS from 'unocss/vite' // 即时按需的原子化 CSS 引擎 UnoCSS
// import { registerAutoImport, registerAutoComponents } from './auto-import-plugin'
import { registerHtmlPlugin } from './compile.html';
import { registerImageMini } from './image.mini';
// import { registerSvgIcons } from './register-svg-icons'
import vueDevTools from 'vite-plugin-vue-devtools';

export function generateVitePlugins(viteEnv: ViteEnv, isBuild: boolean): PluginOption[] {
  const plugins: PluginOption[] = [];

  /** 提供 Vue 3 单文件组件支持 */
  plugins.push(vue({ include: [/\.vue$/] }));

  /** 提供 Vue 3 JSX/TSX 支持 */
  plugins.push(vueJsx());

  /** 提供 Svg 图标功能的使用支持 */
  // plugins.push(registerSvgIcons())

  /** 即时按需的原子化 CSS 引擎 UnoCSS */
  // plugins.push(UnoCSS())

  /** 自动跟踪依赖并导入所需的内容，避免手动导入的繁琐步骤 */
  // plugins.push(registerAutoImport())

  /** 提供组件自动按需导入及类型声明功能 */
  // plugins.push(registerAutoComponents())

  /** 针对 index.html，提供压缩和基于 ejs 模板功能，亦可对其注入动态数据 */
  plugins.push(vueDevTools());
  plugins.push(registerHtmlPlugin(viteEnv, isBuild));

  if (isBuild) {
    /** 图片压缩插件，使用简单，重要的是它真的很快 🚀🚀🚀🚀 */
    plugins.push(registerImageMini());
  }

  return plugins;
}
