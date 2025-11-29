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
        <nav class="main-nav" @click.stop="onClickNavItem">
          <ul>
            <li v-for="item in navItems" :key="item.path" :class="{ 'selected span': item.path === currentPath }">
              <span :data-path="item.path">{{ item.name }}</span>
            </li>
          </ul>
        </nav>
        <div class="search-box">
          <input type="text" placeholder="搜索文章..." />
          <button type="button">搜索</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { NavItem } from '@/layout/types/layout.interface';
import { navRoutes } from '@/router/routes';
defineOptions({
  name: 'HeaderContent',
});
const router = useRouter();
const route = useRoute();
const currentPath = ref();

const navItems = ref<NavItem[]>(
  navRoutes.map(item => ({
    name: item.meta?.title as string,
    path: item.path,
  })),
);
// 点击导航项时跳转
function onClickNavItem(e: Event): void {
  const target = e.target as HTMLElement;
  const path = target.dataset.path;
  if (path) {
    currentPath.value = path;
    router.push(path);
  }
}

function setCurrentPath(path: string): void {
  currentPath.value = path;
}
onMounted(() => {
  currentPath.value = route.path;
  console.log(route, 'currentPath');
});
defineExpose({
  setCurrentPath,
});
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
  cursor: pointer;
  &:hover {
    color: #1890ff;
  }
}
.selected span {
  color: #1890ff;
  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 4px;
    background-color: #1890ff;
    border-radius: 2px;
    margin-top: 5px;
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
  transition: background-color 0.3s;
  &:hover {
    background-color: #40a9ff;
  }
  &:active {
    background-color: #006db3;
  }
}
</style>
