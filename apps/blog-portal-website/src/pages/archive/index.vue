<template>
  <div class="archive-container">
    <h1 class="page-title">文章归档</h1>
    <div class="archive-stats">
      <span class="stat-item">{{ totalArticles }} 篇文章</span>
      <span class="stat-item">{{ archivedYears.length }} 年记录</span>
    </div>

    <div class="archive-content">
      <!-- 年份分组 -->
      <div v-for="year in archivedYears" :key="year" class="year-section">
        <div class="year-header" @click="toggleYear(year)">
          <h2 class="year-title">{{ year }}</h2>
          <span class="toggle-icon" :class="{ rotated: expandedYears.includes(year) }">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </span>
        </div>

        <!-- 月份列表 -->
        <div class="months-container" :class="{ expanded: expandedYears.includes(year) }" v-show="expandedYears.includes(year)">
          <div v-for="month in monthsInYear(year)" :key="month.month" class="month-section">
            <h3 class="month-title">
              {{ month.monthName }} <span class="article-count">({{ month.articles.length }})</span>
            </h3>

            <!-- 文章列表 -->
            <ul class="article-list">
              <li v-for="article in month.articles" :key="article.id" class="article-item" @click="navigateToArticle(article.id)">
                <div class="article-info">
                  <h4 class="article-title">{{ article.title }}</h4>
                  <div class="article-meta">
                    <span class="category-tag" :style="{ backgroundColor: article.categoryColor }">{{ article.category }}</span>
                    <span class="publish-date">{{ article.date }}</span>
                    <span class="read-time">{{ article.readTime }}分钟阅读</span>
                  </div>
                </div>
                <div class="article-arrow">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              </li>
            </ul>
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
  name: 'ArticleArchivePage',
});

const router = useRouter();

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
  year: number;
  month: number;
  monthName: string;
}

