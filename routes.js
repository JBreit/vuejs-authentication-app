import VueRouter from 'vue-router';
import store from './store';

import HomeComponent from './components/Home';
import LoginComponent from './components/Login';
import RegisterComponent from './components/Register';
import DashboardComponent from './components/Dashboard';
import UserComponent from './components/User';
import ProfileComponent from './components/Profile';
import LogoutComponent from './components/Logout';

let routes = [
  {
    path: '/',
    name: 'home',
    component: HomeComponent,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginComponent,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterComponent,
  },
  {
    path: '/auth/dashboard',
    name: 'dashboard',
    component: DashboardComponent,
    meta: { requiresAuth: true },
  },
  {
    path: '/auth/user',
    name: 'user',
    component: UserComponent,
    meta: { requiresAuth: true },
  },
  {
    path: '/auth/user/:id',
    name: 'profile',
    component: ProfileComponent,
    meta: { requiresAuth: true },
  },
  {
    path: '/auth/logout',
    name: 'logout',
    component: LogoutComponent,
    meta: { requiresAuth: true },
  }
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.requiresAuth) && !store.getters.isAuthenticated) {
    next({ name: 'login' });
    return;
  }

  if (to.path === '/login' && store.getters.isAuthenticated) {
    next({ name: 'dashboard' });
    return;
  }

  next();
});

export default router;
