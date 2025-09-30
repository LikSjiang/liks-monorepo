<!--
 * @Description:
 * @Author: liks
 * @Date: 2025-09-30 14:59:59
 * @LastEditors: liks
 * @LastEditTime: 2025-09-30 17:09:30
-->

# 一、项目介绍

    本项目是一个基于 monorepo 架构的项目，采用 pnpm 作为包管理工具。
    项目结构如下：
    ```
    apps/
    ├── backend/
    ├── frontend/
    ├── ...
    packages/
    ├── components/
    ├── utils/
    ├── ...
    ├── pnpm-lock.yaml
    ├── pnpm-workspace.yaml
    ```
    其中，apps 文件夹下的所有子文件夹都是属于子应用，packages 文件夹下的所有子文件夹都是属于子包。
    每个子包都有自己的 package.json 文件，用于管理依赖和脚本。
    每个子应用也有自己的 package.json 文件，用于管理依赖和脚本。
    子应用可以依赖子包，例如：
    ```
    "dependencies": {
      "@liks/components": "workspace:*",
      "@liks/utils": "workspace:*"
    }
    ```
    其中，`workspace:*` 表示依赖的是当前项目中的子包。
    子包也可以依赖其他子包，例如：
    ```
    "dependencies": {
      "@liks/utils": "workspace:*"
    }
    ```
    其中，`@liks/utils` 表示依赖的是 `packages/utils` 子包。

# 二、项目搭建、初始化工程

#### 1. 安装 pnpm 包管理工具：

    ```
    npm install -g pnpm
    ```

#### 2. 创建项目文件夹：

    ```
    mkdir liks-monorepo
    cd liks-monorepo
    ```

#### 3. 创建项目结构文件：

    ```
    mkdir apps
    mkdir packages
    ```

#### 4. 创建子应用和子包：

    ```
    mkdir apps/backend
    mkdir apps/frontend
    mkdir packages/components
    mkdir packages/utils
    ```

#### 5. 创建 pnpm-workspace.yaml 文件：

    ```
    touch pnpm-workspace.yaml
    ```

#### 6. 编辑 pnpm-workspace.yaml 文件：

    ```
    # 告诉pnpm子包在哪个位置
    packages:
      # packages文件夹下的所有子文件夹都是属于子包
      - 'packages/*'
      # apps文件夹下的所有子文件夹都是属于子包
      - 'apps/*'
    ```

#### 7. 在项目根目录控制台执行 pnpm --workspace-root init 命令初始化项目（创建 package.json）：

    ```
    pnpm --workspace-root init
    ```

#### 8. 初始化子应用和子包，并制定 package 命名空间：

    ```
    cd apps/backend
    pnpm init --name @liks-monorepo/backend
    cd ../frontend
    pnpm init --name @liks-monorepo/frontend
    cd ../../packages/components
    pnpm init --name @liks-monorepo/components
    cd ../utils
    pnpm init --name @liks-monorepo/utils
    ```

#### 9. 每个子应用或者子包下都创建 src/index.ts 文件：

    ```
    touch apps/backend/src/index.ts
    touch apps/frontend/src/index.ts
    touch packages/components/src/index.ts
    touch packages/utils/src/index.ts
    ```

#### 10. 环境版本锁定 npm、pnpm、node 版本：（在根工程目录 package.json 文件中配置）

    ```
    "engines": {
      "node": ">=22.14.0",
      "npm": ">=10.9.2",
      "pnpm": ">=10.15.1"
    }
    ```
    严格限制项目只能按照指定的node、npm、pnpm版本运行或者安装依赖需创建.npmrc文件：
    ```
    engines-strict=true
    ```

