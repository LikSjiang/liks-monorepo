<template>
  <div class="tag-container">
    <h1 class="page-title">文章标签</h1>
    <div class="tag-stats">
      <span class="stat-item">{{ tags.length }} 个标签</span>
      <span class="stat-item">{{ totalArticles }} 篇文章</span>
    </div>

    <div class="tag-content">
      <!-- 标签云 -->
      <div class="tag-cloud-section">
        <h2 class="section-title">标签云</h2>
        <div class="tag-cloud">
          <div
            v-for="tag in tags"
            :key="tag.id"
            class="tag-cloud-item"
            :class="{ active: selectedTagId === tag.id }"
            :style="{
              fontSize: `${Math.max(14, Math.min(24, 14 + tag.articleCount * 0.5))}px`,
              backgroundColor: tag.color,
              opacity: selectedTagId === tag.id ? 1 : 0.8,
            }"
            @click="selectTag(tag.id)"
          >
            {{ tag.name }}
            <span class="tag-count">({{ tag.articleCount }})</span>
          </div>
        </div>
      </div>

      <!-- 标签详情和文章列表 -->
      <div class="tag-main">
        <div class="selected-tag-header" v-if="selectedTag">
          <h2 class="selected-tag-title">
            <span class="tag-icon" :style="{ backgroundColor: selectedTag.color }"></span>
            {{ selectedTag.name }}
          </h2>
          <p class="selected-tag-stats">包含 {{ selectedTag.articleCount }} 篇文章</p>
        </div>

        <!-- 文章列表 -->
        <div class="articles-container">
          <div v-for="article in articlesInSelectedTag" :key="article.id" class="article-card" @click="navigateToArticle(article.id)">
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
                  <div class="article-tags">
                    <span v-for="tag in article.tags" :key="tag.id" class="article-tag" :style="{ backgroundColor: tag.color }">
                      {{ tag.name }}
                    </span>
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
                <div class="article-tags">
                  <span v-for="tag in article.tags" :key="tag.id" class="article-tag" :style="{ backgroundColor: tag.color }">
                    {{ tag.name }}
                  </span>
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
  name: 'TagPage',
});

const router = useRouter();

// 标签类型定义
interface Tag {
  id: number;
  name: string;
  color: string;
  articleCount: number;
}

// 文章类型定义
interface Article {
  id: number;
  title: string;
  name?: string;
  excerpt: string;
  date: string;
  authorName: string;
  authorAvatar: string;
  readTime: number;
  image?: string;
  tags: Tag[];
}

// 模拟标签数据
const tags: Tag[] = [
  {
    id: 1,
    name: 'JavaScript',
    color: '#f7df1e',
    articleCount: 12,
  },
  {
    id: 2,
    name: 'Vue.js',
    color: '#4fc08d',
    articleCount: 8,
  },
  {
    id: 3,
    name: 'React',
    color: '#61dafb',
    articleCount: 6,
  },
  {
    id: 4,
    name: 'TypeScript',
    color: '#3178c6',
    articleCount: 9,
  },
  {
    id: 5,
    name: 'CSS',
    color: '#1572b6',
    articleCount: 7,
  },
  {
    id: 6,
    name: 'HTML',
    color: '#e34c26',
    articleCount: 5,
  },
  {
    id: 7,
    name: 'Node.js',
    color: '#339933',
    articleCount: 8,
  },
  {
    id: 8,
    name: '前端开发',
    color: '#3b82f6',
    articleCount: 15,
  },
  {
    id: 9,
    name: '后端开发',
    color: '#ef4444',
    articleCount: 6,
  },
  {
    id: 10,
    name: '移动开发',
    color: '#06b6d4',
    articleCount: 4,
  },
  {
    id: 11,
    name: '性能优化',
    color: '#8b5cf6',
    articleCount: 5,
  },
  {
    id: 12,
    name: '设计模式',
    color: '#f59e0b',
    articleCount: 3,
  },
  {
    id: 13,
    name: '算法',
    color: '#ec4899',
    articleCount: 4,
  },
  {
    id: 14,
    name: 'Git',
    color: '#f05032',
    articleCount: 3,
  },
  {
    id: 15,
    name: 'Docker',
    color: '#2496ed',
    articleCount: 2,
  },
];

