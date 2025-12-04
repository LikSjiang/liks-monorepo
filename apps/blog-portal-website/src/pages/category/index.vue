<template>
  <div class="category-container">
    <h1 class="page-title">文章分类</h1>
    <div class="category-stats">
      <span class="stat-item">{{ categories.length }} 个分类</span>
      <span class="stat-item">{{ totalArticles }} 篇文章</span>
    </div>

    <div class="category-content">
      <!-- 分类列表 -->
      <div class="categories-sidebar">
        <div class="sidebar-header">
          <h2>所有分类</h2>
        </div>
        <ul class="categories-list">
          <li v-for="category in categories" :key="category.id" class="category-item" :class="{ active: selectedCategoryId === category.id }" @click="selectCategory(category.id)">
            <div class="category-color" :style="{ backgroundColor: category.color }"></div>
            <div class="category-info">
              <span class="category-name">{{ category.name }}</span>
              <span class="category-count">({{ category.articleCount }})</span>
            </div>
          </li>
        </ul>
      </div>

      <!-- 分类详情和文章列表 -->
      <div class="category-main">
        <div class="selected-category-header">
          <h2 class="selected-category-title">
            {{ selectedCategory?.name }}
          </h2>
          <p class="selected-category-description">
            {{ selectedCategory?.description }}
          </p>
        </div>

        <!-- 文章列表 -->
        <div class="articles-container">
          <div v-for="article in articlesInSelectedCategory" :key="article.id" class="article-card" @click="navigateToArticle(article.id)">
            <!-- 有图文章布局 -->
            <div v-if="article.image" class="article-content">
              <div class="article-image">
                <img src="../../assets/images/lazy-image_3.gif" :alt="article.title" />
              </div>
              <div class="article-details">
                <div class="article-meta">
                  <span class="publish-date">{{ article.date }}</span>
                </div>
                <h3 class="article-title">{{ article.title }}</h3>
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
                <span class="publish-date">{{ article.date }}</span>
              </div>
              <h3 class="article-title">{{ article.title }}</h3>
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
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

defineOptions({
  name: 'CategoryPage',
});

const router = useRouter();

// 分类类型定义
interface Category {
  id: number;
  name: string;
  color: string;
  description: string;
  articleCount: number;
}

// 文章类型定义
interface Article {
  id: number;
  title: string;
  excerpt: string;
  categoryId: number;
  category: string;
  categoryColor: string;
  date: string;
  authorName: string;
  authorAvatar: string;
  readTime: number;
  image?: string;
}

// 模拟分类数据
const categories: Category[] = [
  {
    id: 1,
    name: '技术探索',
    color: '#3b82f6',
    description: '探索最新的技术趋势和开发实践',
    articleCount: 8,
  },
  {
    id: 2,
    name: '生活方式',
    color: '#10b981',
    description: '分享生活中的美好瞬间和感悟',
    articleCount: 1,
  },
  {
    id: 3,
    name: '读书笔记',
    color: '#8b5cf6',
    description: '记录读书心得和知识分享',
    articleCount: 1,
  },
  {
    id: 4,
    name: '前端开发',
    color: '#f59e0b',
    description: '专注于前端开发技术和最佳实践',
    articleCount: 6,
  },
  {
    id: 5,
    name: '后端开发',
    color: '#ef4444',
    description: '探讨后端架构和开发技术',
    articleCount: 3,
  },
  {
    id: 6,
    name: '移动开发',
    color: '#06b6d4',
    description: '分享移动应用开发经验和技巧',
    articleCount: 2,
  },
];

