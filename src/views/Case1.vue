<template>
  <div class="container-fluid bg ">
      <div class="row">
          <div class="nav">

          </div>
          <div class="col ">
              <h1 class=" mf" >IBM solution delivery </h1>
              <p class="fr"> Revalidation </p>
              <b-button pill class="mb" size="lg" variant="danger">Go To Revalidation</b-button>
          
          </div>
      </div>
  </div>
</template>

<script>

export default {

}
</script>

<style>
.bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
   
    background-size: cover;
    background-color: rgb(230, 228, 228);
    
  }
  .bgr{
      background-color: rgb(183, 145, 216);
      width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  border-bottom: 1px solid rgba(82, 40, 40, 0.521);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
}
.mb{
   margin-top: 5%;
   margin-left: 44%;
  
}
.mf{
   margin-top: 20%;
   margin-left: 28%;
   font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
   font-size:100px;
  
}
.fr{
    margin-left: 815px;
    font-size: 40px;
    font-family:inherit ;
}



</style>