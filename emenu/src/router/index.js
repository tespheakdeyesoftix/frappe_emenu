import { createRouter, createWebHistory } from '@ionic/vue-router';

import routes from '@/router/routes.js'


const router = createRouter({
  history: createWebHistory("/emenu/"),
  routes,
});


router.beforeEach((to, from, next) => {


  next();
});


export default router;