// 模拟文章数据
const articles: Article[] = [
  {
    id: 1,
    title: '如何使用Tailwind CSS构建现代响应式界面',
    excerpt: 'Tailwind CSS作为一个实用优先的CSS框架，正在改变前端开发的方式...',
    categoryId: 1,
    category: '技术探索',
    categoryColor: '#3b82f6',
    date: '2023-10-15',
    authorName: '张明',
    authorAvatar: '../../assets/images/lazy-image_2.gif',
    readTime: 8,
  },
  {
    id: 2,
    title: '数字极简主义：在信息爆炸时代保持专注',
    excerpt: '在这个信息过载的时代，数字极简主义提供了一种回归专注和内心平静的方法...',
    categoryId: 2,
    category: '生活方式',
    categoryColor: '#10b981',
    date: '2023-10-10',
    authorName: '张明',
    authorAvatar: '../../assets/images/lazy-image_2.gif',
    readTime: 10,
    image: '/article1.jpg',
  },
  {
    id: 3,
    title: '《原子习惯》读书笔记：如何养成持久的良好习惯',
    excerpt: '詹姆斯·克利尔的《原子习惯》提供了实用的策略来建立积极习惯和打破消极习惯...',
    categoryId: 3,
    category: '读书笔记',
    categoryColor: '#8b5cf6',
    date: '2023-09-25',
    authorName: '张明',
    authorAvatar: '../../assets/images/lazy-image_2.gif',
    readTime: 12,
    image: '/article2.jpg',
  },
  {
    id: 4,
    title: '如何使用Vue 3构建响应式单页应用',
    excerpt: 'Vue 3作为最新版本的Vue.js框架，提供了更加强大、灵活的功能...',
    categoryId: 4,
    category: '前端开发',
    categoryColor: '#f59e0b',
    date: '2022-12-20',
    authorName: '张明',
    authorAvatar: '../../assets/images/lazy-image_2.gif',
    readTime: 15,
    image: '/article3.jpg',
  },
  {
    id: 5,
    title: 'Vue 3 组件库：构建可复用的组件',
    excerpt: '在Vue 3中，组件库的构建变得更加简单和高效...',
    categoryId: 4,
    category: '前端开发',
    categoryColor: '#f59e0b',
    date: '2022-11-15',
    authorName: '张明',
    authorAvatar: '../../assets/images/lazy-image_2.gif',
    readTime: 18,
    image: '/article4.jpg',
  },
  {
    id: 6,
    title: '前端性能优化：从基础到进阶',
    excerpt: '前端性能优化是每个开发者都应该掌握的技能...',
    categoryId: 4,
    category: '前端开发',
    categoryColor: '#f59e0b',
    date: '2022-08-10',
    authorName: '张明',
    authorAvatar: '../../assets/images/lazy-image_2.gif',
    readTime: 20,
    image: '/article5.jpg',
  },
  {
    id: 7,
    title: 'TypeScript 进阶：类型系统深度解析',
    excerpt: 'TypeScript的类型系统是其最强大的特性之一...',
    categoryId: 4,
    category: '前端开发',
    categoryColor: '#f59e0b',
    date: '2021-10-05',
    authorName: '张明',
    authorAvatar: '../../assets/images/lazy-image_2.gif',
    readTime: 25,
    image: '/article6.jpg',
  },
  {
    id: 8,
    title: 'React vs Vue：2021年框架对比',
    excerpt: 'React和Vue是目前最流行的两个前端框架...',
    categoryId: 4,
    category: '前端开发',
    categoryColor: '#f59e0b',
    date: '2021-09-15',
    authorName: '张明',
    authorAvatar: '../../assets/images/lazy-image_2.gif',
    readTime: 18,
    image: '/article7.jpg',
  },
  {
    id: 9,
    title: 'CSS Grid 布局：构建复杂界面的新方式',
    excerpt: 'CSS Grid布局是CSS中最强大的布局系统之一...',
    categoryId: 4,
    category: '前端开发',
    categoryColor: '#f59e0b',
    date: '2021-07-20',
    authorName: '张明',
    authorAvatar: '../../assets/images/lazy-image_2.gif',
    readTime: 15,
    image: '/article8.jpg',
  },
  {
    id: 10,
    title: 'JavaScript 异步编程：从回调到Async/Await',
    excerpt: '异步编程是JavaScript的核心特性之一...',
    categoryId: 1,
    category: '技术探索',
    categoryColor: '#3b82f6',
    date: '2020-12-10',
    authorName: '张明',
    authorAvatar: '../../assets/images/lazy-image_2.gif',
    readTime: 22,
    image: '/article9.jpg',
  },
  {
    id: 11,
    title: 'Node.js 实战：构建RESTful API',
    excerpt: 'Node.js是构建服务器端应用的强大工具...',
    categoryId: 5,
    category: '后端开发',
    categoryColor: '#ef4444',
    date: '2020-11-05',
    authorName: '张明',
    authorAvatar: '../../assets/images/lazy-image_2.gif',
    readTime: 25,
    image: '/article10.jpg',
  },
  {
    id: 12,
    title: 'Git 高级技巧：提高开发效率',
    excerpt: 'Git是目前最流行的版本控制系统...',
    categoryId: 1,
    category: '技术探索',
    categoryColor: '#3b82f6',
    date: '2020-09-15',
    authorName: '张明',
    authorAvatar: '../../assets/images/lazy-image_2.gif',
    readTime: 18,
    image: '/article11.jpg',
  },
  {
    id: 13,
    title: 'Express.js 中间件开发指南',
    excerpt: 'Express.js中间件是构建Node.js应用的核心...',
    categoryId: 5,
    category: '后端开发',
    categoryColor: '#ef4444',
    date: '2020-08-20',
    authorName: '张明',
    authorAvatar: '../../assets/images/lazy-image_2.gif',
    readTime: 20,
    image: '/article12.jpg',
  },
  {
    id: 14,
    title: 'MongoDB 数据库设计最佳实践',
    excerpt: 'MongoDB是目前最流行的NoSQL数据库之一...',
    categoryId: 5,
    category: '后端开发',
    categoryColor: '#ef4444',
    date: '2020-07-15',
    authorName: '张明',
    authorAvatar: '../../assets/images/lazy-image_2.gif',
    readTime: 22,
    image: '/article13.jpg',
  },
  {
    id: 15,
    title: 'Flutter 跨平台开发入门',
    excerpt: 'Flutter是Google推出的跨平台移动应用开发框架...',
    categoryId: 6,
    category: '移动开发',
    categoryColor: '#06b6d4',
    date: '2020-06-10',
    authorName: '张明',
    authorAvatar: '../../assets/images/lazy-image_2.gif',
    readTime: 25,
    image: '/article14.jpg',
  },
  {
    id: 16,
    title: 'React Native 性能优化技巧',
    excerpt: 'React Native是Facebook推出的跨平台移动应用开发框架...',
    categoryId: 6,
    category: '移动开发',
    categoryColor: '#06b6d4',
    date: '2020-05-15',
    authorName: '张明',
    authorAvatar: '../../assets/images/lazy-image_2.gif',
    readTime: 20,
    image: '/article15.jpg',
  },
];

