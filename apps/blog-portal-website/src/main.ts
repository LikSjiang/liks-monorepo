/*
 * @Description: 入口文件
 * @Author: liks
 * @Date: 2025-10-29 14:40:26
 * @LastEditors: liks
 * @LastEditTime: 2025-10-29 16:19:24
 */
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import './styles/index.scss';
import { setupPlugins } from './plugins';

const app = createApp(App);

setupPlugins(app);

app.use(createPinia());
app.use(router);

app.mount('#app');
