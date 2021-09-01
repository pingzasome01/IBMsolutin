
<template >
<div class="bgn">
  <div class="container cd  ">
    <div class="row mrr ">
      <div class="col-4 mm">
        <div>
          <div class="card">
            <div class="imgBx">
              <img
                src="https://scontent.fbkk12-4.fna.fbcdn.net/v/t1.15752-9/101680796_1499569420224557_2621861067856281600_n.png?_nc_cat=103&ccb=1-5&_nc_sid=ae9488&_nc_eui2=AeHtO1WdRYsd2iaWf3fkv8HhMird5CIRpDQyKt3kIhGkNEaG415mEgKUGzTK3QfXlhStb8ASdEjNsjgtYExB5JB-&_nc_ohc=keaghrsiU8kAX-EprWU&_nc_ht=scontent.fbkk12-4.fna&oh=c85cc0d8bac99bddc0a4dfe91772cf68&oe=6149D059"
              />
            </div>
            <div class="contentBx">
              <h2>Revalidation</h2>
              <div>
                <b-button class="sty" variant="danger">Confirm</b-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-4 ">
        <div class="con1">
          <div class="card">
            <div class="imgBx">
              <img src="https://scontent.fbkk12-1.fna.fbcdn.net/v/t1.15752-9/233199217_519293889134351_5020423556649271213_n.png?_nc_cat=101&ccb=1-5&_nc_sid=ae9488&_nc_eui2=AeGfm4qFLZRoiDd-yM8BID9zSCVorxRPbCVIJWivFE9sJZ7z8sjW9jPlSAAxfbJ_uGcga3qzEiQu0Gp2O7SsckNm&_nc_ohc=1lzHJ7I7cuwAX9kmxaP&_nc_ht=scontent.fbkk12-1.fna&oh=a1e6a83113b5a5bc816fe9240f2c76d5&oe=61490E03" />
            </div>
            <div class="contentBx">
              <h2>Revalidation</h2>
              <div>
                <b-button class="sty" variant="danger">Confirm</b-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-4 ">
        <div class="con2">
          <div class="card">
            <div class="imgBx">
              <img src="https://scontent.fbkk12-4.fna.fbcdn.net/v/t1.15752-9/232396322_556794455360128_5305406743846540393_n.png?_nc_cat=103&ccb=1-5&_nc_sid=ae9488&_nc_eui2=AeFljPTnXONLxVHALmzEPJaFpFYlAfzh9lekViUB_OH2V7utZYnCW8p3X3eZ0msMz-m2B3H6mgl_9xeRfkL0dO0u&_nc_ohc=O0G55xM88S4AX_hIQTb&_nc_ht=scontent.fbkk12-4.fna&oh=9d05fff911ffd5098597699d797d7e3d&oe=61481288" />
            </div>
            <div class="contentBx">
              <h2>Revalidation</h2>
              <div>
                <b-button class="sty" variant="danger">Confirm</b-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

* {
  font-family: "Poppins", sans-serif;
}


body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #131313;
}

.container {
  position: relative;
  
 
}

.container .card {
  position: relative;
  width: 320px;
  height: 450px;
  background: #232323;
  border-radius: 30px;
  overflow: hidden;
}

.container .card:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 150%;
  height: 50%;
  background: #00eaffbe;
  clip-path: circle(150px at 80% 20%);
  transition: 0.5s ease-in-out;
}

.container .card:hover:before {
  clip-path: circle(300px at 80% -20%);
}

.container .card:after {
  content: "RCP";
  position: absolute;
  top: 30%;
  left: 11%;
  font-size: 8em;
  font-weight: 800;
  font-style: italic;
  color: rgba(71, 75, 74, 0.541);
}
/* จุดรูป */
.container .card .imgBx {
  position: absolute;
  top:45%;
  transform: translateY(-50%);
  z-index: 10000;
  width: 100%;
  height: 220px;
  transition: 0.5s;
}

.container .card:hover .imgBx {
  top: 0%;
  transform: translateY(0%);
}
/* ขนาดรูป */
.container .card .imgBx img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-25deg);
  width: 150px;
}
/* ตัวอักษร */
.container .card .contentBx {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100px;
  text-align: center;
  transition: 1s;
  z-index: 10;
}

.container .card:hover .contentBx {
  height: 210px;
}

.container .card .contentBx h2 {
  position: relative;
  font-weight: 900;
  letter-spacing: 1px;
  color: rgb(0, 247, 255);
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}

.container .card .contentBx .size,
.container .card .contentBx .color {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 20px;
  transition: 0.5s;
  opacity: 0;
  visibility: hidden;
  padding-top: 0;
  padding-bottom: 0;
}

.container .card:hover .contentBx .size {
  opacity: 1;
  visibility: visible;
  transition-delay: 0.5s;
}

.container .card:hover .contentBx .color {
  opacity: 1;
  visibility: visible;
  transition-delay: 0.6s;
}

.container .card .contentBx .size h3,
.container .card .contentBx .color h3 {
  color: rgb(255, 255, 255);
  font-weight: 300;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-right: 10px;
}

.container .card .contentBx .size span {
  width: 26px;
  height: 26px;
  text-align: center;
  line-height: 26px;
  font-size: 14px;
  display: inline-block;
  color: #111;
  background: rgb(255, 255, 255);
  margin: 0 5px;
  transition: 0.5s;
  color: #111;
  border-radius: 4px;
  cursor: pointer;
}

.container .card .contentBx .size span:hover {
  background: #00ff15;
}

.container .card .contentBx .color span {
  width: 20px;
  height: 20px;
  background: #ff0;
  border-radius: 50%;
  margin: 0 5px;
  cursor: pointer;
}

.container .card .contentBx .color span:nth-child(2) {
  background: #09ff00;
}

.container .card .contentBx .color span:nth-child(3) {
  background: #03a9f4;
}

.container .card .contentBx .color span:nth-child(4) {
  background: #e91e63;
}

.container .card .contentBx a {
  display: inline-block;
  padding: 10px 20px;
  background: #fff;
  border-radius: 4px;
  margin-top: 10px;
  text-decoration: none;
  font-weight: 600;
  color: #111;
  opacity: 0;
  transform: translateY(50px);
  transition: 0.5s;
  margin-top: 0;
}

.container .card:hover .contentBx a {
  opacity: 1;
  transform: translateY(0px);
  transition-delay: 0.75s;
}
.sty {
  margin-top: 22%;
  background-color: teal;
  height: 6vh;
  width: 70%;
}
.con1 .card:after {
  content: "QIR";
  position: absolute;
  top: 30%;
  left: 12%;
  font-size: 8em;
  font-weight: 800;
  font-style: italic;
  color: rgba(71, 75, 74, 0.541);
}
.con2 .card:after {
  content: "GAC";
  position: absolute;
  top: 30%;
  left: 4%;
  font-size: 8em;
  font-weight: 800;
  font-style: italic;
  color: rgba(71, 75, 74, 0.541);
}
.image{
  background-color:darkslategrey;
  min-width:1920px;
  height: 100vh;
}
.bgn{
    background-color: rgb(230, 228, 228);
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
.cd{
  margin-top: 270px;
}

</style>