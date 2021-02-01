<template>
  <div class="">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
     <!-- <button class="btn btn-primary">hello</button> -->
     <!-- <Navbar></Navbar> -->
     <Navbar></Navbar>
     <Hero> </Hero>
     <Product></Product>
     <Login/>
     <mini-cart></mini-cart>
  </div>

</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";
import Login from "../components/Login.vue"
import { mapGetters } from 'vuex'
import MiniCart from '../components/MiniCart.vue';
export default {
  name: "Home",
  components: {
   // HelloWorld
   Login,
    MiniCart
  },
  computed: {
     ...mapGetters([
       'carts'
      // ...
    ])
  }
};
</script>
