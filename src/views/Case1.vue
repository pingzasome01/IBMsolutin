<template>
  <div class="container-fluid bg">
    <div class="row">
      <div class="col naec bg-image" style=" background-image: url('https://scontent.fbkk12-4.fna.fbcdn.net/v/t1.15752-9/242116394_151111890502955_5767994187639136339_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=ae9488&_nc_eui2=AeEr9-9KzKtmUicZDAZLya8B5_w-Vyyb84zn_D5XLJvzjPdND2Fvq9Rr6z9z0mVjIoZKpu0Dygegm2lRIxkz7zOT&_nc_ohc=Xg0WOSKQTu8AX9HefYE&tn=AgHGwl9uSJH1NFd_&_nc_ht=scontent.fbkk12-4.fna&oh=0885a55214c51cfee21fc3c07ff94da2&oe=616741A6'); height: 100vh;">
         
         <img class="kynn kyndrylll " src="https://www.kyndryl.com/content/experience-fragments/kyndrylprogram/us/en/sites/header/master/_jcr_content/root/header_copy/image.coreimg.svg/1629428076443/kyndryl-logo.svg">
         <h2 class="kynn revalidation text-center">Revalidation</h2>
          
          <router-link to="/Case0">
          <div class="col text-center">
            <b-button pill class="mb " size="lg" variant="dark"
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
.revalidation{
  margin-left: 0%;
}
.kynn {
  position: relative;
  animation-name: example;
  animation-duration: 4s;  
  animation-delay: 2s;
  animation-fill-mode:forwards;
}

@keyframes example {
  from {top: 0px;}
  to {top: 100px;}
}
.kyndrylll{
  margin-top: 12%;
  height: 8vw;
  margin-left: 37%; 
}
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
  margin-top: 12%;
  
}
/* .mf {
  margin-top: 20%;
  text-align: center;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold",sans-serif;
  text-transform: uppercase;
  font-size: 5em;
  letter-spacing:10px;
  background: linear-gradient(90deg, rgb(226, 90, 11),rgb(226, 90, 11),rgb(226, 90, 11),rgb(255, 252, 252), rgb(226, 90, 11), rgb(226, 90, 11));
  background-size: 80%;
  animation: animate 30s  infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: rgba(3, 3, 3, 0);
} */
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