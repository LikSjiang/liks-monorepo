/*
 * @Description: 路由配置
 * @Author: liks
 * @Date: 2025-10-29 14:40:26
 * @LastEditors: liks
 * @LastEditTime: 2025-10-29 17:19:16
 */
import { createRouter, createWebHashHistory } from 'vue-router';
import { layoutRoutes, navRoutes } from './routes';

const router = createRouter({
  history: createWebHashHistory('/'),
  routes: [
    {
      path: '/',
      name: 'LayoutIndex',
      redirect: '/home',
      component: () => import('@/layout/index.vue'),
      children: [...navRoutes, ...layoutRoutes],
    },
    // 404 Not Found
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFoundPage',
      component: () => import('../pages/not-found/index.vue'),
    },
  ],
});

export default router;
