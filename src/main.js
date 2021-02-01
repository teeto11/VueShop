import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import jQuery from 'jquery';
import {fb} from './firebase';
import VueFirestore from 'vue-firestore'
import Swal from 'sweetalert2'
import Vuex from "vuex";
window.$ = window.jQuery = jQuery;
window.Swal  = Swal;
//Vue.use(VueFirestore);
import VueCarousel from 'vue-carousel';
import Vue2Filters from 'vue2-filters'


Vue.use(VueCarousel);
Vue.use(Vue2Filters)
Vue.use(Vuex);
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})
window.Toast  = Toast;

Vue.use(VueFirestore, {
  key: 'id',         // the name of the property. Default is '.key'.
  enumerable: true  //  whether it is enumerable or not. Default is true.
})

import 'popper.js';
import 'bootstrap';
import './assets/app.scss';
Vue.config.productionTip = false;
Vue.component("Navbar",require('./components/Navbar.vue').default)
Vue.component("Hero",require('./components/Hero.vue').default)
Vue.component("Product",require('./sections/Product.vue').default)
Vue.component("AddToCart",require('./components/AddToCart.vue').default)
Vue.component("MiniCart",require('./components/MiniCart.vue').default)

let app = ''
fb.auth().onAuthStateChanged(function() {
  if (!app) {
    // User is signed in.
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  } else {
    // No user is signed in.
  }
});

 