<!--
 * @Description: 博客门户网站布局组件
 * @Author: liks
 * @Date: 2025-10-29 17:12:03
 * @LastEditors: liks
 * @LastEditTime: 2025-10-30 15:08:37
-->
<template>
  <div class="layout">
    <!-- 顶部导航栏 -->
    <LayoutHeader />

    <!-- 主要内容区域 -->
    <main class="main">
      <div class="container">
        <div class="content-wrapper">
          <!-- 文章列表区域 -->
          <ArticleList />

          <!-- 侧边栏 -->
          <aside class="sidebar">
            <!-- 作者信息 -->
            <UserInfoCard />

            <!-- 分类列表 -->
            <CardList :list="categoryList" title="文章分类" type="category" />

            <!-- 热门标签 -->
            <CardList :list="tagList" title="热门标签" type="tag" />
            <!-- 热门文章 -->
            <CardList :list="hotArticleList" title="热门文章" type="articles" />
          </aside>
        </div>
      </div>
    </main>

    <!-- 页脚 -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-info">
            <h3>博客门户</h3>
            <p>分享技术，连接未来</p>
          </div>
          <div class="footer-links">
            <h4>快速链接</h4>
            <ul>
              <li v-for="item in navItems" :key="item.path">
                <a :href="item.path">{{ item.name }}</a>
              </li>
            </ul>
          </div>
          <div class="footer-contact">
            <h4>联系我们</h4>
            <p>邮箱: 954583943@qq.com</p>
            <!-- <p>微信: 954583943</p> -->
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; {{ currentYear }} 江厌离的博客. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import CardList from '@/components/card-list/index.vue';
import UserInfoCard from './components/user-info-card.vue';
import LayoutHeader from './components/header.vue';
import ArticleList from './components/article.vue';
// import PageFooter from './components/page-footer.vue';
import { NavItem } from '@/layout/types/layout.interface';

defineOptions({ name: 'LayoutIndex' });

const navItems = ref<NavItem[]>([
  { name: '首页', path: '/' },
  { name: '文章', path: '/articles' },
  { name: '分类', path: '/categories' },
  { name: '标签', path: '/tags' },
  { name: '关于', path: '/about' },
]);

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

// 移动端菜单控制
const showMobileMenu = ref(false);
const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value;
};

// 获取当前年份
const currentYear = computed(() => {
  return new Date().getFullYear();
});
</script>

<style lang="scss" scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 顶部导航栏样式 */
.header {
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo h1 {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  text-decoration: none;
}

.main-nav ul {
  display: flex;
  list-style: none;
  gap: 30px;
}

.main-nav span {
  color: #666;
  text-decoration: none;
  font-size: 16px;
  transition: color 0.3s;
  &:hover {
    color: #1890ff;
  }
}

.search-box {
  display: flex;
  align-items: center;
  gap: 10px;
}

.search-box input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 200px;
}

.search-box button {
  padding: 8px 16px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.mobile-menu-btn {
  display: none;
  button {
    font-size: 24px;
    background: none;
    border: none;
    cursor: pointer;
  }
}

.mobile-menu {
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  ul {
    list-style: none;
    padding: 0;
    li {
      margin-bottom: 15px;
      a {
        color: #666;
        text-decoration: none;
        font-size: 16px;
        display: block;
      }
    }
  }
}

/* 主要内容区域样式 */
.main {
  flex: 1;
  padding: 40px 0;
}

.content-wrapper {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 30px;
}

/* 侧边栏样式 */
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.sidebar > div {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.sidebar h3 {
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 18px;
  color: #333;
  border-bottom: 2px solid #1890ff;
  padding-bottom: 8px;
}

/* 页脚样式 */
.footer {
  background-color: #333;
  color: #fff;
  padding: 40px 0 20px;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  margin-bottom: 30px;
}

.footer-info h3 {
  font-size: 24px;
  margin-top: 0;
  margin-bottom: 10px;
}

.footer-links h4,
.footer-contact h4 {
  font-size: 18px;
  margin-top: 0;
  margin-bottom: 15px;
}

.footer-links ul {
  list-style: none;
  padding: 0;
  li {
    margin-bottom: 8px;
    a {
      color: #ccc;
      text-decoration: none;
      transition: color 0.3s;
      &:hover {
        color: #fff;
      }
    }
  }
}

.footer-bottom {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid #555;
  font-size: 14px;
  color: #ccc;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .content-wrapper {
    grid-template-columns: 1fr;
  }

  .sidebar {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .footer-content {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 768px) {
  .main-nav,
  .search-box {
    display: none;
  }

  .mobile-menu-btn {
    display: block;
  }

  .sidebar {
    grid-template-columns: 1fr;
  }

  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
}
</style>