// 模拟文章数据
const articles: Article[] = [
  {
    id: 1,
    title: '如何使用Tailwind CSS构建现代响应式界面',
    excerpt: 'Tailwind CSS作为一个实用优先的CSS框架，正在改变前端开发的方式...',
    date: '2023-10-15',
    authorName: '张明',
    authorAvatar: '../../assets/images/lazy-image_2.gif',
    readTime: 8,
    tags: [
      { id: 5, name: 'CSS', color: '#1572b6', articleCount: 7 },
      { id: 8, name: '前端开发', color: '#3b82f6', articleCount: 15 },
    ],
  },
  {
    id: 2,
    name: '数字极简主义：在信息爆炸时代保持专注',
    title: '数字极简主义：在信息爆炸时代保持专注',
    excerpt: '在这个信息过载的时代，数字极简主义提供了一种回归专注和内心平静的方法...',
    date: '2023-10-10',
    authorName: '张明',
    authorAvatar: '../../assets/images/lazy-image_2.gif',
    readTime: 10,
    image: '/article1.jpg',
    tags: [],
  },
  {
    id: 3,
    title: '《原子习惯》读书笔记：如何养成持久的良好习惯',
    excerpt: '詹姆斯·克利尔的《原子习惯》提供了实用的策略来建立积极习惯和打破消极习惯...',
    date: '2023-09-25',
    authorName: '张明',
    authorAvatar: '../../assets/images/lazy-image_2.gif',
    readTime: 12,
    image: '/article2.jpg',
    tags: [],
  },
  {
    id: 4,
    title: '如何使用Vue 3构建响应式单页应用',
    excerpt: 'Vue 3作为最新版本的Vue.js框架，提供了更加强大、灵活的功能...',
    date: '2022-12-20',
    authorName: '张明',
    authorAvatar: '../../assets/images/lazy-image_2.gif',
    readTime: 15,
    image: '/article3.jpg',
    tags: [
      { id: 2, name: 'Vue.js', color: '#4fc08d', articleCount: 8 },
      { id: 1, name: 'JavaScript', color: '#f7df1e', articleCount: 12 },
      { id: 8, name: '前端开发', color: '#3b82f6', articleCount: 15 },
    ],
  },
  {
    id: 5,
    title: 'Vue 3 组件库：构建可复用的组件',
    excerpt: '在Vue 3中，组件库的构建变得更加简单和高效...',
    date: '2022-11-15',
    authorName: '张明',
    authorAvatar: '../../assets/images/lazy-image_2.gif',
    readTime: 18,
    image: '/article4.jpg',
    tags: [
      { id: 2, name: 'Vue.js', color: '#4fc08d', articleCount: 8 },
      { id: 4, name: 'TypeScript', color: '#3178c6', articleCount: 9 },
      { id: 8, name: '前端开发', color: '#3b82f6', articleCount: 15 },
    ],
  },
  {
    id: 6,
    title: '前端性能优化：从基础到进阶',
    excerpt: '前端性能优化是每个开发者都应该掌握的技能...',
    date: '2022-08-10',
    authorName: '张明',
    authorAvatar: '../../assets/images/lazy-image_2.gif',
    readTime: 20,
    image: '/article5.jpg',
    tags: [
      { id: 11, name: '性能优化', color: '#8b5cf6', articleCount: 5 },
      { id: 8, name: '前端开发', color: '#3b82f6', articleCount: 15 },
    ],
  },
  {
    id: 7,
    title: 'TypeScript 进阶：类型系统深度解析',
    excerpt: 'TypeScript的类型系统是其最强大的特性之一...',
    date: '2021-10-05',
    authorName: '张明',
    authorAvatar: '../../assets/images/lazy-image_2.gif',
    readTime: 25,
    image: '/article6.jpg',
    tags: [
      { id: 4, name: 'TypeScript', color: '#3178c6', articleCount: 9 },
      { id: 1, name: 'JavaScript', color: '#f7df1e', articleCount: 12 },
      { id: 8, name: '前端开发', color: '#3b82f6', articleCount: 15 },
    ],
  },
  {
    id: 8,
    title: 'React vs Vue：2021年框架对比',
    excerpt: 'React和Vue是目前最流行的两个前端框架...',
    date: '2021-09-15',
    authorName: '张明',
    authorAvatar: '../../assets/images/lazy-image_2.gif',
    readTime: 18,
    image: '/article7.jpg',
    tags: [
      { id: 2, name: 'Vue.js', color: '#4fc08d', articleCount: 8 },
      { id: 3, name: 'React', color: '#61dafb', articleCount: 6 },
      { id: 8, name: '前端开发', color: '#3b82f6', articleCount: 15 },
    ],
  },
  {
    id: 9,
    title: 'CSS Grid 布局：构建复杂界面的新方式',
    excerpt: 'CSS Grid布局是CSS中最强大的布局系统之一...',
    date: '2021-07-20',
    authorName: '张明',
    authorAvatar: '../../assets/images/lazy-image_2.gif',
    readTime: 15,
    image: '/article8.jpg',
    tags: [
      { id: 5, name: 'CSS', color: '#1572b6', articleCount: 7 },
      { id: 8, name: '前端开发', color: '#3b82f6', articleCount: 15 },
    ],
  },
  {
    id: 10,
    title: 'JavaScript 异步编程：从回调到Async/Await',
    excerpt: '异步编程是JavaScript的核心特性之一...',
    date: '2020-12-10',
    authorName: '张明',
    authorAvatar: '../../assets/images/lazy-image_2.gif',
    readTime: 22,
    image: '/article9.jpg',
    tags: [
      { id: 1, name: 'JavaScript', color: '#f7df1e', articleCount: 12 },
      { id: 8, name: '前端开发', color: '#3b82f6', articleCount: 15 },
    ],
  },
  {
    id: 11,
    title: 'Node.js 实战：构建RESTful API',
    excerpt: 'Node.js是构建服务器端应用的强大工具...',
    date: '2020-11-05',
    authorName: '张明',
    authorAvatar: '../../assets/images/lazy-image_2.gif',
    readTime: 25,
    image: '/article10.jpg',
    tags: [
      { id: 7, name: 'Node.js', color: '#339933', articleCount: 8 },
      { id: 1, name: 'JavaScript', color: '#f7df1e', articleCount: 12 },
      { id: 9, name: '后端开发', color: '#ef4444', articleCount: 6 },
    ],
  },
  {
    id: 12,
    title: 'Git 高级技巧：提高开发效率',
    excerpt: 'Git是目前最流行的版本控制系统...',
    date: '2020-09-15',
    authorName: '张明',
    authorAvatar: '../../assets/images/lazy-image_2.gif',
    readTime: 18,
    image: '/article11.jpg',
    tags: [{ id: 14, name: 'Git', color: '#f05032', articleCount: 3 }],
  },
];

