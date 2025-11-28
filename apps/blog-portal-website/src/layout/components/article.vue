<template>
  <div class="article-list">
    <div v-for="(article, index) in articles" :key="index" class="article-card">
      <!-- 有图文章布局 -->
      <div v-if="article.image" class="article-content">
        <div class="article-image">
          <img src="../../assets/images/lazy-image_3.gif" :alt="article.title" />
        </div>
        <div class="article-details">
          <div class="article-meta">
            <span class="category-tag" :style="{ backgroundColor: article.categoryColor }">{{ article.category }}</span>
            <span class="publish-date">{{ article.date }}</span>
          </div>
          <h2 class="article-title">{{ article.title }}</h2>
          <p class="article-excerpt">{{ article.excerpt }}</p>
          <div class="article-footer">
            <div class="author-info">
              <img src="../../assets/images/lazy-image_2.gif" :alt="article.authorName" class="author-avatar" />
              <span class="author-name">{{ article.authorName }}</span>
            </div>
            <div class="read-time">{{ article.readTime }}分钟阅读</div>
          </div>
        </div>
      </div>

      <!-- 无图文章布局 -->
      <div v-else class="article-details full-width">
        <div class="article-meta">
          <span class="category-tag" :style="{ backgroundColor: article.categoryColor }">{{ article.category }}</span>
          <span class="publish-date">{{ article.date }}</span>
        </div>
        <h2 class="article-title">{{ article.title }}</h2>
        <p class="article-excerpt">{{ article.excerpt }}</p>
        <div class="article-footer">
          <div class="author-info">
            <img src="../../assets/images/lazy-image_2.gif" :alt="article.authorName" class="author-avatar" />
            <span class="author-name">{{ article.authorName }}</span>
          </div>
          <div class="read-time">{{ article.readTime }}分钟阅读</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'ArticleList',
});
// 文章类型定义
interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  categoryColor: string;
  date: string;
  authorName: string;
  authorAvatar: string;
  readTime: number;
  image?: string;
}

// 模拟文章数据
const articles: Article[] = [
  {
    id: 1,
    title: '如何使用Tailwind CSS构建现代响应式界面',
    excerpt: 'Tailwind CSS作为一个实用优先的CSS框架，正在改变前端开发的方式。本文将深入探讨如何利用其强大功能构建高效、美观的响应式界面...',
    category: '技术探索',
    categoryColor: '#3b82f6',
    date: '2023年10月15日',
    authorName: '张明',
    authorAvatar: '../../assets/images/lazy-image_2.gif',
    readTime: 8,
  },
  {
    id: 2,
    title: '数字极简主义：在信息爆炸时代保持专注',
    excerpt: '在这个信息过载的时代，数字极简主义提供了一种回归专注和内心平静的方法。本文分享了我实践数字极简主义的历程和收获...',
    category: '生活方式',
    categoryColor: '#10b981',
    date: '2023年10月10日',
    authorName: '张明',
    authorAvatar: '../../assets/images/lazy-image_2.gif',
    readTime: 10,
    image: '/article1.jpg',
  },
  {
    id: 3,
    title: '《原子习惯》读书笔记：如何养成持久的良好习惯',
    excerpt: '詹姆斯·克利尔的《原子习惯》提供了实用的策略来建立积极习惯和打破消极习惯。本文总结了书中的核心观点和我个人的实践心得...',
    category: '读书笔记',
    categoryColor: '#8b5cf6',
    date: '2023年10月5日',
    authorName: '张明',
    authorAvatar: '../../assets/images/lazy-image_2.gif',
    readTime: 12,
    image: '/article2.jpg',
  },
  // 4
  {
    id: 4,
    title: '如何使用Vue 3构建响应式单页应用',
    excerpt: 'Vue 3作为最新版本的Vue.js框架，提供了更加强大、灵活的功能。本文将引导你逐步学习如何使用Vue 3构建一个响应式的单页应用...',
    category: '技术探索',
    categoryColor: '#3b82f6',
    date: '2023年10月20日',
    authorName: '张明',
    authorAvatar: '../../assets/images/lazy-image_2.gif',
    readTime: 15,
    image: '/article3.jpg',
  },
  // 5
  {
    id: 5,
    title: 'Vue 3 组件库：构建可复用的组件',
    excerpt: '在Vue 3中，组件库的构建变得更加简单和高效。本文将介绍如何使用Vue 3的组件库功能，构建可复用的组件，提升开发效率...',
    category: '技术探索',
    categoryColor: '#3b82f6',
    date: '2023年10月25日',
    authorName: '张明',
    authorAvatar: '../../assets/images/lazy-image_2.gif',
    readTime: 18,
    image: '/article4.jpg',
  },
];
</script>

<style scoped>
.article-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.article-card {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.article-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.article-content {
  display: flex;
  gap: 20px;
}

.article-image {
  flex-shrink: 0;
  width: 240px;
  height: 160px;
  border-radius: 6px;
  overflow: hidden;
}

.article-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.article-card:hover .article-image img {
  transform: scale(1.05);
}

.article-details {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.article-details.full-width {
  width: 100%;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.category-tag {
  padding: 4px 10px;
  border-radius: 4px;
  color: white;
  font-size: 12px;
  font-weight: 500;
}

.publish-date {
  color: #666;
  font-size: 14px;
}

.article-title {
  margin: 0 0 12px 0;
  font-size: 20px;
  font-weight: 600;
  color: #333;
  line-height: 1.4;
  transition: color 0.2s ease;
}

.article-card:hover .article-title {
  color: #3b82f6;
}

.article-excerpt {
  margin: 0 0 auto 0;
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.article-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.author-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.author-name {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.read-time {
  font-size: 14px;
  color: #999;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .article-content {
    flex-direction: column;
  }

  .article-image {
    width: 100%;
    height: 200px;
  }

  .article-title {
    font-size: 18px;
  }

  .article-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
</style>