// 选中的分类ID
const selectedCategoryId = ref<number>(1);

// 选择分类
const selectCategory = (categoryId: number) => {
  selectedCategoryId.value = categoryId;
};

// 选中的分类
const selectedCategory = computed(() => {
  return categories.find(category => category.id === selectedCategoryId.value) || categories[0];
});

// 选中分类下的文章
const articlesInSelectedCategory = computed(() => {
  return articles.filter(article => article.categoryId === selectedCategoryId.value);
});

// 总文章数
const totalArticles = computed(() => articles.length);

// 导航到文章详情
const navigateToArticle = (id: number) => {
  window.open(router.resolve({ name: 'ArticleDetailPage', params: { id } }).href, '_blank');
};
</script>

<style lang="scss" scoped>
.category-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: var(--app-font-family);
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--app-body-text-color);
  margin: 0 0 20px 0;
  text-align: center;
  letter-spacing: -0.5px;
}

.category-stats {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 40px;
  color: #666;
  font-size: 14px;

  .stat-item {
    background-color: #f8f9fa;
    padding: 8px 20px;
    border-radius: 20px;
    transition: all 0.3s ease;

    &:hover {
      background-color: #e9ecef;
      transform: translateY(-2px);
    }
  }
}

.category-content {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 30px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

/* 分类侧边栏 */
.categories-sidebar {
  background-color: #fafbfc;
  padding: 24px;
  border-right: 1px solid #f0f0f0;
}

.sidebar-header {
  margin-bottom: 20px;

  h2 {
    font-size: 1.2rem;
    font-weight: 600;
    color: #333;
    margin: 0;
  }
}

.categories-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  margin-bottom: 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: white;
  border: 1px solid transparent;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    transform: translateX(4px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  }

  &.active {
    background-color: #e0effe;
    border-color: #3b82f6;
    box-shadow: 0 2px 4px rgba(59, 130, 246, 0.15);
  }
}

