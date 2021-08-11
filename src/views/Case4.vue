<template>
  <div class="container mt-5">
      <div class="row">
          <div class="col-3">
            <div class="row">
                <div class="col">
                    <label > Username </label>
                    <input v-model="username" placeholder="username" class="form-control">
                </div>
            </div>
            <div class="row mt-4  ">
                <div class="col">
                    <label > password </label>
                    <input type="password" v-model="password" placeholder="password" class="form-control">
                </div>
            </div>
            <div class="row mt-3">
                <div class="col">
                        <b-button class="btn-success" variant="success" v-on:click="success" >success</b-button>
                        <b-button class="" variant="danger" v-on:click="reset">resert</b-button>
                </div>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
data() {
    return {
        username: this.username,
        password: this.password
    }
},

methods: {
    success() {
        console.log(this.username);
        console.log(this.password);
    },
    reset() {
        console.log('reset');
        this.username = ''
        this.password = ''
    }
},
}
</script>

<style>
.btn-success {
    margin-right: 1rem;
}
</style>