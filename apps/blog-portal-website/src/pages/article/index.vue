<template>
  <section class="article-detail-page-container">
    <div class="article-detail-wrapper">
      <!-- 文章主内容区 -->
      <article class="article-main-content">
        <!-- 文章头部信息 -->
        <header class="article-header">
          <div class="article-tags">
            <span class="article-tag">{{ articleData.tag }}</span>
          </div>
          <h1 class="article-title">{{ articleData.title }}</h1>
          <div class="article-meta">
            <div class="article-author-info">
              <img :src="articleData.authorAvatar" alt="头像" class="author-avatar" />
              <span class="author-name">{{ articleData.author }}</span>
            </div>
            <div class="article-stats">
              <span class="article-date">{{ articleData.date }}</span>
              <span class="article-reading-time">{{ articleData.readingTime }}</span>
              <span class="article-views">{{ articleData.views }}</span>
              <span class="article-comments">{{ articleData.comments }}</span>
            </div>
          </div>
        </header>

        <!-- 文章封面图 -->
        <div class="article-cover">
          <img :src="articleData.coverImage" alt="封面" class="cover-image" />
        </div>

        <!-- 文章摘要 -->
        <div class="article-excerpt">
          <p>{{ articleData.excerpt }}</p>
        </div>

        <!-- 文章内容 - 支持富文本和Markdown -->
        <div class="article-content" v-html="renderedContent"></div>
      </article>

      <!-- 侧边栏 -->
      <aside class="article-sidebar">
        <!-- 文章目录 -->
        <div class="article-toc">
          <h3 class="toc-title">文章目录</h3>
          <ul class="toc-list">
            <li class="toc-item">
              <a href="#" class="toc-link active">1. Tailwind CSS的安装与配置</a>
              <ul class="toc-sub-list">
                <li class="toc-sub-item"><a href="#" class="toc-sub-link">1.1 安装方式</a></li>
                <li class="toc-sub-item"><a href="#" class="toc-sub-link">1.2 配置文件设置</a></li>
                <li class="toc-sub-item"><a href="#" class="toc-sub-link">1.3 引入Tailwind到项目</a></li>
              </ul>
            </li>
            <li class="toc-item">
              <a href="#" class="toc-link">2. 实用优先的开发理念</a>
              <ul class="toc-sub-list">
                <li class="toc-sub-item"><a href="#" class="toc-sub-link">2.1 原子化CSS的优势</a></li>
                <li class="toc-sub-item"><a href="#" class="toc-sub-link">2.2 与传统CSS的对比</a></li>
                <li class="toc-sub-item"><a href="#" class="toc-sub-link">2.3 常见顾虑与解答</a></li>
              </ul>
            </li>
            <li class="toc-item">
              <a href="#" class="toc-link">3. 响应式设计实现技巧</a>
              <ul class="toc-sub-list">
                <li class="toc-sub-item"><a href="#" class="toc-sub-link">3.1 断点前缀的使用</a></li>
                <li class="toc-sub-item"><a href="#" class="toc-sub-link">3.2 响应式布局示例</a></li>
                <li class="toc-sub-item"><a href="#" class="toc-sub-link">3.3 响应式工具类组合</a></li>
              </ul>
            </li>
            <li class="toc-item">
              <a href="#" class="toc-link">4. 自定义主题与扩展</a>
            </li>
            <li class="toc-item">
              <a href="#" class="toc-link">5. 性能优化与生产构建</a>
            </li>
          </ul>
        </div>

        <!-- 热门文章 -->
        <div class="hot-articles">
          <h3 class="hot-articles-title">热门文章</h3>
          <div class="hot-articles-list">
            <!-- 热门文章项将通过组件或动态数据渲染 -->
            <div class="hot-article-item">
              <a href="#" class="hot-article-link">
                <h4 class="hot-article-title">10个提升前端开发效率的VS Code插件</h4>
              </a>
            </div>
            <div class="hot-article-item">
              <a href="#" class="hot-article-link">
                <h4 class="hot-article-title">React 18新特性深度解析</h4>
              </a>
            </div>
            <div class="hot-article-item">
              <a href="#" class="hot-article-link">
                <h4 class="hot-article-title">TypeScript 5.0带来的新变化</h4>
              </a>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import MarkdownIt from 'markdown-it';