.category-color {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}

.category-info {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.category-name {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--app-body-text-color);
  transition: color 0.2s ease;

  .category-item:hover &,
  .category-item.active & {
    color: #3b82f6;
  }
}

.category-count {
  font-size: 0.8rem;
  color: #999;
  background-color: #f0f0f0;
  padding: 2px 8px;
  border-radius: 10px;

  .category-item.active & {
    background-color: #3b82f6;
    color: white;
  }
}

/* 分类详情和文章列表 */
.category-main {
  padding: 24px;
}

.selected-category-header {
  margin-bottom: 32px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;
}

.selected-category-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--app-body-text-color);
  margin: 0 0 8px 0;
  display: flex;
  align-items: center;
  gap: 12px;
}

.selected-category-description {
  font-size: 1rem;
  color: #666;
  margin: 0;
  line-height: 1.6;
}

/* 文章容器 */
.articles-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

/* 文章卡片 */
.article-card {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.article-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.12);
}

.article-content {
  display: flex;
  flex-direction: column;
}

.article-image {
  width: 100%;
  height: 180px;
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
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.publish-date {
  color: #666;
  font-size: 13px;
}

.article-title {
  margin: 0 0 12px 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  line-height: 1.4;
  transition: color 0.3s ease;
  flex-shrink: 0;
}

.article-card:hover .article-title {
  color: #3b82f6;
}

.article-excerpt {
  margin: 0 0 auto 0;
  font-size: 0.9rem;
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
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #f5f5f5;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.author-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
}

.author-name {
  font-size: 0.85rem;
  color: #333;
  font-weight: 500;
}

.read-time {
  font-size: 0.85rem;
  color: #999;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .category-content {
    grid-template-columns: 260px 1fr;
    gap: 24px;
  }

  .articles-container {
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .category-container {
    padding: 20px 16px;
  }

  .page-title {
    font-size: 2rem;
  }

  .category-stats {
    flex-direction: column;
    gap: 12px;
    align-items: center;
  }

  .category-content {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .categories-sidebar {
    border-right: none;
    border-bottom: 1px solid #f0f0f0;
  }

  .categories-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 8px;
  }

  .category-item {
    margin-bottom: 0;
    padding: 10px 12px;
    flex-direction: column;
    text-align: center;
    gap: 8px;
  }

  .category-info {
    flex-direction: column;
    gap: 4px;
  }

  .selected-category-header {
    margin-bottom: 24px;
    padding-bottom: 16px;
  }

  .selected-category-title {
    font-size: 1.5rem;
  }

  .articles-container {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .article-image {
    height: 200px;
  }
}

@media (max-width: 480px) {
  .category-container {
    padding: 16px 12px;
  }

  .page-title {
    font-size: 1.8rem;
  }

  .categories-sidebar {
    padding: 16px;
  }

  .categories-list {
    grid-template-columns: repeat(2, 1fr);
  }

  .category-main {
    padding: 16px;
  }

  .selected-category-title {
    font-size: 1.3rem;
  }

  .selected-category-description {
    font-size: 0.95rem;
  }

  .article-details {
    padding: 16px;
  }

  .article-title {
    font-size: 1rem;
  }

  .article-excerpt {
    font-size: 0.85rem;
  }

  .article-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    padding-top: 12px;
  }
}
</style>