// 模拟文章数据
const articles: Article[] = [
  {
    id: 1,
    title: '如何使用Tailwind CSS构建现代响应式界面',
    excerpt: 'Tailwind CSS作为一个实用优先的CSS框架，正在改变前端开发的方式...',
    category: '技术探索',
    categoryColor: '#3b82f6',
    date: '2023-10-15',
    authorName: '张明',
    authorAvatar: '../../assets/images/lazy-image_2.gif',
    readTime: 8,
    year: 2023,
    month: 10,
    monthName: '十月',
  },
  {
    id: 2,
    title: '数字极简主义：在信息爆炸时代保持专注',
    excerpt: '在这个信息过载的时代，数字极简主义提供了一种回归专注和内心平静的方法...',
    category: '生活方式',
    categoryColor: '#10b981',
    date: '2023-10-10',
    authorName: '张明',
    authorAvatar: '../../assets/images/lazy-image_2.gif',
    readTime: 10,
    image: '/article1.jpg',
    year: 2023,
    month: 10,
    monthName: '十月',
  },
  {
    id: 3,
    title: '《原子习惯》读书笔记：如何养成持久的良好习惯',
    excerpt: '詹姆斯·克利尔的《原子习惯》提供了实用的策略来建立积极习惯和打破消极习惯...',
    category: '读书笔记',
    categoryColor: '#8b5cf6',
    date: '2023-09-25',
    authorName: '张明',
    authorAvatar: '../../assets/images/lazy-image_2.gif',
    readTime: 12,
    image: '/article2.jpg',
    year: 2023,
    month: 9,
    monthName: '九月',
  },
  {
    id: 4,
    title: '如何使用Vue 3构建响应式单页应用',
    excerpt: 'Vue 3作为最新版本的Vue.js框架，提供了更加强大、灵活的功能...',
    category: '技术探索',
    categoryColor: '#3b82f6',
    date: '2022-12-20',
    authorName: '张明',
    authorAvatar: '../../assets/images/lazy-image_2.gif',
    readTime: 15,
    image: '/article3.jpg',
    year: 2022,
    month: 12,
    monthName: '十二月',
  },
  {
    id: 5,
    title: 'Vue 3 组件库：构建可复用的组件',
    excerpt: '在Vue 3中，组件库的构建变得更加简单和高效...',
    category: '技术探索',
    categoryColor: '#3b82f6',
    date: '2022-11-15',
    authorName: '张明',
    authorAvatar: '../../assets/images/lazy-image_2.gif',
    readTime: 18,
    image: '/article4.jpg',
    year: 2022,
    month: 11,
    monthName: '十一月',
  },
  {
    id: 6,
    title: '前端性能优化：从基础到进阶',
    excerpt: '前端性能优化是每个开发者都应该掌握的技能...',
    category: '技术探索',
    categoryColor: '#3b82f6',
    date: '2022-08-10',
    authorName: '张明',
    authorAvatar: '../../assets/images/lazy-image_2.gif',
    readTime: 20,
    image: '/article5.jpg',
    year: 2022,
    month: 8,
    monthName: '八月',
  },
  {
    id: 7,
    title: 'TypeScript 进阶：类型系统深度解析',
    excerpt: 'TypeScript的类型系统是其最强大的特性之一...',
    category: '技术探索',
    categoryColor: '#3b82f6',
    date: '2021-10-05',
    authorName: '张明',
    authorAvatar: '../../assets/images/lazy-image_2.gif',
    readTime: 25,
    image: '/article6.jpg',
    year: 2021,
    month: 10,
    monthName: '十月',
  },
  {
    id: 8,
    title: 'React vs Vue：2021年框架对比',
    excerpt: 'React和Vue是目前最流行的两个前端框架...',
    category: '技术探索',
    categoryColor: '#3b82f6',
    date: '2021-09-15',
    authorName: '张明',
    authorAvatar: '../../assets/images/lazy-image_2.gif',
    readTime: 18,
    image: '/article7.jpg',
    year: 2021,
    month: 9,
    monthName: '九月',
  },
  {
    id: 9,
    title: 'CSS Grid 布局：构建复杂界面的新方式',
    excerpt: 'CSS Grid布局是CSS中最强大的布局系统之一...',
    category: '技术探索',
    categoryColor: '#3b82f6',
    date: '2021-07-20',
    authorName: '张明',
    authorAvatar: '../../assets/images/lazy-image_2.gif',
    readTime: 15,
    image: '/article8.jpg',
    year: 2021,
    month: 7,
    monthName: '七月',
  },
  {
    id: 10,
    title: 'JavaScript 异步编程：从回调到Async/Await',
    excerpt: '异步编程是JavaScript的核心特性之一...',
    category: '技术探索',
    categoryColor: '#3b82f6',
    date: '2020-12-10',
    authorName: '张明',
    authorAvatar: '../../assets/images/lazy-image_2.gif',
    readTime: 22,
    image: '/article9.jpg',
    year: 2020,
    month: 12,
    monthName: '十二月',
  },
  {
    id: 11,
    title: 'Node.js 实战：构建RESTful API',
    excerpt: 'Node.js是构建服务器端应用的强大工具...',
    category: '技术探索',
    categoryColor: '#3b82f6',
    date: '2020-11-05',
    authorName: '张明',
    authorAvatar: '../../assets/images/lazy-image_2.gif',
    readTime: 25,
    image: '/article10.jpg',
    year: 2020,
    month: 11,
    monthName: '十一月',
  },
  {
    id: 12,
    title: 'Git 高级技巧：提高开发效率',
    excerpt: 'Git是目前最流行的版本控制系统...',
    category: '技术探索',
    categoryColor: '#3b82f6',
    date: '2020-09-15',
    authorName: '张明',
    authorAvatar: '../../assets/images/lazy-image_2.gif',
    readTime: 18,
    image: '/article11.jpg',
    year: 2020,
    month: 9,
    monthName: '九月',
  },
];

// 展开的年份
const expandedYears = ref<number[]>([2023]);

// 切换年份展开/折叠
const toggleYear = (year: number) => {
  const index = expandedYears.value.indexOf(year);
  if (index > -1) {
    expandedYears.value.splice(index, 1);
  } else {
    expandedYears.value.push(year);
  }
};

// 按年份分组的文章
const articlesByYear = computed(() => {
  const result: Record<number, Article[]> = {};
  articles.forEach((article: Article) => {
    if (!result[article.year]) {
      result[article.year] = [];
    }
    result[article.year]?.push(article);
  });

  return result;
});

