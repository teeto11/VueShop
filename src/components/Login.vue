<template>
    <div class="modal fade" id="login" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel"></h5>
                    <nav>
                        <div class="nav nav-tabs" id="nav-tab" role="tablist">
                            <a class="nav-link active" id="nav-home-tab" data-toggle="tab" href="#login" role="tab" aria-controls="nav-home" aria-selected="true">Login</a>
                            <a class="nav-link" id="nav-profile-tab" data-toggle="tab" href="#register" role="tab" aria-controls="nav-profile" aria-selected="false">Register</a>
                        </div>
                    </nav>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="tab-content" id="nav-tabContent">
                        <div class="tab-pane fade show active" id="login" role="tabpanel" aria-labelledby="nav-home-tab">
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="text" v-model="email" class="form-control" placeholder="email"/>
                            </div>
                            <div class="form-group">
                                <label for="email">Password</label>
                                <input type="password" v-model="password" class="form-control" placeholder="password"/>
                            </div>
                            <div class="form-group">
                                <button class="btn btn-primary" @click="login">login</button>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="register" role="tabpanel" aria-labelledby="nav-profile-tab">
                                <div class="form-group">
                                    <label for="name">Your name</label>
                                    <input type="text"  v-model="name" class="form-control" id="name" placeholder="name" />
                                </div>
                                <div class="form-group">
                                    <label for="email">Email</label>
                                    <input type="text" v-model="email" class="form-control" placeholder="email"/>
                                </div>
                                <div class="form-group">
                                    <label for="email">Password</label>
                                    <input type="password" @keyup="login" v-model="password" class="form-control" placeholder="password"/>
                                </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" @click="register" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
   </div> 
</template>
<script>
import {fb,db} from '../firebase'
import $ from 'jquery'
export default {
    name:"Login",

    data(){
        return{
            name:null,
            email:null,
            password:null,
        }
    },
    methods: {
        login(){
            fb.auth().signInWithEmailAndPassword(this.email, this.password)
                        .then(()=>{
                            $("#login").modal('hide')
                            this.$router.replace('/admin')
                        })
                        .catch(function(error) {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        if (errorCode === 'auth/wrong-password') {
                            alert('Wrong password.');
                        } else {
                            alert(errorMessage);
                        }
                        console.log(error);
                        });
        },
        register(){
           
            fb.auth().createUserWithEmailAndPassword(this.email, this.password)
                .then((user) => {
                    $("#login").modal('hide')
                        db.collection("profiles").doc(user.user.uid).set({
                        name: this.name,
                    })
                    .then(function() {
                        console.log("Document successfully written!");
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                    });
                    this.$router.replace('admin')
            
                })
                .catch(function(error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if(errorCode == 'auth/weak-password'){
                        alert("the password is too weak")
                    }else{
                        alert(errorMessage)
                    }
               });
        }
    },
}

</script>
<style scoped>

</style>