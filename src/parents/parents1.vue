<template>
  <div class="container-fluid" >
    <div class="row">
      <div class="col p-0">
        <TopsideBar />

      </div>
    </div>
    <div class="row">
      <div class="col-2">
          <SideBar/>
      </div>
      <div class="col-10">
          <router-view/>
      </div>
    </div>
    <div class="row">
        <div class="col">
            <Footer/>
        </div>
    </div>  
  </div>
</template>

<script>
import TopsideBar from '../components/TopsideBar';
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";
export default {
  components: { SideBar,TopsideBar,Footer }
  };
</script>

<style>
</style>