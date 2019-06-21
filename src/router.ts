import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      // name: 'home',
      // component: Home,
      redirect: '/shopping'
    },
    {
      path: '/shopping',
      name: 'shopping',
      component: ()=>import(/* webpackChunkName: "Shopping" */ './views/Shopping/Shopping.vue'),
      children: [
        {
          path: 'create-category',
          name: 'CreateCategory',
          component: ()=>import(/* webpackChunkName: "CreateCategory" */ './views/Shopping/CreateCategory.vue'),
        }
      ]
    }
  ],
});
