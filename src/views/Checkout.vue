<template>
    <div>
        <Navbar/>
        <div class="container  mt-5 pt-5">
            <div class="row">
                <div class="col-md-9">
                    <h4 class="py-4">Checkout Page</h4>
                    <ul v-for="cart in this.$store.getters.carts" :key="cart.productName">
                        <li>{{cart.productName}}
                             <span class="float-right" @click="$store.commit('removeItem',cart)"> X</span>
                        </li>
                        <li v-if="cart.product_image">
                            <img :src="cart.product_image" class="card-img-top" alt="nothing" width="80px">                        
                        </li>    
                        <li>{{cart.productPrice | currency }}</li>
                        <li>Quantity: {{ cart.productQuantity }}</li>
                        <li>Price: {{cart.price}}</li>
                    </ul>
                </div>
                <div class="col-md-3">
                    Total price
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Navbar from '../components/Navbar.vue'
export default {
  components: { Navbar },
    data(){
        return{

        }
    }
}
</script>