// 归档年份列表（降序）
const archivedYears = computed(() => {
  return Object.keys(articlesByYear.value)
    .map(Number)
    .sort((a, b) => b - a);
});

// 获取某年的月份列表
const monthsInYear = (year: number) => {
  const yearArticles = articlesByYear.value[year] || [];
  const months: Record<number, { month: number; monthName: string; articles: Article[] }> = {};

  yearArticles.forEach((article: Article) => {
    if (!months[article.month]) {
      months[article.month] = {
        month: article.month,
        monthName: article.monthName,
        articles: [],
      };
    }
    months[article.month]?.articles.push(article);
  });

  // 按月份降序排序
  return Object.values(months).sort((a, b) => b.month - a.month);
};

// 总文章数
const totalArticles = computed(() => articles.length);

// 导航到文章详情
const navigateToArticle = (id: number) => {
  window.open(router.resolve({ name: 'ArticleDetailPage', params: { id } }).href, '_blank');
};
</script>

<style lang="scss" scoped>
.archive-container {
  max-width: 1000px;
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

.archive-stats {
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

.archive-content {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

/* 年份分组 */
.year-section {
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
}

.year-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 30px;
  background-color: #d5e1f4;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #e0effe;
  }
}

.year-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--app-body-text-color);
  margin: 0;
  letter-spacing: -0.3px;
}

.toggle-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
  color: #666;

  &.rotated {
    transform: rotate(90deg);
  }
}

/* 月份列表 */
.months-container {
  overflow: hidden;
  transition: all 0.3s ease;
}

.month-section {
  padding: 0 30px 20px;
}

.month-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #444;
  margin: 24px 0 16px 0;
  display: flex;
  align-items: center;
  gap: 10px;

  .article-count {
    font-size: 0.9rem;
    font-weight: 400;
    color: #999;
  }
}

/* 文章列表 */
.article-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.article-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #f5f5f5;
  cursor: pointer;
  transition: all 0.2s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    transform: translateX(8px);

    .article-title {
      color: #3b82f6;
    }

    .article-arrow {
      transform: translateX(4px);
      color: #3b82f6;
    }
  }
}

.article-info {
  flex: 1;
}

.article-title {
  font-size: 1rem;
  font-weight: 500;
  color: var(--app-body-text-color);
  margin: 0 0 8px 0;
  transition: color 0.2s ease;
  line-height: 1.4;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.85rem;
  color: #999;
}

.category-tag {
  padding: 2px 8px;
  border-radius: 4px;
  color: white;
  font-size: 0.75rem;
  font-weight: 500;
}

.publish-date {
  font-size: 0.85rem;
}

.read-time {
  font-size: 0.85rem;
}

.article-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ccc;
  transition: all 0.2s ease;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .archive-container {
    padding: 20px 16px;
  }

  .page-title {
    font-size: 2rem;
  }

  .archive-stats {
    flex-direction: column;
    gap: 12px;
    align-items: center;
  }

  .year-header {
    padding: 20px 20px;
  }

  .year-title {
    font-size: 1.5rem;
  }

  .month-section {
    padding: 0 20px 16px;
  }

  .month-title {
    font-size: 1.1rem;
    margin: 20px 0 12px 0;
  }

  .article-item {
    padding: 14px 0;

    &:hover {
      transform: translateX(4px);
    }
  }

  .article-title {
    font-size: 0.95rem;
  }

  .article-meta {
    flex-wrap: wrap;
    gap: 8px;
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .archive-container {
    padding: 16px 12px;
  }

  .page-title {
    font-size: 1.8rem;
  }

  .year-header {
    padding: 16px 16px;
  }

  .year-title {
    font-size: 1.3rem;
  }

  .month-section {
    padding: 0 16px 12px;
  }

  .month-title {
    font-size: 1rem;
    margin: 16px 0 10px 0;
  }

  .article-item {
    padding: 12px 0;
  }

  .article-title {
    font-size: 0.9rem;
  }

  .article-meta {
    font-size: 0.75rem;
  }
}
</style>
