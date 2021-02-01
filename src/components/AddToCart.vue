<template>
    <div class="hello">
        <button class="btn btn-primary" @click="addToCart()">Add to cart </button>
    </div>
</template>
<script>
import $ from 'jquery'

export default {
    name:"add-to-cart",
    props:{
        name: String,
        price:String,
        ProductId:String,
        productImage:String,
      
    },
    data(){
        return{
            item:{
                productName:this.name,
                productPrice:this.price,
                product_id:this.ProductId,
                product_image:this.productImage,
                productQuantity: 1,
            }
        }
    },
    methods:{
        addToCart(){
            $("#miniCart").modal('show');
            this.$store.commit('addToCart',this.item)
        }
    }
}
</script>