import DOMPurify from 'dompurify';

defineOptions({
  name: 'ArticleDetailPage',
});

// 创建Markdown实例 - 优化配置增强安全性
const md = new MarkdownIt({
  breaks: true,
  linkify: true,
  html: false, // 禁用html渲染，由DOMPurify统一处理
  typographer: false, // 禁用自动替换，避免潜在的安全问题
  quotes: '""\'\'', // 设置引号规则
  xhtmlOut: true, // 输出自闭合标签，提高兼容性
});

// 文章内容类型枚举
const ContentType = {
  HTML: 'html',
  MARKDOWN: 'markdown',
};

// 模拟文章数据（实际应用中应从API获取）
// 注意：添加了包含潜在XSS攻击的测试内容，验证安全过滤是否有效
const articleData = ref({
  title: '如何使用Tailwind CSS构建现代响应式界面',
  author: '张明',
  authorAvatar: 'https://picsum.photos/id/1005/40/40',
  date: '2023年10月15日',
  readingTime: '8分钟阅读',
  views: '2,345阅读',
  comments: '42评论',
  coverImage: 'https://picsum.photos/id/1035/800/400',
  excerpt: 'Tailwind CSS作为一个实用优先的CSS框架，正在改变前端开发的方式。本文将深入探讨如何利用强大功能构建高效、美观的响应式界面，从基础设置到高级技巧，帮助你掌握这一现代开发工具。',
  tag: '技术探索',
  // 可以切换 contentType 来测试不同格式
  contentType: ContentType.MARKDOWN,
  // Markdown格式内容示例（包含安全测试内容）
  markdownContent: `在当今快速发展的前端领域，开发效率和用户体验同样重要。Tailwind CSS作为一个实用优先（utility-first）的CSS框架，通过提供大量预定义的类，让开发者能够直接在HTML中构建界面，而无需编写自定义CSS。

## 本文将从以下几个方面介绍Tailwind CSS的使用方法和最佳实践：

1. Tailwind CSS的安装与配置
2. 实用优先的开发理念与工作流
3. 响应式设计实现技巧
4. 自定义主题与扩展

## Tailwind CSS的安装与配置

### 安装方式

你可以通过npm或yarn来安装Tailwind CSS：

\`\`\`bash
npm install -D tailwindcss postcss autoprefixer
\`\`\`

### 配置文件设置

安装完成后，你需要生成配置文件：

\`\`\`bash
npx tailwindcss init -p
\`\`\`

### 引入Tailwind到项目

在你的CSS文件中引入Tailwind的基础样式：

\`\`\`css
@tailwind base;
@tailwind components;
@tailwind utilities;
\`\`\`

## 安全测试内容（潜在XSS攻击将被过滤）

这是一个包含潜在XSS攻击的链接：[测试链接](javascript:alert('XSS攻击！'))

这是一个包含onerror事件的图片：![测试图片](x.jpg)

这是一段Markdown中的HTML标签：&lt;script&gt;alert('XSS攻击！')&lt;/script&gt;

这是一个iframe：<iframe src="https://example.com"></iframe>

正常的外部链接将被安全处理：[Vue官方网站](https://vuejs.org/)`,
  // HTML格式内容示例（包含安全测试内容）
  htmlContent: `<p>在当今快速发展的前端领域，开发效率和用户体验同样重要。Tailwind CSS作为一个实用优先（utility-first）的CSS框架，通过提供大量预定义的类，让开发者能够直接在HTML中构建界面，而无需编写自定义CSS。</p>
<p>本文将从以下几个方面介绍Tailwind CSS的使用方法和最佳实践：</p>
<ol>
  <li>Tailwind CSS的安装与配置</li>
  <li>实用优先的开发理念与工作流</li>
  <li>响应式设计实现技巧</li>
  <li>自定义主题与扩展</li>
</ol>
<h2>Tailwind CSS的安装与配置</h2>
<h3>安装方式</h3>
<p>你可以通过npm或yarn来安装Tailwind CSS：</p>
<pre><code>npm install -D tailwindcss postcss autoprefixer</code></pre>
<h3>配置文件设置</h3>
<p>安装完成后，你需要生成配置文件：</p>
<pre><code>npx tailwindcss init -p</code></pre>
<h3>引入Tailwind到项目</h3>
<p>在你的CSS文件中引入Tailwind的基础样式：</p>
<pre><code>@tailwind base;
@tailwind components;
@tailwind utilities;</code></pre>
<h2>安全测试内容（潜在XSS攻击将被过滤）</h2>
<p>这是一个包含潜在XSS攻击的链接：<a href="javascript:alert('XSS攻击！')">测试链接</a></p>
<p>这是一个包含onerror事件的图片：<img src="x.jpg" onerror="alert('XSS攻击！')" alt="测试图片"></p>
<p>这是一段HTML脚本标签：&lt;script&gt;alert('XSS攻击！')&lt;/script&gt;</p>
<p>这是一个iframe：<iframe src="https://example.com"></iframe></p>
<p>正常的外部链接将被安全处理：<a href="https://vuejs.org/">Vue官方网站</a></p>`,
});