#### 11. 根项目安装 typescript ，以及配置 tsconfig.json 文件：

    ```
    pnpm add -Dw typescript
    ```
    根项目创建、编辑 tsconfig.json 文件：
    ```
    touch tsconfig.json
            {
              "compilerOptions": {
                  "baseUrl": "./",
                  "module": "esnext",
                  "target": "esnext",
                  "types": [],
                  "lib": ["esnext"],
                  "sourceMap": true,
                  "declaration": true,
                  "declarationMap": true,
                  "noUncheckedIndexedAccess": true,
                  "exactOptionalPropertyTypes": true,
                  "strict": true,
                  "verbatimModuleSyntax": false,
                  "moduleResolution": "bundler",
                  "isolatedModules": true,
                  "noUncheckedSideEffectImports": true,
                  "moduleDetection": "force",
                  "skipLibCheck": true
              },
              "exclude": [
                  "node_modules",
                  "dist",
                  "**/*.spec.ts",
                  "**/*.test.ts"
              ]

          }
    ```

#### 12. 子应用和子包配置 tsconfig.json 文件：

    ```
    pnpm add -D typescript
    ```
    子应用和子包创建 tsconfig.json 文件：
    ```
    touch tsconfig.json
    ```
    编辑 tsconfig.json 文件，浏览器环境下的 tsconfig.json 文件：
    ```
    {
        "extends": "../../tsconfig.json",
        "include": ["src"],
        "compilerOptions": {
            "types": [],
            "lib": ["esnext","DOM"]
        }
    }
    ```
    编辑 tsconfig.json 文件，Node.js 环境下的 tsconfig.json 文件：
    ```
    {
        "extends": "../../tsconfig.json",
        "include": ["src"],
        "compilerOptions": {
            "types": ["node"],
            "lib": ["esnext"]
        }
    }
    ```

#### 13. 代码风格与质量检查配置（prettier\ESLint\拼写检查），在根目录工作区中安装插件：

    保证所有子应用和子包的代码风格一致，以及代码质量检查。

##### （1）. 安装 prettier插件：

    ```
    pnpm add -Dw prettier
    ```

##### （2）.创建 prettier 配置文件：

    ```
    touch .prettier.config.js
    ```

##### （3）. 配置 prettier 插件：

    编辑 prettier.config.js 文件：
    ```
    {
      // 指定最大换行长度
      printWidth: 120,
      // 缩进制表符宽度 | 空格数
      tabWidth: 2,
      // 使用制表符而不是空格缩进行（true：使用制表符；false：使用空格）
      useTabs: false,
      // 行尾分号（true：添加分号；false：不添加分号）
      semi: true,
      // 单引号（true：使用单引号；false：使用双引号）
      singleQuote: true,
      // 括号之间是否有空格（true：有空格；false：无空格）
      bracketSpacing: true,
      // JSX 标签是否在新行上（true：在新行上；false：不在新行上）
      jsxBracketSameLine: false,
      // 箭头函数参数是否有括号（true：有括号；false：无括号）
      arrowParens: "avoid",

      // HTML 空格敏感度（默认："css"）
      htmlWhitespaceSensitivity: "css",
      // 换行符（默认："lf"）
      endOfLine: "auto",
      // 这两个选项可用于格式化以指定字符偏移量（分别包括和不包括）开始和结束的代码片段。
      rangeStart: 0,
      rangeEnd: Infinity,
      };
    ```

##### （5）. 配置 prettier 忽略文件：

    编辑 .prettierignore 文件：
    ```
    dist
    public
    node_modules
    pnpm-lock.yaml
    **/*.spec.ts
    **/*.test.ts
    ```

##### （6）. 配置 prettier 脚本命令：

    编辑 package.json 文件：按照正确的格式重写文件代码
    ```
    "scripts": {
      "lint:prettier": "prettier --write \"**/*.{js,jsx,ts,tsx,json,css,scss,vue,html,md}\""
    }
    ```

#### 14. 安装 ESLint 插件：

    ```
    pnpm add -Dw  eslint@latest @eslint/js globals typescript-eslint eslint-plugin-prettier eslint-config-prettier eslint-plugin-vue
    ```

##### （1）插件介绍

