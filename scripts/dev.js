// 导入所需的模块
import esbuild from 'esbuild'; // 引入 esbuild 打包工具
import { dirname, resolve } from 'node:path'; // 引入路径处理模块
import { readdirSync, existsSync, statSync } from 'node:fs'; // 引入文件系统模块
import { fileURLToPath } from 'node:url'; // 处理 ES Module 中的文件路径
import { parseArgs } from 'node:util'; // 解析命令行参数
import { createRequire } from 'node:module'; // 创建 CommonJS 的 require 函数
import { spawn } from 'node:child_process'; // 创建子进程执行命令
import { promisify } from 'node:util'; // 将回调风格的函数转换为 Promise 风格
import { mkdir } from 'node:fs/promises'; // 异步创建目录

/**
 * 使用示例:
 *  # 打包所有子包，同时生成ESM和CJS格式
 *  node scripts/dev.js --all
 *
 *  # 打包指定子包
 *  node scripts/dev.js components
 *
 *  # 打包多个指定子包
 *  node scripts/dev.js components,utils
 *
 *  # 仅生成ESM格式
 *  node scripts/dev.js --format esm
 *
 *  # 不监听文件变化
 *  node scripts/dev.js --no-watch
 */

// 配置esbuild打包开发环境
console.log('============== 优化后的esbuild开发环境打包脚本 ======================');

// ES6 Module规范没有__filename和__dirname，需要手动创建
const __filename = fileURLToPath(import.meta.url); // 当前文件的绝对路径
const __dirname = dirname(__filename); // 当前文件所在目录的绝对路径
const require = createRequire(import.meta.url); // 创建CommonJS风格的require函数

// 解析命令行参数
const {
  values: { format, watch, all }, // 解构获取格式化后的参数值
  positionals, // 解构获取位置参数
} = parseArgs({
  allowPositionals: true, // 允许位置参数
  positionals: [
    {
      name: 'targets', // 位置参数的名称
      type: 'string', // 参数类型
      default: 'components', // 默认值为components
    },
  ],
  options: {
    // 定义format参数，用于指定打包格式
    format: {
      type: 'string', // 参数类型
      choices: ['esm', 'cjs', 'both'], // 可选的值：esm、cjs或同时打包两种格式
      short: 'f', // 短选项别名
      description: '打包格式', // 参数描述
      default: 'both', // 默认值为同时打包两种格式
    },
    // 定义watch参数，用于控制是否监听文件变化
    watch: {
      type: 'boolean', // 参数类型
      short: 'w', // 短选项别名
      description: '是否监听文件变化', // 参数描述
      default: true, // 默认值为true
    },
    // 定义all参数，用于控制是否打包所有子包
    all: {
      type: 'boolean', // 参数类型
      short: 'a', // 短选项别名
      description: '是否打包所有子包', // 参数描述
      default: false, // 默认值为false
    },
  },
});

/**
 * 获取要打包的目标包列表
 * @returns {string[]} 目标包名称数组
 */
const getTargetPackages = () => {
  const packagesDir = resolve(__dirname, '../packages'); // 获取packages目录的绝对路径

  if (all) {
    // 如果指定了--all参数，则打包所有符合条件的子包
    return readdirSync(packagesDir, { withFileTypes: true }) // 读取packages目录下的所有文件和目录
      .filter(dirent => dirent.isDirectory() && existsSync(resolve(packagesDir, dirent.name, 'src', 'index.ts'))) // 筛选出有src/index.ts入口文件的目录
      .map(dirent => dirent.name); // 提取目录名称
  } else if (positionals.length > 0) {
    // 如果通过位置参数指定了包名
    const targets = positionals[0].split(','); // 按逗号分割多个包名
    return targets.filter(target => existsSync(resolve(packagesDir, target, 'src', 'index.ts'))); // 筛选出存在的包
  } else {
    // 默认打包components包
    return ['components'];
  }
};

/**
 * 确保输出目录存在，如果不存在则创建
 * @param {string} target - 目标包名称
 * @returns {Promise<string>} 创建的目录路径
 */
const ensureDistDir = async target => {
  const distDir = resolve(__dirname, `../packages/${target}/dist`); // 输出目录的绝对路径
  if (!existsSync(distDir)) {
    await mkdir(distDir, { recursive: true }); // 如果目录不存在，则递归创建
  }
  return distDir;
};

/**
 * 生成TypeScript类型定义文件
 * @param {string} target - 目标包名称
 * @returns {Promise<void>} - 生成完成的Promise
 */
const generateTypeDefinitions = target => {
  return new Promise((resolve, reject) => {
    try {
      // 尝试找到TypeScript编译器的绝对路径
      const tscPath = require.resolve('typescript/bin/tsc');
      console.log(`🔍 找到TypeScript编译器: ${tscPath}`);

      // 创建子进程执行TypeScript编译命令，生成类型定义文件
      const tscProcess = spawn(
        'node', // 执行node命令
        [
          tscPath, // TypeScript编译器路径
          '--declaration', // 生成.d.ts声明文件
          '--emitDeclarationOnly', // 只生成声明文件
          '--outDir', // 指定输出目录
          `packages/${target}/dist`, // 输出到dist目录
          `packages/${target}/src/index.ts`, // 编译入口文件
        ],
        {
          cwd: resolve(__dirname, '..'), // 设置工作目录为项目根目录
          stdio: 'inherit', // 继承父进程的标准输入输出
        },
      );

      // 监听编译进程的退出事件
      tscProcess.on('close', code => {
        if (code === 0) {
          console.log(`✅ 成功生成 ${target} 的类型定义文件`);
          resolve();
        } else {
          console.error(`❌ 生成 ${target} 的类型定义文件失败，退出码: ${code}`);
          reject(new Error(`TypeScript compilation failed with code ${code}`));
        }
      });

      // 监听编译进程的错误事件
      tscProcess.on('error', error => {
        console.error(`❌ 启动TypeScript编译器失败: ${error.message}`);
        reject(error);
      });
    } catch (error) {
      // 如果找不到TypeScript编译器，则跳过类型定义生成
      console.warn(`⚠️ 无法找到TypeScript编译器，跳过类型定义生成: ${error.message}`);
      resolve();
    }
  });
};