// 计算属性：根据内容类型返回安全渲染后的HTML内容
const renderedContent = computed(() => {
  let htmlContent = '';

  if (articleData.value.contentType === ContentType.MARKDOWN) {
    // 先渲染Markdown为HTML
    htmlContent = md.render(articleData.value.markdownContent);
  } else {
    // 直接使用HTML内容
    htmlContent = articleData.value.htmlContent;
  }

  // 自定义钩子函数，为链接添加安全属性
  DOMPurify.addHook('afterSanitizeAttributes', node => {
    // 处理图片标签，确保src不为空且安全
    // 处理链接标签
    if (node.nodeName === 'A') {
      const href = node.getAttribute('href');
      // 确保href存在且不为空
      if (href && href.startsWith('http')) {
        // 为所有外部链接添加noopener和noreferrer
        node.setAttribute('rel', 'noopener noreferrer');
        // 如果没有明确设置target，默认使用_blank
        if (!node.hasAttribute('target')) {
          node.setAttribute('target', '_blank');
        }
      }
    }
    // 处理图片标签，确保src不为空且安全
    if (node.nodeName === 'IMG') {
      const src = node.getAttribute('src');
      if (!src || src.trim() === '') {
        node.removeAttribute('src');
      }
    }
  });
  // 使用DOMPurify净化HTML内容，只允许安全的标签和属性
  // 添加安全配置，确保链接安全并移除潜在危险元素
  return DOMPurify.sanitize(htmlContent, {
    ALLOWED_TAGS: [
      'p',
      'br',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'ul',
      'ol',
      'li',
      'blockquote',
      'pre',
      'code',
      'table',
      'thead',
      'tbody',
      'tr',
      'th',
      'td',
      'a',
      'img',
      'hr',
      'strong',
      'em',
      'b',
      'i',
      'del',
      'ins',
      'sup',
      'sub',
      'span',
    ],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'width', 'height', 'class', 'id', 'target', 'rel'],
    FORBID_TAGS: ['script', 'iframe', 'form', 'input', 'button', 'style', 'meta', 'link'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'onfocus', 'onblur', 'onchange', 'onsubmit'],
    // 为所有外部链接添加安全属性
    ADD_TAGS: ['link'],
    ADD_ATTR: ['target', 'rel'],
    FORCE_BODY: true,
    SANITIZE_DOM: true,
  });
});
</script>

<style lang="scss" scoped>
.article-detail-page-container {
  width: 100%;
  // background-color: var(--app-body-bg-color);
  // padding: 20px 0;
}

