<template>
  <div class="">
          <div class="page-wrapper default-theme sidebar-bg bg1 toggled">
        <nav id="sidebar" class="sidebar-wrapper">
            <div class="sidebar-content">
                <!-- sidebar-brand  -->
                <div class="sidebar-item sidebar-brand">
                    <a href="#">pro sidebar</a>
                </div>
                <!-- sidebar-header  -->
                <div class="sidebar-item sidebar-header d-flex flex-nowrap">
                    <div class="user-pic">
                        <img class="img-responsive img-rounded" src="img/user.jpg" alt="User picture">
                    </div>
                    <div class="user-info">
                        <span class="user-name">Jhon
                            <strong>Smith</strong>
                        </span>
                        <span class="user-role">{{this.email}}</span>
                        <span class="user-status">
                            <i class="fa fa-circle"></i>
                            <span>Online</span>
                        </span>
                    </div>
                </div>
                <!-- sidebar-search  -->
                <div class="sidebar-item sidebar-search">
                    <div>
                        <div class="input-group">
                            <input type="text" class="form-control search-menu" placeholder="Search...">
                            <div class="input-group-append">
                                <span class="input-group-text">
                                    <i class="fa fa-search" aria-hidden="true"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- sidebar-menu  -->
                <div class=" sidebar-item sidebar-menu">
                    <ul>
                        <li class="header-menu">
                            <span>General</span>
                        </li>
                      
                        <li class="sidebar-dropdown">
                            <router-link to="/admin/overview">
                                <i class="fa fa-shopping-cart"></i>
                                <span class="menu-text">Overview</span>
                                <span class="badge badge-pill badge-danger">3</span>
                            </router-link>
                            <div class="sidebar-submenu">
                                <ul>
                                    <li>
                                        <a href="#">Products

                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">Orders</a>
                                    </li>
                                    <li>
                                        <a href="#">Credit cart</a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                          <li class="sidebar-dropdown">
                            <router-link to="/admin/product">
                                <i class="fa fa-shopping-cart"></i>
                                <span class="menu-text">Products</span>
                                <span class="badge badge-pill badge-danger">3</span>
                            </router-link>
                          </li>
                          <li class="sidebar-dropdown">
                            <router-link to="/admin/profile">
                                <i class="fa fa-shopping-cart"></i>
                                <span class="menu-text">Profile</span>
                                <span class="badge badge-pill badge-danger">3</span>
                            </router-link>
                          </li>
                          <li class="sidebar-dropdown">
                            <router-link to="/admin/order">
                                <i class="fa fa-shopping-cart"></i>
                                <span class="menu-text">Orders</span>
                                <span class="badge badge-pill badge-danger">3</span>
                            </router-link>
                          </li>
                          <li class="sidebar-dropdown">
                            <a href="#" @click="logout">
                                <i class="fa fa-power-off"></i>
                                <span class="menu-text">Logout</span>
                            </a>
                          </li>
                        
                       
                    </ul>
                </div>
                <!-- sidebar-menu  -->
            </div>
            <!-- sidebar-footer  -->
           
        </nav>
        <!-- page-content  -->
        <main class="page-content pt-2">
             <router-view />
        </main>
        <!-- page-content" -->
    </div>
    <!-- page-wrapper -->    
  </div>
</template>

<script>
import {fb} from '../firebase'
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Admin",
  email:null,
  components: {
   // HelloWorld
  },
  methods:{
      logout(){
          console.log("here")
          fb.auth().signOut()
            .then(()=>{
                this.$router.replace('/');
            })
            .catch((err)=>{
                console.log(err)
            })
      }
  },
  created() {
      var user = fb.auth().currentUser;
      this.email = user.email;
  },
};
</script>
