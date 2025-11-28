import { defineConfig } from 'eslint/config';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

const ignores = ['**/node_modules/**', '**/dist/**', '.*', 'scripts/**', '**/*.d.ts'];

export default defineConfig([
  // 通用配置
  {
    // 忽略指定目录
    ignores,
    // 继承 eslint 推荐规则、typescript 推荐规则、prettier 规则
    extends: [eslint.configs.recommended, ...tseslint.configs.recommended, eslintConfigPrettier],
    // 配置 eslint-plugin-prettier 插件
    plugins: {
      prettier: eslintPluginPrettier,
    },
    // 不包含 vue 文件的配置
    files: ['**/*.{js,jsx,ts,tsx}', '!**/*.vue'],
    languageOptions: {
      ecmaVersion: 'latest', //  ECMAScript 语法支持版本
      sourceType: 'module', // 模块类型
      parser: tseslint.parser, // 解析器
    },
    // 自定义规则
    rules: {
      // 开启 eslint-plugin-prettier 插件的规则
      'no-var': 'error', // 禁止使用var
      '@typescript-eslint/no-explicit-any': ['off'],
      '@typescript-eslint/no-floating-promises': ['off'],
      '@typescript-eslint/no-unsafe-argument': ['off'],
      '@typescript-eslint/no-unsafe-return': ['off'],
      '@typescript-eslint/no-unsafe-assignment': ['off'],
      '@typescript-eslint/no-unsafe-member-access': ['off'],
      '@typescript-eslint/no-unsafe-function-type': ['off'],
      'prettier/prettier': ['off', { endOfLine: 'auto' }],
    },
  },
  // Vue 文件配置
  {
    ignores,
    files: ['**/*.vue'],
    extends: [...eslintPluginVue.configs['flat/recommended'], eslintConfigPrettier],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: eslintPluginVue.parser,
      parserOptions: {
        parser: tseslint.parser,
      },
      globals: { ...globals.browser }, // 浏览器全局变量
    },
    rules: {
      // 禁用组件名必须为多单词的规则
      'vue/multi-word-component-names': 'off',
      // 禁用属性顺序规则
      'vue/attributes-order': 'off',
    },
  },
  //   后端配置
  {
    ignores,
    files: ['apps/*/**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: { ...globals.node }, // Node.js 全局变量
    },
  },
]);
