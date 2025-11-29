<template>
  <div class="home-page">
    <ArticleList />
    <aside class="sidebar">
      <UserInfoCard />
      <CardList :list="categoryList" title="文章分类" type="category" />
      <CardList :list="tagList" title="热门标签" type="tag" />
      <CardList :list="hotArticleList" title="热门文章" type="articles" />
    </aside>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import CardList from '@/components/card-list/index.vue';
import UserInfoCard from '@/components/user-info-card/index.vue';
import ArticleList from '@/components/article-list/index.vue';
defineOptions({
  name: 'HomePage',
});

const categoryList = ref([
  { name: '前端开发', key: '/categories/frontend' },
  { name: '后端开发', key: '/categories/backend' },
  { name: '人工智能', key: '/categories/ai' },
  { name: '开发工具', key: '/categories/tools' },
  { name: '其他', key: '/categories/other' },
]);

const tagList = ref([
  { name: 'Vue', key: '/tags/vue' },
  { name: 'React', key: '/tags/react' },
  { name: 'TypeScript', key: '/tags/typescript' },
  { name: 'Node.js', key: '/tags/nodejs' },
  { name: 'Python', key: '/tags/python' },
  { name: '算法', key: '/tags/algorithm' },
]);

const hotArticleList = ref([
  { name: 'Vue 3 Composition API 实战教程', key: '/articles/vue-3-composition-api' },
  { name: 'TypeScript 进阶指南', key: '/articles/typescript-advanced' },
  { name: '前端性能优化最佳实践', key: '/articles/frontend-performance' },
  { name: 'React Hooks 深入理解', key: '/articles/react-hooks' },
]);
</script>

<style lang="scss" scoped>
.home-page {
  width: 100%;
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 30px;
  /* 侧边栏样式 */
  .sidebar {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .sidebar h3 {
    margin-top: 0;
    margin-bottom: 15px;
    font-size: 18px;
    color: #333;
    border-bottom: 2px solid #1890ff;
    padding-bottom: 8px;
  }
  .sidebar > div {
    background-color: #fff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
}
/* 响应式设计 */
@media (max-width: 992px) {
  .home-page {
    grid-template-columns: 1fr;
  }

  .sidebar {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 768px) {
  .sidebar {
    grid-template-columns: 1fr;
  }
}
</style>
