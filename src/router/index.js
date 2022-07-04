import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';
import Authorization from '../views/Authorization.vue';
import Analytics from '../views/Analytics.vue';

const routes = [
  {
    path: '/',
    name: 'authorization',
    component: Authorization
  },
  {
    path: '/analytics',
    name: 'analytics',
    component: Analytics
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach(async (to, from) => {
  if (
    // make sure the user is authenticated
    !store.state.Auth.authKey &&
    // ❗️ Avoid an infinite redirect
    to.name !== 'authorization'
  ) {
    // redirect the user to the login page
    return { name: 'authorization' }
  }
});

export default router;