// 选中的标签ID
const selectedTagId = ref<number | null>(null);

// 选择标签
const selectTag = (tagId: number) => {
  selectedTagId.value = selectedTagId.value === tagId ? null : tagId;
};

// 选中的标签
const selectedTag = computed(() => {
  return selectedTagId.value ? tags.find(tag => tag.id === selectedTagId.value) : null;
});

// 选中标签下的文章
const articlesInSelectedTag = computed(() => {
  if (!selectedTagId.value) {
    return [];
  }
  return articles.filter(article => article.tags.some(tag => tag.id === selectedTagId.value));
});

// 总文章数
const totalArticles = computed(() => articles.length);

// 导航到文章详情
const navigateToArticle = (id: number) => {
  window.open(router.resolve({ name: 'ArticleDetailPage', params: { id } }).href, '_blank');
};
</script>

<style lang="scss" scoped>
.tag-container {
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

.tag-stats {
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

.tag-content {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  padding: 30px;
}

/* 标签云 */
.tag-cloud-section {
  margin-bottom: 40px;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--app-body-text-color);
  margin: 0 0 24px 0;
  text-align: center;
}

.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  padding: 20px;
  background-color: #fafbfc;
  border-radius: 12px;
  min-height: 200px;
}

.tag-cloud-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 20px;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    opacity: 1 !important;
  }

  &.active {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
}

.tag-count {
  font-size: 0.8em;
  opacity: 0.9;
  font-weight: 400;
}

/* 标签详情和文章列表 */
.tag-main {
  border-top: 1px solid #f0f0f0;
  padding-top: 30px;
}

.selected-tag-header {
  margin-bottom: 30px;
  text-align: center;
}

.selected-tag-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--app-body-text-color);
  margin: 0 0 8px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.tag-icon {
  width: 16px;
  height: 16px;
  border-radius: 50%;
}

.selected-tag-stats {
  font-size: 1rem;
  color: #666;
  margin: 0;
}

/* 文章容器 */
.articles-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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
  border: 1px solid #f5f5f5;
}

.article-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.12);
  border-color: #e0effe;
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

.article-details.full-width {
  width: 100%;
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
  align-items: flex-start;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #f5f5f5;
  flex-wrap: wrap;
  gap: 12px;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  flex: 1;
}

.article-tag {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 12px;
  color: white;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
}

.read-time {
  font-size: 0.85rem;
  color: #999;
  align-self: center;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .articles-container {
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .tag-container {
    padding: 20px 16px;
  }

  .page-title {
    font-size: 2rem;
  }

  .tag-stats {
    flex-direction: column;
    gap: 12px;
    align-items: center;
  }

  .tag-content {
    padding: 20px;
  }

  .tag-cloud {
    padding: 16px;
  }

  .tag-cloud-item {
    padding: 6px 14px;
    font-size: 14px !important;
  }

  .selected-tag-title {
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
  .tag-container {
    padding: 16px 12px;
  }

  .page-title {
    font-size: 1.8rem;
  }

  .tag-content {
    padding: 16px;
  }

  .section-title {
    font-size: 1.3rem;
  }

  .tag-cloud {
    gap: 8px;
    padding: 12px;
  }

  .tag-cloud-item {
    padding: 5px 12px;
    font-size: 13px !important;
  }

  .selected-tag-title {
    font-size: 1.3rem;
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
  }

  .read-time {
    align-self: flex-start;
  }
}
</style>
