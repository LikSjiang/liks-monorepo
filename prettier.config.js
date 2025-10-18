/**
 * prettier 配置文件
 * @type {import('prettier').Config}
 * @see https://prettier.io/docs/en/configuration.html
 */
export default {
  // 指定最大换行长度
  printWidth: 220,
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
  arrowParens: 'avoid',

  // HTML 空格敏感度（默认："css"）
  htmlWhitespaceSensitivity: 'css',
  // 换行符（默认："lf"）
  endOfLine: 'auto',
  // 这两个选项可用于格式化以指定字符偏移量（分别包括和不包括）开始和结束的代码片段。
  rangeStart: 0,
  rangeEnd: Infinity,
};
