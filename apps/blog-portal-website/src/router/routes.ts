import type { RouteRecordRaw } from 'vue-router';

const HomePage = () => import('@/pages/home/index.vue');
const ArticleDetailPage = () => import('@/pages/article/index.vue');
const CategoryPage = () => import('@/pages/category/index.vue');
const ArchivePage = () => import('@/pages/archive/index.vue');
const AboutMePage = () => import('@/pages/about/index.vue');
const ContactMePage = () => import('@/pages/contact/index.vue');
const TagPage = () => import('@/pages/tag/index.vue');
const MessageSpacePage = () => import('@/pages/message-space/index.vue');

export const navRoutes: RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'HomePage',
    component: HomePage,
    meta: {
      title: '首页',
    },
  },
  {
    path: '/archive',
    name: 'ArchivePage',
    component: ArchivePage,
    meta: {
      title: '归档',
    },
  },
  {
    path: '/category',
    name: 'CategoryPage',
    component: CategoryPage,
    meta: {
      title: '分类',
    },
  },
  {
    path: '/tag',
    name: 'TagPage',
    component: TagPage,
    meta: {
      title: '标签',
    },
  },
  {
    path: '/message',
    name: 'MessageSpacePage',
    component: MessageSpacePage,
    meta: {
      title: '留言板',
    },
  },
  {
    path: '/about',
    name: 'AboutMePage',
    component: AboutMePage,
    meta: {
      title: '关于我',
    },
  },
  {
    path: '/contact',
    name: 'ContactMePage',
    component: ContactMePage,
    meta: {
      title: '联系我',
    },
  },
];

export const layoutRoutes: RouteRecordRaw[] = [
  {
    path: '/article/:id',
    name: 'ArticleDetailPage',
    component: ArticleDetailPage,
    meta: {
      title: '文章详情',
    },
  },
];
