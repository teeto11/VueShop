import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

let cart = window.localStorage.getItem('cart')

export default new Vuex.Store({
  state: {
   cart: cart ? JSON.parse(cart) : [],
  },
  getters:{
    carts(state){
          return state.cart
    }
  },
  mutations: {
    addToCart(state,item){
      let found = state.cart.find(product => product.product_id == item.product_id )
      if(found){
           found.productQuantity++; 
      }else{
        state.cart.push(item)
      }
      this.commit('saveData')
    },
    saveData(state){
      window.localStorage.setItem('cart',JSON.stringify(state.cart))
    },

    removeItem(state,payload){
       let index = state.cart.indexOf(payload)
       state.cart.splice(index,1)
       this.commit('saveData')
    }

     
  },
  actions: {},
  modules: {}
});
