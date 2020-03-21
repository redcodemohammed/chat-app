import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store";
import Home from "../views/Chat";
import Login from "../views/Auth/Login";
import Register from "../views/Auth/Register";
import Logout from "../views/Auth/Logout";
import Account from "../views/Account";
import _404 from "../views/404";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout
  },
  {
    path: '/account',
    name: 'Account',
    component: Account
  },
  {
    path: '*',
    name: '404',
    component: _404
  },

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

const publicRoutes = ["/login", "/register"];

router.beforeEach((to, from, next) => {
  if (!store.getters.isLoggedIn && !publicRoutes.includes(to.path)) {
    next("/login");
  } else if (store.getters.isLoggedIn && publicRoutes.includes(to.path)) {
    next("/");
  }
  next();
});


export default router
