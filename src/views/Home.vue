<template>
  <div class="container">
    <div class="row">
      <div class="col">
         <img class="kynn kyndrylll " src="https://www.kyndryl.com/content/experience-fragments/kyndrylprogram/us/en/sites/header/master/_jcr_content/root/header_copy/image.coreimg.svg/1629428076443/kyndryl-logo.svg">
         <h2  class="kynn revalidation text-center">Revalidation</h2>
          
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
export default {

}
</script>

<style>
html, body {
  width: 100%;
  height:100%;
}

body {
    background: linear-gradient(-45deg, #ee7652c9, #c3bfc1, #ee7652ce, #23d5ab);
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
}

@keyframes gradient {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
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
.revalidation{
  margin-left: 0%;
  margin-top: 5vh;
}
.kynn {
  position: relative;
  animation-name: example;
  animation-duration: 4s;  
  animation-delay: 1s;
  animation-fill-mode:forwards;
}

@keyframes example {
  from {top: 0px;}
  to {top: 100px;}
}
.kyndrylll{
  margin-top: 17%;
  height: 8vw;
  margin-left: 31%; 
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
  margin-top: 15%;
  
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
</style>