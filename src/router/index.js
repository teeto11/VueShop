import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
// mport Products from "../sections/Product.vue";
import Admin from "../views/Admin.vue";
import Overview from "../views/Overview.vue";
import Product from "../views/Product.vue";
import Order from "../views/Order.vue";
import Profile from '@/views/Profile';
import Checkout from '@/views/Checkout'
import {fb} from '../firebase';
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  }, 
  // {
  //   path: "/products",
  //   name: "Products",
  //   component: Products
  // },
  {
    path: "/checkout",
    name:"checkout",
    component:Checkout,
  }, 
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: { requiresAuth: true },
    children:[
      {
        path: "overview",
        name:"overview",
        component:Overview,
      },
      {
        path: "product",
        name:"product",
        component:Product,
      },
      {
        path: "/profile",
        name:"profile",
        component:Profile,
      },
      {
        path: "/order",
        name:"order",
        component:Order,
      },
      
    ]
  }, 
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// router.beforeEach((to, from, next) => {
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
//   const currentUser = fb.auth().currentUser
//   if(requiresAuth && !currentUser){
//     next('/')
//   }else if(requiresAuth && currentUser){
//       next()
//     }
//    else{
//     next() // make sure to always call next()!
//   }
// })

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!fb.auth().currentUser) {
      next({
        path: '/',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router;
