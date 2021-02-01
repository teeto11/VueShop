<template>
  <div class="products" id="products">
      <div class="container">
          <h1 class="text-center p-5">Our Products</h1>
          <div class="row">
              
              <div class="col-md-4" v-for="(product,index) in products" :key="index.id">
                  <div class="card product-item">
                      <carousel :perPage="1">
                        <slide v-for="(image,index) in product.images" :key="index">
                           <img :src="image" class="card-img-top" width="250px"/>
                        </slide>
                        </carousel>
                        <img src="/img/products/product1.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                            <div class="d-flex justify-content-between">
                                <h5 class="card-title">{{product.name}}</h5>
                                 <h5 class="card-title">{{product.price | currency }}</h5>
                                <!-- <p class="card-text" v-html="product.description"></p> -->
                            </div>
                              <!-- {{product.description}} -->
                            <!-- <a href="#" class="btn btn-primary">Add to Cart</a> -->
                            <AddToCart 
                            :product-id="product.id"
                             :price="product.price" 
                             :product-image="getImage(product.images)"
                             :name="product.name"></AddToCart>
                        </div>
                    </div>
              </div>
          </div>
      </div>
    
  </div>
</template>

<script>
import {db} from '../firebase';
export default {
  name: "Product",
  props: {
    msg: String
  },
  data(){
      return{
            products:[],
      }
  },

  firestore(){
        return{
                products: db.collection('products'),
        }
    },
    methods:{
        getImage(images){
            if(images){
                return images[0]
            }
            //images ? images[0] : "nothing";
        },
        
    }


};


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .products{
        margin-top: 7rem;
        background: #f2f2f2;
        padding-bottom: 3rem;
    }
</style>