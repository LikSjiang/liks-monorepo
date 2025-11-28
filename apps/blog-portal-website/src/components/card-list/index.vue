<!--
 * @Description: 
 * @Author: liks
 * @Date: 2025-10-30 09:53:33
 * @LastEditors: liks
 * @LastEditTime: 2025-10-30 10:49:23
-->
<template>
  <div :class="{ [`${type}-list`]: true }">
    <h3>{{ title }}</h3>
    <div v-if="type === 'tag'" class="tag">
      <a v-for="item in list" :key="item.key" :href="item.key">{{ item.name }}</a>
    </div>
    <ul v-else>
      <li v-for="item in list" :key="item.key">
        <a :href="item.key">{{ item.name }}</a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
// import { computed } from 'vue';
import { CardProps } from './card.interface';

defineOptions({
  name: 'CardList',
});

const { list = [], title = '', type = 'category' } = defineProps<CardProps>();
</script>

<style lang="scss" scoped>
h3 {
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 18px;
  color: #333;
  border-bottom: 2px solid #1890ff;
  padding-bottom: 8px;
}
.category-list ul,
.articles-list ul {
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

.tag-list .tag {
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
</style>
