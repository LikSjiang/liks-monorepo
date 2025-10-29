<!--
 * @Description: 博客门户网站布局组件
 * @Author: liks
 * @Date: 2025-10-29 17:12:03
 * @LastEditors: liks
 * @LastEditTime: 2025-10-29 17:51:48
-->
<template>
  <div class="layout">
    <!-- 顶部导航栏 -->
    <header class="header">
      <div class="container">
        <div class="header-content">
          <div class="logo">
            <h1>江厌离的博客</h1>
          </div>
          <nav class="main-nav">
            <ul>
              <li v-for="item in navItems" :key="item.path">
                <span>{{ item.name }}</span>
              </li>
            </ul>
          </nav>
          <div class="search-box">
            <input type="text" placeholder="搜索文章..." />
            <button type="button">搜索</button>
          </div>
          <div class="mobile-menu-btn">
            <button @click="toggleMobileMenu">☰</button>
          </div>
        </div>
      </div>
      <!-- 移动端导航菜单 -->
      <div v-if="showMobileMenu" class="mobile-menu">
        <ul>
          <li v-for="item in navItems" :key="item.path">
            <a :href="item.path" @click="showMobileMenu = false">{{ item.name }}</a>
          </li>
        </ul>
      </div>
    </header>

    <!-- 主要内容区域 -->
    <main class="main">
      <div class="container">
        <div class="content-wrapper">
          <!-- 文章列表区域 -->
          <div class="article-list">
            <slot></slot>
          </div>

          <!-- 侧边栏 -->
          <aside class="sidebar">
            <!-- 作者信息 -->
            <div class="author-info">
              <div class="avatar">
                <img src="../assets/images/lazy-image_1.gif" alt="作者头像" />
              </div>
              <h3>江厌离</h3>
              <p>热爱技术，分享知识</p>
            </div>

            <!-- 分类列表 -->
            <div class="category-list">
              <h3>文章分类</h3>
              <ul>
                <li v-for="item in categoryList" :key="item.path">
                  <a :href="item.path">{{ item.name }}</a>
                </li>
              </ul>
            </div>

            <!-- 热门标签 -->
            <div class="tag-cloud">
              <h3>热门标签</h3>
              <div class="tags">
                <a v-for="item in tagList" :key="item.path" :href="item.path">{{ item.name }}</a>
              </div>
            </div>

            <!-- 热门文章 -->
            <div class="hot-articles">
              <h3>热门文章</h3>
              <ul>
                <li v-for="item in hotArticleList" :key="item.path">
                  <a :href="item.path">{{ item.name }}</a>
                </li>
              </ul>
            </div>
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

defineOptions({ name: 'LayoutIndex' });

const navItems = ref([
  { name: '首页', path: '/' },
  { name: '文章', path: '/articles' },
  { name: '分类', path: '/categories' },
  { name: '标签', path: '/tags' },
  { name: '关于', path: '/about' },
]);

const categoryList = ref([
  { name: '前端开发', path: '/categories/frontend' },
  { name: '后端开发', path: '/categories/backend' },
  { name: '人工智能', path: '/categories/ai' },
  { name: '开发工具', path: '/categories/tools' },
  { name: '其他', path: '/categories/other' },
]);

const tagList = ref([
  { name: 'Vue', path: '/tags/vue' },
  { name: 'React', path: '/tags/react' },
  { name: 'TypeScript', path: '/tags/typescript' },
  { name: 'Node.js', path: '/tags/nodejs' },
  { name: 'Python', path: '/tags/python' },
  { name: '算法', path: '/tags/algorithm' },
]);

const hotArticleList = ref([
  { name: 'Vue 3 Composition API 实战教程', path: '/articles/vue-3-composition-api' },
  { name: 'TypeScript 进阶指南', path: '/articles/typescript-advanced' },
  { name: '前端性能优化最佳实践', path: '/articles/frontend-performance' },
  { name: 'React Hooks 深入理解', path: '/articles/react-hooks' },
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

.article-list {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
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

.author-info {
  text-align: center;
  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto 15px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

.category-list ul,
.hot-articles ul {
  list-style: none;
  padding: 0;
  li {
    margin-bottom: 10px;
    a {
      color: #666;
      text-decoration: none;
      transition: color 0.3s;
      &:hover {
        color: #1890ff;
      }
    }
  }
}

.tag-cloud .tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  a {
    display: inline-block;
    padding: 4px 12px;
    background-color: #f0f0f0;
    color: #666;
    text-decoration: none;
    border-radius: 16px;
    font-size: 14px;
    transition: all 0.3s;
    &:hover {
      background-color: #1890ff;
      color: white;
    }
  }
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