.article-detail-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: 30px;
  box-sizing: border-box;

  @media (max-width: 992px) {
    flex-direction: column;
  }
}

/* 文章主内容区 */
.article-main-content {
  flex: 1;
  background-color: var(--app-color-white);
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
}

/* 文章头部 */
.article-header {
  margin-bottom: 20px;
}

.article-tags {
  margin-bottom: 15px;
}

.article-tag {
  display: inline-block;
  background-color: #ecf5ff;
  color: #409eff;
  font-size: 12px;
  padding: 4px 12px;
  border-radius: 12px;
  margin-right: 8px;
}

.article-title {
  font-size: 28px;
  font-weight: 600;
  color: var(--app-body-text-color);
  margin-bottom: 20px;
  line-height: 1.4;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
}

.article-author-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.author-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.author-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--app-body-text-color);
}

.article-stats {
  display: flex;
  gap: 15px;
  font-size: 12px;
  color: #909399;
}

.article-date,
.article-reading-time,
.article-views,
.article-comments {
  display: flex;
  align-items: center;
  gap: 5px;
}

/* 文章封面 */
.article-cover {
  margin-bottom: 25px;
}

.cover-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
}

/* 文章摘要 */
.article-excerpt {
  background-color: #f5f7fa;
  border-left: 4px solid #409eff;
  padding: 15px 20px;
  margin-bottom: 30px;
  border-radius: 0 8px 8px 0;
}

.article-excerpt p {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: #606266;
}

/* 文章内容 - 支持富文本和Markdown */
.article-content {
  font-size: 16px;
  line-height: 1.8;
  color: var(--app-body-text-color);
}

/* 基础文本样式 */
.article-content p {
  margin-bottom: 16px;
}

/* 标题样式 */
.article-content h1 {
  font-size: 28px;
  font-weight: 600;
  margin: 35px 0 20px;
  color: var(--app-body-text-color);
}

.article-content h2 {
  font-size: 24px;
  font-weight: 600;
  margin: 30px 0 15px;
  color: var(--app-body-text-color);
  border-bottom: 1px solid #eaecef;
  padding-bottom: 8px;
}

.article-content h3 {
  font-size: 20px;
  font-weight: 600;
  margin: 25px 0 12px;
  color: var(--app-body-text-color);
}

.article-content h4 {
  font-size: 18px;
  font-weight: 600;
  margin: 20px 0 10px;
  color: var(--app-body-text-color);
}

.article-content h5 {
  font-size: 16px;
  font-weight: 600;
  margin: 18px 0 8px;
  color: var(--app-body-text-color);
}

.article-content h6 {
  font-size: 14px;
  font-weight: 600;
  margin: 15px 0 8px;
  color: var(--app-body-text-color);
}

/* 列表样式 */
.article-content ul,
.article-content ol {
  margin: 0 0 16px 20px;
  padding: 0;
}

.article-content ul {
  list-style-type: disc;
}

.article-content ul ul {
  list-style-type: circle;
  margin-bottom: 0;
}

.article-content ol {
  list-style-type: decimal;
}

.article-content ol ol {
  list-style-type: lower-alpha;
  margin-bottom: 0;
}

.article-content li {
  margin-bottom: 8px;
}

.article-content li p {
  margin-bottom: 8px;
}

/* 代码块样式 */
.article-content pre {
  background-color: #f5f7fa;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  overflow-x: auto;
  position: relative;
}

.article-content code {
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 14px;
  color: #e74c3c;
  background-color: #f5f7fa;
  padding: 2px 4px;
  border-radius: 3px;
}

.article-content pre code {
  color: var(--app-body-text-color);
  background-color: transparent;
  padding: 0;
  border-radius: 0;
}

/* 引用样式 */
.article-content blockquote {
  border-left: 4px solid #409eff;
  padding-left: 16px;
  margin: 16px 0;
  color: #606266;
  background-color: #f5f7fa;
  padding: 12px 20px;
  border-radius: 0 8px 8px 0;
}

