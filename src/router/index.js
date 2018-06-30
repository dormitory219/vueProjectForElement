import Vue from 'vue';
import Router from 'vue-router';
import goods from '../components/goods/goods.vue';
import rating from '../components/rating/rating.vue';
import seller from '../components/seller/seller.vue';

Vue.use(Router);

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      component: goods
    },
    {
      path: '/goods',
      component: goods
    },
    {
      path: '/ratings',
      component: rating
    },
    {
      path: '/seller',
      component: seller
    }
  ]
});