| 类别             | 插件名称                                         |
| ---------------- | ------------------------------------------------ |
| 核心引擎         | eslint                                           |
| 官方规则集       | @eslint/js                                       |
| 全局变量支持     | globals                                          |
| typescript支持   | typescript-eslint                                |
| prettier集成     | eslint-plugin-prettier 、 eslint-config-prettier |
| Vue 支持         | eslint-plugin-vue                                |
| 类型定义（辅助） | @types/node                                      |

##### (5) 创建eslint.config.js 文件：

    ```
    touch eslint.config.js
    ```

##### (6) 编辑 eslint.config.js 文件：

    ```
    import { defineConfig } from "eslint/config";

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginVue from "eslint-plugin-vue";
import globals from "globals";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier/flat";

const ignores = [
"**/node_modules/**",
"**/dist/**",
".*",
"scripts/**",
"**/*.d.ts",
];

export default defineConfig([
// 通用配置
{
// 忽略指定目录
ignores,
// 继承 eslint 推荐规则、typescript 推荐规则、prettier 规则
extends: [
eslint.configs.recommended,
...tseslint.configs.recommended,
eslintConfigPrettier,
],
// 配置 eslint-plugin-prettier 插件
plugins: {
prettier: eslintPluginPrettier,
},
languageOptions: {
ecmaVersion: "latest", // ECMAScript 语法支持版本
sourceType: "module", // 模块类型
parser: tseslint.parser, // 解析器
},
// 自定义规则
rules: {
// 开启 eslint-plugin-prettier 插件的规则
"no-var": "error", // 禁止使用var
},
},
// 前端配置
{
ignores,
files: [
"apps/frontend/**/*.{js,jsx,ts,tsx,vue}",
"packages/components/**/*.{js,jsx,ts,tsx,vue}",
],
extends: [
...eslintPluginVue.configs["flat/recommended"],
eslintConfigPrettier,
],
languageOptions: {
globals: { ...globals.browser }, // 浏览器全局变量
},
},
// 后端配置
{
ignores,
files: ["apps/backend/**/*.{js,jsx,ts,tsx}"],
languageOptions: {
globals: { ...globals.node }, // Node.js 全局变量
},
},
]);

    ```

##### （7）. 配置 eslint 脚本命令：

    编辑 package.json 文件：
    ```
    "scripts": {
      "lint:eslint": "eslint"
    }
    ```

#### 15. 按照拼写检查插件 cspell @cspell/dict-lorem-ipsum

##### (1) 安装插件：

    ```
    pnpm add -Dw cspell @cspell/dict-lorem-ipsum
    ```

##### (2) 配置 cspell 插件：

    编辑 cspell.json 文件：
    ```
    {
      "language": "en",
      "dictionaries": [
        "lorem-ipsum"
      ]
    }
    ```

##### (3) 配置 cspell 脚本命令：
    
    编辑 package.json 文件，检查apps和packages目录下的文件
    ```
    "scripts": {
      "lint:cspellcheck": "cspell lint \"(apps|packages)/**/*.{js,jsx,ts,tsx,vue,html,md}\""
    }
    ```

#### 16. git提交规范

##### （1）安装 commitizen 插件：

    ```
    pnpm add -Dw  @commitlint/cli @commitlint/config-conventional commitizen cz-git
    ```

| 插件名称             | 插件功能                                         |
| ----------------  | ------------------------------------------------ |
| @commitlint/cli        | 是commitizen工具的核心           |
| @commitlint/config-conventional | 是基于 conventional commits 规范的配置文件  |
| commitizen | 提供了一个交互式的命令行工具，用于生成符合规范的提交信息  |
| cz-git | 是国人开发的工具，工程性更强，自定义度高，交互性更好。用于git提交检查  |

##### （2）在根目录package.json文件配置提交命令

    ```
    "scripts": {
      "commit": "cz-git"
    }
    ```
添加config配置：
    ```
    "config": {
      "commitizen": {
        "path": "node_modules/cz-git"
      }
    }
    ```

##### （3） 配置cz-git插件，创建commitlint.config.js文件

    ```
    touch commitlint.config.js
    ```
添加配置：
    ```
    module.exports = {
      extends: ["@commitlint/config-conventional"],
    };
    ```