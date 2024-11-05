// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/styles.css'; // Link the global stylesheet

createApp(App).use(router).mount('#app');
