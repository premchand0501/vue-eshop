import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "Shopping" */ './views/Shopping/Shopping.vue'),
      children: [
        {
          path: 'product-list/:group_id',
          name: 'product-list',
          component: () => import(/* webpackChunkName: "ProductList" */ './views/Shopping/ProductList.vue'),
        },
        {
          path: 'product-details/:prod_id',
          name: 'product-details',
          component: () => import(/* webpackChunkName: "ProductDetails" */ './views/Shopping/ProductDetails.vue'),
        },
      ],
    },
    {
      path: '/search',
      name: 'search',
      component: () => import(/* webpackChunkName: "Search" */ './views/Shopping/Search.vue'),
    },
    {
      path: '/admin',
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem('token');
        if (token != null && token != '') {
          next();
        } else {
          next({
            name: 'Auth',
            params: { redirectUrl: from.fullPath },
          });
        }
      },
      component: () => import(/* webpackChunkName: "Admin" */ './views/admin/Admin.vue'),
      children: [
        {
          path: 'create-category',
          name: 'CreateCategory',
          component: () => import(/* webpackChunkName: "CreateCategory" */ './views/admin/CreateCategory.vue'),
        },
        {
          path: 'product',
          name: 'ProductAddEdit',
          component: () => import(/* webpackChunkName: "ProductAddEdit" */ './views/admin/ProductAddEdit.vue'),
        },
      ],
    },
    {
      path: '/auth',
      name: 'Auth',
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem('token');
        console.log(token);
        if (token != null && token != '') {
          next({
            name: 'CreateCategory',
          });
        } else {
          next();
        }
      },
      component: () => import(/* webpackChunkName: "Auth" */ './views/admin/Auth.vue'),
    },
    {
      path: '**',
      component: () => import(/* webpackChunkName: "404" */ './views/404.vue'),
    },
  ],
});
