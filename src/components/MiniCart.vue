<template>
    
<div>
    <div class="modal fade" id="miniCart" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <ul v-for="cart in carts" :key="cart.productName">
                    <span class="float-right" @click="$store.commit('removeItem',cart)"> X</span>
                  <li>{{cart.productName}}</li>
                   <li v-if="cart.product_image">
                        <img :src="cart.product_image" class="card-img-top" alt="nothing" width="80px">                        
                   </li>    
                    <li>{{cart.productPrice | currency }}</li>
                     <li>Quantity: {{ cart.productQuantity }}</li>
                     <li>Price: {{cart.price}}</li>
                </ul>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Continue shopping</button>
                <button type="button" class="btn btn-primary" @click="checkout">Checkout</button>
              </div>
            </div>
          </div>
      </div>
</div>

</template>


<script>
import { mapGetters } from 'vuex'
import $ from 'jquery'
export default {
    name:"MiniCart",
    data(){
        return{

        }
    },
    methods:{
        checkout(){
              $("#miniCart").modal('hide');
              this.$router.push('/checkout');
        }
    },
    computed: {
     ...mapGetters([
       'carts'
      // ...
    ])
  }
}
</script>