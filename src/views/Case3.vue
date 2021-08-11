<template>
  <div class="contenier mt-5">
    <div class="row offset-4 ">
      <div class="col-4  ">
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <b-form-group   
            id="input-group-1"
            label="Email address:"
            label-for="input-1"
           
          >
            <b-form-input
              id="input-1"
              v-model="form.email"
              type="email"
              placeholder="Enter email"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Your Name:"
            label-for="input-2"
          >
            <b-form-input
              id="input-2"
              v-model="form.name"
              placeholder="Enter name"
              required
            ></b-form-input>
          </b-form-group>
          
          <div class="row mt-4 ">
            <div class="col-5">
            <b-button class="ml-4"  variant="primary">Submit</b-button>                   
              </div>
            <div class="col-5">
            <b-button  variant="danger">Reset</b-button>
             </div>
          
          </div>    
          
        
          
          
        </b-form>
      
      
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: "",
        name: "",
        food: null,
        checked: [],
      },
      foods: [
        { text: "Select One", value: null },
        "Carrots",
        "Beans",
        "Tomatoes",
        "Corn",
      ],
      show: true,
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      this.form.food = null;
      this.form.checked = [];
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>

<style>


</style>