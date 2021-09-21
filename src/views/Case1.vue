<template>
  <div class="container-fluid bg">
    <div class="row">
      <div class="col naec bg-image" style=" background-image: url('https://scontent.fbkk12-4.fna.fbcdn.net/v/t1.15752-9/242116394_151111890502955_5767994187639136339_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=ae9488&_nc_eui2=AeEr9-9KzKtmUicZDAZLya8B5_w-Vyyb84zn_D5XLJvzjPdND2Fvq9Rr6z9z0mVjIoZKpu0Dygegm2lRIxkz7zOT&_nc_ohc=Xg0WOSKQTu8AX9HefYE&tn=AgHGwl9uSJH1NFd_&_nc_ht=scontent.fbkk12-4.fna&oh=0885a55214c51cfee21fc3c07ff94da2&oe=616741A6'); height: 100vh;">
          <h1 class="mf">IBM solution delivery.</h1>
          <p class="fr">Revalidation</p>
          <router-link to="/Case0">
          <div class="col text-center">
            <b-button pill class="mb" size="lg" variant="danger"
              >Go To Revalidation</b-button
            >
          </div>
          </router-link>
        </div>
      </div>
    </div>
  
</template>

<script>
export default {};
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
.bgr {
  background-color: rgb(183, 145, 216);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.naec {
  margin: center;
}
.mb {
  margin-top: 5%;
  
}
.mf {
  margin-top: 20%;
  text-align: center;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold",sans-serif;
  text-transform: uppercase;
  font-size: 5em;
  letter-spacing:10px;
  background: linear-gradient(90deg, rgb(0, 0, 0),rgb(0, 0, 0),rgb(143, 143, 143),rgb(0, 0, 0), rgb(0, 0, 0), #000);
  background-size: 80%;
  animation: animate 30s  infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: rgba(3, 3, 3, 0);
}
@keyframes animate {
  0% {
    background-position: -500%;
  }
  100% {
    background-position: 500%;
  }
}
.fr {
  font-size: 30px;
  font-family: sans-serif;
  text-align: center;
}

/* .im{
  background-image: url("im2jpeg");
} */
</style>