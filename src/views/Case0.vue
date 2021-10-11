
<template >
<div class="ff">
<div class="bgn">
  <div class="cc cd  ">
    
    <div class="row mrr ">
      <div class="col-4 mm">
        <div class="sl">
          <div class="card">
            <div class="imgBx">
              <img
                src="../assets/pp3.png"
              />
            </div>
            <div>
              <div class="contentBx">
                <h2>Revalidation</h2>
                <router-link to="/csv">
                <b-button  class="lss"  size="lg" variant="danger" > Import</b-button>
                </router-link>
                 <router-link to="/Importuni">
                <b-button  class="lsss"  size="lg" variant="success" > Go </b-button>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div >
      <div class="col-4 ">
        <div class="con1 sll">
          <div class="card">
            <div class="imgBx">
              <img src="../assets/pp2.png" />
            </div>
             <div class="contentBx">
                <h2>Revalidation</h2>
                <router-link to="/csv">
                <b-button  class="lss"  size="lg" variant="danger" > Import</b-button>
                </router-link>
                 <router-link to="/Importuni">
                <b-button  class="lsss"  size="lg" variant="success" > Go </b-button>
                </router-link>
              </div>
          </div>
        </div>
      </div>
      <div class="col-4  ">
        <div class="con2 slll">
          <div class="card">
            <div class="imgBx">
              <img src="../assets/pp1.png" />
            </div>
            <div class="contentBx">
                <h2>Cleansing</h2>
                <router-link to="/Comingsoon">
                <b-button  class="lss"  size="lg" variant="danger" > Import</b-button>
                </router-link>
                <router-link to="/Comingsoon">
                <b-button  class="lsss"  size="lg" variant="success" > Go </b-button>
                </router-link>
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

.lss{
  margin-top: -20%;
  height: 5vh;
  width: 3cm;
  margin-right: 14VH;
}

.lsss{
  margin-top: -210%;
  height: 5vh;
  width: 3cm;
  margin-left: 62%;
}

* {
  font-family: "Poppins", sans-serif;
}

.sl{
  margin-left: 60%;
}
.sll{
  margin-left: 30%;
}
/* .slll{
  margin-left: -30%;
} */
/* .ff{
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #131313;
} */

.cc {
  position: relative;
  
 
}

.cc .card {
  position: relative;
  width: 320px;
  height: 450px;
  background: #232323;
  border-radius: 30px;
  overflow: hidden;
}

.cc .card:before {
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

.cc .card:hover:before {
  clip-path: circle(300px at 80% -20%);
}

.cc .card:after {
  content: "RCP";
  position: absolute;
  top: 30%;
  left: 11%;
  font-size: 8em;
  font-weight: 800;
  font-style: italic;
  color:rgba(255, 249, 249, 0.609);
}
/* จุดรูป */
.cc .card .imgBx {
  position: absolute;
  top:40%;
  transform: translateY(-50%);
  z-index: 10000;
  width: 100%;
  height: 200px;
  transition: 1s;
}

.cc .card:hover .imgBx {
  top: 0%;
  transform: translateY(0%);
}
/* ขนาดรูป */
.cc .card .imgBx img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-25deg);
  width: 150px;
}
/* ตัวอักษร */
.cc .card .contentBx {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100px;
  text-align: center;
  transition: 1s;
  z-index: 10;
}

.cc .card:hover .contentBx {
  height: 160px;
}

.cc .card .contentBx h2 {
  position: relative;
  font-weight: 900;
  letter-spacing: 1px;
  color: rgba(245, 245, 245, 0.815);
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}

.cc .card .contentBx .size,
.cc .card .contentBx .color {
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

.cc .card:hover .contentBx .size {
  opacity: 1;
  visibility: visible;
  transition-delay: 0.5s;
}

.cc .card:hover .contentBx .color {
  opacity: 1;
  visibility: visible;
  transition-delay: 0.6s;
}

.cc .card .contentBx .size h3,
.cc .card .contentBx .color h3 {
  color: rgb(255, 255, 255);
  font-weight: 300;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-right: 10px;
}

.cc .card .contentBx .size span {
  width: 26px;
  height: 26px;
  text-align: center;
  line-height: 26px;
  font-size: 14px;
  display: inline-block;
  color: #111;
  background: rgb(233, 233, 233);
  margin: 0 5px;
  transition: 0.5s;
  color: #111;
  border-radius: 4px;
  cursor: pointer;
}

.cc .card .contentBx .size span:hover {
  background: #00ff15;
}

.cc .card .contentBx .color span {
  width: 20px;
  height: 20px;
  background: #ff0;
  border-radius: 50%;
  margin: 0 5px;
  cursor: pointer;
}

.cc .card .contentBx .color span:nth-child(2) {
  background: #09ff00;
}

.cc .card .contentBx .color span:nth-child(3) {
  background: #03a9f4;
}

.cc .card .contentBx .color span:nth-child(4) {
  background: #e91e63;
}
 /* ซ่อนปุ่ม */
.cc .card .contentBx a {
  display: inline-block;
  padding: 10px 20px;
  border-radius: 4px;
  margin-top: 10px;
  text-decoration: none;
  font-weight: 600;
  color: rgb(255, 255, 255);
  opacity: 0;
  transform: translateY(50px);
  transition: 0.75s;
  margin-top: 50px;
  
}

.cc .card:hover .contentBx a {
  opacity: 1;
  transform: translateY(0px);
  transition-delay: 0.2s;
}
.sty {
  margin-top: 23%;
 
  height: 5.5vh;
  width: 65%;
  
}
.con1 .card:after {
  content: "QIR";
  position: absolute;
  top: 30%;
  left: 12%;
  font-size: 8em;
  font-weight: 800;
  font-style: italic;
  color: rgba(255, 249, 249, 0.609);
}
.con2 .card:after {
  content: "GAC";
  position: absolute;
  top: 30%;
  left: 4%;
  font-size: 8em;
  font-weight: 800;
  font-style: italic;
  color: rgba(255, 249, 249, 0.609);
}
.image{
  background-color:darkslategrey;
  min-width:1920px;
  height: 100vh;
}

.bgn{
    background-image: url('https://scontent.fbkk12-4.fna.fbcdn.net/v/t1.15752-9/242116394_151111890502955_5767994187639136339_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=ae9488&_nc_eui2=AeEr9-9KzKtmUicZDAZLya8B5_w-Vyyb84zn_D5XLJvzjPdND2Fvq9Rr6z9z0mVjIoZKpu0Dygegm2lRIxkz7zOT&_nc_ohc=Xg0WOSKQTu8AX9HefYE&tn=AgHGwl9uSJH1NFd_&_nc_ht=scontent.fbkk12-4.fna&oh=0885a55214c51cfee21fc3c07ff94da2&oe=616741A6');
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left:0;
  }
.cd{
  margin-top: 20vh;
  overflow: hidden;
 
}




</style>