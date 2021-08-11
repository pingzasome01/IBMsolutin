<template>
  <div id="app">
   <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  mounted(){
    this.$router.push({path:'/case3'} )
    
    
  }
  
}
</script>

<style>

</style>
