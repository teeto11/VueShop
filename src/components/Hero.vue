<template>
        <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <h3 class="header">Vue Shop For Developers</h3>
                    <p> Be sure to have your pages set up with the 
                        latest design and development standards. That means using 
                        an HTML5 doctype and including a viewport meta tag for 
                        proper responsive behaviors.
                        Put it all together and your pages should look 
                        like this:
                    </p>
                    <button class="buttons btn btn-primary">Explore</button>
                    <button class="buttons btn btn-success">Products</button>
                </div>
                <div class="col-md-8">
                    <img src="../assets/dangotepasta.jpeg" alt="picture"/>
                </div>
            </div>
        </div>
</template>
<script>
export default {
  name: "Hero",
  props: {
    msg: String
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
 .buttons{
     margin: 10px;
     padding:5px;
     border-radius: 5px;
     border:1px solid white;
 }
</style>
