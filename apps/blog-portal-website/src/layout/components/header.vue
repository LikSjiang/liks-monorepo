<!--
 * @Description: 顶部导航栏组件
 * @Author: liks
 * @Date: 2025-10-30 14:37:32
 * @LastEditors: liks
 * @LastEditTime: 2025-11-28 16:03:35
-->
<template>
  <div class="header-container">
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
  </div>
</template>

<script setup lang="ts">
import { NavItem } from '@/layout/types/layout.interface';
import { ref } from 'vue';

defineOptions({
  name: 'HeaderContent',
});

const navItems = ref<NavItem[]>([
  { name: '首页', path: '/' },
  { name: '文章', path: '/articles' },
  { name: '分类', path: '/categories' },
  { name: '标签', path: '/tags' },
  { name: '关于', path: '/about' },
]);
// 移动端菜单控制
const showMobileMenu = ref(false);
const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value;
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 顶部导航栏样式 */
.header-container {
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
</style>
