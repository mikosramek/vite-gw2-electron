import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import NewItemPage from '../components/NewItemPage.vue';
import OptionsPage from '../components/OptionsPage.vue';

const Router = createRouter({
  history : createWebHistory(import.meta.env.BASE_URL),
  routes : [
    {
      path      : '/',
      name      : 'Home',
      component : Home
    },
    {
      path      : '/new',
      name      : 'NewItemPage',
      component : NewItemPage
    },
    {
      path      : '/options',
      name      : 'OptionsPage',
      component : OptionsPage
    }
  ]
});

export default Router;
