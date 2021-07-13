import { createApp } from 'vue';
import App from './App.vue';
import Router from '../src/router/index.js';
import Store from './store/store';

const app = createApp(App);

app.use(Router);
app.use(Store);
app.mount('#app');
