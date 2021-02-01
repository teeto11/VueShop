<template>
    <div>
        <h3>Profile Page</h3>
        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
                <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Profile</a>
            </li>
            <li class="nav-item" role="presentation">
                <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Account settings</a>
            </li>
        </ul>
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                <div class="containter">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <input type="text" placeholder="fullname" v-model="profile.name" class="form-control">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <input type="text" placeholder="phone" v-model="profile.phone" class="form-control">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <input type="text" placeholder="address" v-model="profile.address" class="form-control">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <input type="text" placeholder="postcode" v-model="profile.postcode" class="form-control">
                            </div>
                        </div>
                         <div class="col-md-8">
                              <button type="button" @click="updateProfile()" class="btn btn-primary pull-left">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <input type="text" placeholder="username" v-model="profile.username" class="form-control">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <input type="text" placeholder="email" v-model="profile.email" class="form-control">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <input type="text" placeholder="password" v-model="profile.password" class="form-control">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <input type="text" placeholder="photo" v-model="profile.photo" class="form-control">
                        </div>
                    </div>
                </div>
                <div class="row">
                     <button type="button" @click="addProduct()" class="btn btn-primary">Save changes</button>
                      <button type="button" @click="resetPassword()" class="btn btn-primary">Reset password</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {db,fb} from '../firebase';
import Swal from 'sweetalert2'
export default {
    name:"Profile",
    data(){
        return{
            profile:{
                name:null,
                phone:null,
                address:null,
                postcode:null,
            }
        }
    },
    firestore(){
        var user = fb.auth().currentUser;
        return{
            profile: db.collection('profiles').doc(user.uid),
        }
    },
    methods:{
        resetPassword(){
            var auth = fb.auth();
            //console.log(auth.email)
           // var emailAddress = "user@example.com";
            auth.sendPasswordResetEmail(auth.currentUser.email).then(() => {
            // Email sent.
            console.log("sent")
            }).catch((error) => {
                console.log(error)
            // An error happened.
            });
        },
        updateProfile(){
            var user = fb.auth().currentUser;
            console.log(user.uid);
             this.$firestore.profile.update(this.profile)
             
              Swal.fire(
                        'Updated!',
                        'Your file has been updated.',
                        'success'
                        )
        }
    },
}
</script>