<template>
  <div class="container">
      <div class="rol">
          <div class="col">
              <h1 class="a" href="" target="_blank">ComingSoon. . .</h1>
          </div>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
@keyframes tipsy {
  0% {
    transform: translateX(-50%) translateY(-50%) rotate(0deg);
  }
  100% {
    transform: translateX(-50%) translateY(-50%) rotate(360deg);
  }
}

.a {
  font-family: helvetica, arial, sans-serif;
  
}

.a {
  color: #000000;
  text-shadow: 0 20px 25px #f0aa69, 0 40px 60px #908c85;
  font-size: 80px;
  font-weight: bold;
  text-decoration: none;
  letter-spacing: 1px;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}

.a:before,
.a:after {
  content: '';
  padding: .9em .4em;
  position: absolute;
  left: 50%;
  width: 100%;
  top: 50%;
  display: block;
  border: 10px solid red;
  transform: translateX(-50%) translateY(-50%) rotate(0deg);
  animation: 10s infinite alternate ease-in-out tipsy;
}

.a:before {
  border-color: #d9524a #d9524a rgba(0, 0, 0, 0) rgba(0, 0, 0, 0);
  z-index: -1;
}

.a:after {
  border-color: rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) #d9524a #d9524a;
  box-shadow: 25px 25px 25px rgba(46, 46, 49, .8);
}
</style>