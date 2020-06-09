import Vue from "vue";
import VueRouter from "vue-router";
import LoginComponent from "../components/Login";
import ProductsComponent from "../components/Products";
import store from "../store";

Vue.use(VueRouter);

// const ifNotAuthenticated = (to, from, next) => {
//   if (!store.getters.isLoggedIn) {
//     next();
//     return;
//   }
//   next("/");
// };

// const ifAuthenticated = (to, from, next) => {
//   if (store.getters.isLoggedIn) {
//     next();
//     return;
//   }
//   next("/login");
// };

const routes = [
  {
    path: "/",
    name: "home",
    redirect: () => {
      return "/login";
    },
  },
  {
    path: "/login",
    name: "login",
    component: LoginComponent,
    // beforeEnter: ifNotAuthenticated,
  },
  {
    path: "/products",
    name: "products",
    component: ProductsComponent,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

export default router;
