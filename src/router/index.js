import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import("../views/Home.vue")
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import("../views/Auth/Login.vue")
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import("../views/Auth/Register.vue")
  },
  {
    path: '*',
    name: '404',
    component: () => import("../views/404.vue")
  },

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

const auth = ["/"];

router.beforeEach((to, from, next) => {
  if (!store.getters.isLoggedIn && auth.includes(to.path)) {
    next("/login");
  } else if (store.getters.isLoggedIn && !auth.includes(to.path)) {
    next("/");
  }
  next();
});


export default router
