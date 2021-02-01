<template>
    <div>
    
        <div class="col-md-6">
            <h3>Product Page</h3>
            <button @click="addNew()" class="btn btn-primary float-right">Add Product</button>
        </div>
        <!-- <div class="product-test container">
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <input type="text" placeholder="product name" v-model="product.name" class="form-control">
                    </div>
                    <div class="form-group">
                        <input type="text" placeholder="product price" v-model="product.price" class="form-control">
                    </div>
                    <div class="form-group">
                        <button @click="saveData" class="btn btn-primary">Save Data</button>
                    </div>
                </div>
            </div>
        </div> -->
        <hr/>
        <h3 class="d-inline-block">Product list</h3>
        <div class="table-responsive">
           <table class="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Modify</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in products" :key="product.name">
                        <td>{{product.name}}</td>
                        <td>{{product.price}}</td>
                        <td>
                            <button @click="edit(product)" class="btn btn-primary">Edit</button>
                            <button @click="deleteProduct(product)" class="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="modal fade" id="product" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <input type="text" placeholder="product name" v-model="product.name" class="form-control">
                                </div>
                                <div class="form-group">
                                    <input type="text" placeholder="product price" v-model="product.price" class="form-control">
                                </div>
                                <div class="form-group">
                                    <input type="text" @keyup.188="addTag" v-model="tag" class="form-control">
                                    <div class="d-flex">
                                        <p v-for="tag in product.tags" :key="tag">
                                          <span class="p-1">{{tag}}</span>
                                        </p>
                                    </div>
                                </div>

                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <vue-editor v-model="product.description"></vue-editor>
                                    <!-- <textarea class="form-control" v-model="product.description">product description</textarea> -->
                                </div>
                                <div class="form-group">
                                    <input type="file" @change="uploadFile" :src="product.image"/>
                                </div>
                            </div>
                            <div class="form-group d-flex">
                                <div class="p-1" v-for="(image,index) in product.images" :key="image">
                                    <div class="img-wrapp">
                                        <img :src="image" alt="" width="80px" />
                                        <span class="delete-img" @click="deleteImage(image,index)">X</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" @click="addProduct()" class="btn btn-primary" v-if="modal=='new'">Save changes</button>
                         <button type="button" @click="updateProduct()" class="btn btn-primary" v-if="modal=='edit'">Update Product</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { VueEditor } from "vue2-editor";
import {db,fb} from '../firebase';
import $ from 'jquery'
import Swal from 'sweetalert2'
export default {
 name:"Product",
 components: {
    VueEditor
  },
    data(){
        return{
            products:[],
            product:{
                name: null,
                price: null,
                tags: [],
                images:[],
                description:null,
            },
            activeItem: null,
             modal:null,
             tag:null,
        }
    },
    firestore(){
        return{
                products: db.collection('products'),
        }
    },
    methods:{
        deleteImage(img,index){
            let image = fb.storage().refformURL(img);
            this.product.images.splice(index,1);
            image.delete().then(()=>{
                console.log("image deleted")
            }).catch(() =>{
                console.log("error")
            })
        },
        uploadFile(e){
            if(e.target.files[0]){
                let file = e.target.files[0];
                var storageRef = fb.storage().ref('products/'+file.name+'4949203');
                let uploadTask = storageRef.put(file)
                uploadTask.on('state_changed', // or 'state_changed'
                (snapshot) => {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                    case storageRef.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case storageRef.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                    }
                }, 
                (error) => {
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    // ...

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                    }
                }, 
                () => {
                    // Upload completed successfully, now we can get the download URL
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    this.product.images.push(downloadURL)
                    console.log(this.product.images);
                    });
                }
                );
            
            }
        },
        addTag(){
            this.product.tags.push(this.tag)
            this.tag = ''

        },
        addNew(){
             this.modal = "new";
             $("#product").modal('show');
            console.log("here")
        },
        // watcher(){
        // // db.collection("products").doc(this.products)
        // //     .onSnapshot((doc)=>{
        // //         this.product.push(doc)
        // //        // console.log("Current data: ", doc.data());
        // //     });
        //  db.collection("products").onSnapshot((querySnapshot)=>{
        //      this.products = [];
        //      querySnapshot.forEach((doc) =>{
        //          this.products.push(doc);
        //      })
        //  })
        // },
        updateProduct(){
            console.log(this.product.id);
             this.$firestore.products.doc(this.product.id).update(this.product)
              Swal.fire(
                        'Updated!',
                        'Your file has been updated.',
                        'success'
                        )
               //$("#product").modal('hide');
            // var newUpdate = db.collection("products").doc(this.activeItem);
            // // Set the "capital" field of the city 'DC'
            // return newUpdate.update(this.product)
            // .then(()=>{
            //     $("#product").modal('hide');
            //     this.watcher();
            //     console.log("Document successfully updated!");
            // })
            // .catch(function(error) {
            //     // The document probably doesn't exist.
            //     console.error("Error updating document: ", error);
            // });
        },
        edit(product){
            $("#product").modal('show');
            this.modal = "edit";
            this.product = product;
           // this.activeItem = product['.key'];
        },
        deleteProduct(doc){
            // if(confirm("Are you sure?")){
            //     db.collection("products").doc(doc).delete().then(()=>{
            //      console.log("Document successfully deleted!");
            //     }).catch(function(error) {
            //         console.error("Error removing document: ", error);
            //     });
            // }else{
            //    console.log("no");
            // }
                 Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                    }).then((result) => {
                    if (result.isConfirmed) {
                        console.log(doc['.key']);
                        this.$firestore.products.doc(doc.id).delete()
                        Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                        )
                    }
               })
            
        },
        addProduct(){
            // db.collection("products").add(this.product)
            // .then((docRef) => {
            //     console.log("Document written with ID: ", docRef.id);
            //     //this.reset()
            //     this.readData();
            // })
            // .catch(function(error) {
            //     console.error("Error adding document: ", error);
            // });
              
               this.$firestore.products.add(this.product)
               $("#product").modal('hide');

        },
        reset(){
             this.product = {
                name: null,
                price: null,
                tags: [],
                images:[],
                description:null,
            }
           // Object.assign(this.$data,this.$options.data.apply(this))
        },
        readData(){
            //  db.collection("products").get().then((querySnapshot)=>{
            //     querySnapshot.forEach((doc) => {
            //         // doc.data() is never undefined for query doc snapshots
            //         this.products.push(doc);
            //        // console.log(doc.id, " => ", doc.data());
            //     });
            // });
        }
    },
    created() {
           //this.readData()

        },
}

</script>
<style scoped lang="scss">

.img-wrapp{
    position: relative;
}
.img-wrapp span.delete-img{
    position: absolute;
    top: -14px;
    left: 2px;
}
.img-wrapp span.delete-img:hover{
    cursor: pointer;
}

</style>