/**
 * 打包单个格式的文件
 * @param {string} target - 目标包名称
 * @param {string} formatType - 打包格式（esm或cjs）
 * @returns {Promise<import('esbuild').Context>} - esbuild上下文对象
 */
const bundleWithFormat = async (target, formatType) => {
  const entry = resolve(__dirname, `../packages/${target}/src/index.ts`); // 入口文件路径
  const outfile = resolve(__dirname, `../packages/${target}/dist/${target}.${formatType}.js`); // 输出文件路径

  console.log(`🔄 正在打包 ${target} (${formatType})...`);
  console.log(`   入口: ${entry}`);
  console.log(`   出口: ${outfile}`);

  try {
    // 确保输出目录存在
    await ensureDistDir(target);

    // 创建esbuild打包上下文
    const context = await esbuild.context({
      entryPoints: [entry], // 入口文件
      outfile, // 输出文件
      format: formatType, // 打包格式
      bundle: true, // 是否打包所有依赖
      sourcemap: true, // 是否生成sourcemap
      platform: formatType === 'cjs' ? 'node' : 'browser', // 打包平台
      external: [], // 外部依赖（不打包的模块）
      tsconfig: resolve(__dirname, '../tsconfig.json'), // TypeScript配置文件
      logLevel: 'info', // 日志级别
    });

    if (watch) {
      // 如果启用了监听模式
      await context.watch(); // 开始监听文件变化
      console.log(`✅ ${target} (${formatType}) 已启动监听模式`);
    } else {
      // 如果不启用监听模式
      await context.rebuild(); // 执行一次性构建
      await context.dispose(); // 构建完成后释放资源
      console.log(`✅ ${target} (${formatType}) 打包完成`);
    }

    return context; // 返回上下文对象，便于后续管理
  } catch (error) {
    console.error(`❌ ${target} (${formatType}) 打包失败:`, error);
    throw error; // 抛出错误，让上层处理
  }
};

/**
 * 打包单个包的所有指定格式
 * @param {string} target - 目标包名称
 * @returns {Promise<import('esbuild').Context[]>} - esbuild上下文对象数组
 */
const bundlePackage = async target => {
  console.log(`\n🚀 开始处理包: ${target}`);

  try {
    const contexts = []; // 用于存储所有打包上下文

    // 根据format参数决定打包格式
    if (format === 'both' || format === 'esm') {
      // 如果需要打包esm格式
      contexts.push(await bundleWithFormat(target, 'esm'));
    }

    if (format === 'both' || format === 'cjs') {
      // 如果需要打包cjs格式
      contexts.push(await bundleWithFormat(target, 'cjs'));
    }

    // 生成TypeScript类型定义文件
    try {
      await generateTypeDefinitions(target);
    } catch (error) {
      // 即使类型定义生成失败，也继续打包流程
      console.warn(`⚠️ 类型定义生成失败，将继续打包流程:`, error.message);
    }

    return contexts; // 返回所有上下文对象
  } catch (error) {
    console.error(`❌ 处理 ${target} 失败:`, error);
    throw error; // 抛出错误，让上层处理
  }
};

/**
 * 主函数，协调整个打包流程
 */
const main = async () => {
  try {
    const targets = getTargetPackages(); // 获取要打包的目标包列表
    console.log(`📦 待打包的包: ${targets.join(', ')}`);
    console.log(`⚙️  打包配置: 格式=${format}, 监听=${watch}, 全部=${all}`);

    // 并行打包所有目标包
    const allContexts = []; // 存储所有打包上下文
    const bundlePromises = targets.map(target => bundlePackage(target)); // 为每个包创建打包Promise

    // 等待所有打包完成
    const contextArrays = await Promise.all(bundlePromises);

    // 收集所有上下文对象
    contextArrays.forEach(contexts => {
      allContexts.push(...contexts);
    });

    console.log('\n🎉 所有包打包完成!');

    // 如果是监听模式，保持进程运行
    if (watch) {
      console.log('👀 正在监听文件变化，按 Ctrl+C 停止...');
      // 捕获退出信号，清理资源
      process.on('SIGINT', () => {
        console.log('\n🛑 停止打包服务...');
        // 释放所有上下文资源
        Promise.all(allContexts.map(ctx => ctx.dispose())).then(() => {
          process.exit(0); // 正常退出进程
        });
      });
    }
  } catch (error) {
    // 捕获并处理整个打包过程中的错误
    console.error('❌ 打包过程中发生错误:', error);
    process.exit(1); // 以非零状态码退出进程，表示出错
  }
};

// 执行主函数
main();