.article-content blockquote p {
  margin-bottom: 0;
}

/* 表格样式 */
.article-content table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 16px;
  font-size: 14px;
}

.article-content th,
.article-content td {
  padding: 8px 12px;
  border: 1px solid #eaecef;
  text-align: left;
}

.article-content th {
  background-color: #f5f7fa;
  font-weight: 600;
}

.article-content tr:nth-child(even) {
  background-color: #fafafa;
}

/* 链接样式 */
.article-content a {
  color: #409eff;
  text-decoration: none;
  transition: color 0.3s;
}

.article-content a:hover {
  color: #66b1ff;
  text-decoration: underline;
}

/* 图片样式 */
.article-content img {
  max-width: 100%;
  height: auto;
  margin: 16px 0;
  border-radius: 8px;
}

/* 水平线样式 */
.article-content hr {
  border: 0;
  border-top: 1px solid #eaecef;
  margin: 24px 0;
}

/* 侧边栏 */
.article-sidebar {
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* 文章目录 */
.article-toc {
  background-color: var(--app-color-white);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 80px;
}

.toc-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 15px;
  color: var(--app-body-text-color);
  display: flex;
  align-items: center;
  gap: 8px;
}

.toc-title::before {
  content: '';
  display: inline-block;
  width: 4px;
  height: 16px;
  background-color: #409eff;
  border-radius: 2px;
}

.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc-item {
  margin-bottom: 8px;
}

.toc-link {
  display: block;
  padding: 8px 0;
  font-size: 14px;
  color: #606266;
  text-decoration: none;
  transition: all 0.3s ease;
  border-left: 2px solid transparent;
}

.toc-link:hover,
.toc-link.active {
  color: #409eff;
  border-left-color: #409eff;
  padding-left: 8px;
}

.toc-sub-list {
  list-style: none;
  padding: 0 0 0 15px;
  margin: 0;
}

.toc-sub-item {
  margin-bottom: 6px;
}

.toc-sub-link {
  display: block;
  padding: 4px 0;
  font-size: 12px;
  color: #909399;
  text-decoration: none;
  transition: all 0.3s ease;
}

.toc-sub-link:hover {
  color: #409eff;
  padding-left: 5px;
}

/* 热门文章 */
.hot-articles {
  background-color: var(--app-color-white);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 640px;
}

.hot-articles-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 15px;
  color: var(--app-body-text-color);
  display: flex;
  align-items: center;
  gap: 8px;
}

.hot-articles-title::before {
  content: '';
  display: inline-block;
  width: 4px;
  height: 16px;
  background-color: #f56c6c;
  border-radius: 2px;
}

.hot-articles-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.hot-article-item {
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 15px;
}

.hot-article-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.hot-article-link {
  text-decoration: none;
  color: var(--app-body-text-color);
}

.hot-article-title {
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
  margin: 0;
  transition: color 0.3s ease;
}

.hot-article-title:hover {
  color: #409eff;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .article-detail-wrapper {
    max-width: 100%;
    padding: 0 15px;
  }
}

@media (max-width: 992px) {
  .article-sidebar {
    width: 100%;
  }

  .article-toc,
  .hot-articles {
    position: static;
  }

  .article-main-content {
    padding: 20px;
  }

  .article-title {
    font-size: 24px;
  }
}

@media (max-width: 768px) {
  .article-detail-page-container {
    padding: 10px 0;
  }

  .article-main-content {
    padding: 15px;
  }

  .article-title {
    font-size: 20px;
  }

  .article-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .article-stats {
    gap: 10px;
  }

  .article-content {
    font-size: 15px;
  }

  .article-content h2 {
    font-size: 20px;
  }

  .article-content h3 {
    font-size: 18px;
  }

  .article-sidebar {
    gap: 15px;
  }

  .article-toc,
  .hot-articles {
    padding: 15px;
  }
}
</style>
