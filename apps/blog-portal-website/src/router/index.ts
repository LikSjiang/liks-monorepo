/*
 * @Description: 路由配置
 * @Author: liks
 * @Date: 2025-10-29 14:40:26
 * @LastEditors: liks
 * @LastEditTime: 2025-10-29 17:19:16
 */
import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory('/'),
  routes: [
    {
      path: '/',
      name: 'LayoutIndex',
      component: () => import('@/layout/index.vue'),
    },
  ],
});

export default router;
