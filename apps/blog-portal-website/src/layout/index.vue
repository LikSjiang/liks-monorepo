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
    <LayoutHeader ref="headerRef" />

    <!-- 主要内容区域 -->
    <main class="main">
      <div class="container">
        <div class="content-wrapper">
          <RouterView />
        </div>
      </div>
    </main>
    <!-- 页脚 -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-info">
            <h3>江厌离的博客</h3>
            <p>探索思想，分享见解，记录生活的点滴感悟。</p>
          </div>
          <div class="footer-links">
            <h4>快速链接</h4>
            <ul @click="onClickNavItem">
              <li v-for="item in navItems" :key="item.path" :data-path="item.path">
                <p :href="item.path" :data-path="item.path">{{ item.name }}</p>
              </li>
            </ul>
          </div>
          <div class="footer-contact">
            <h4>联系我们</h4>
            <p>邮箱: 954583943@qq.com</p>
            <p>QQ: 954583943</p>
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
import { ref, computed, useTemplateRef } from 'vue';
import { useRouter } from 'vue-router';
import LayoutHeader from './components/header.vue';
import { NavItem } from '@/layout/types/layout.interface';
import { navRoutes } from '@/router/routes';
defineOptions({ name: 'LayoutIndex' });
const router = useRouter();
const headerRef = useTemplateRef('headerRef');

const navItems = ref<NavItem[]>(
  navRoutes.map(item => ({
    name: item.meta?.title as string,
    path: item.path,
  })),
);
// 获取当前年份
const currentYear = computed(() => {
  return new Date().getFullYear();
});

// 点击导航项时跳转
function onClickNavItem(e: Event) {
  const target = e.target as HTMLElement;
  const path = target.dataset.path;
  if (path) {
    router.push(path);
    headerRef.value?.setCurrentPath(path);
  }
}
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
}

.content-wrapper {
  padding: 40px 24px;
  background-color: #f9fafb;
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
    p {
      color: #ccc;
      text-decoration: none;
      transition: color 0.3s;
      cursor: pointer;
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
  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
}
</style>
