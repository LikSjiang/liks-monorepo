/**
 * @type {import('@commitlint/types').UserConfig}
 */

export default {
  extends: ['@commitlint/config-conventional'],
  // @see https://commitlint.js.org/#/reference-rules
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'add', // 新增
        'feat', // 新功能
        'fix', // 修复
        'docs', // 文档变更
        'style', // 代码格式(不影响代码运行的变动)
        'refactor', // 重构(既不是增加feature，也不是修复bug)
        'perf', // 性能优化
        'test', // 增加测试
        'chore', // 构建过程或辅助工具的变动
        'revert', // 回退
        'build', // 打包
        'ci', // CI related changes
      ],
    ],
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [1, 'always'],
    'header-max-length': [2, 'always', 108],
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
    'subject-case': [0], // subject 大小写不做校验
  },
  prompt: {
    types: [
      { value: 'add', name: '➕add:      新增' },
      { value: 'feat', name: '✨feat:     新功能' },
      { value: 'fix', name: '🐛fix:      修复' },
      { value: 'docs', name: '✏️docs:     文档变更' },
      { value: 'style', name: '💄style:    代码格式(不影响代码运行的变动)' },
      {
        value: 'refactor',
        name: '♻️refactor: 重构(既不是增加feature，也不是修复bug)',
      },
      { value: 'perf', name: '⚡️perf:     性能优化' },
      { value: 'test', name: '✅test:     增加测试' },
      { value: 'chore', name: '🚀chore:    构建过程或辅助工具的变动' },
      { value: 'revert', name: '⏪️revert:   回退' },
      { value: 'build', name: '📦️build:    打包' },
      { value: 'ci', name: '👷CI:   related changes' },
    ],
    messages: {
      type: '请选择提交类型:',
      scope: '请输入修改范围(可选):',
      customScope: '请输入自定义修改范围:',
      subject: '请输入简短的变更描述:',
      body: '请输入详细的变更描述(可选):',
      footer: '请输入变更影响的关闭问题(可选):',
      confirmCommit: '确认提交变更吗?',
    },
    scopes: ['root', 'apps', 'packages'],
    allCustomScopes: true,
    skipQuestions: ['body', 'footer', 'breaking', 'footerPrefix'],
  },
};
