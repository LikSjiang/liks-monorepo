<!--
 * @Description: 用户信息卡片组件
 * @Author: liks
 * @Date: 2025-10-30 10:55:37
 * @LastEditors: liks
 * @LastEditTime: 2025-10-30 10:57:31
-->
<template>
  <div class="author-info">
    <div class="avatar">
      <img src="../../assets/images/lazy-image_1.gif" alt="作者头像" />
    </div>
    <h3>江厌离</h3>
    <p>热爱技术，分享知识</p>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
h3 {
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 18px;
  font-weight: 600;
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
</style>
