<template>
   <div
      class="col ggg bg-image"
      style="
        background-image: url('https://scontent.fbkk12-2.fna.fbcdn.net/v/t1.15752-9/242057289_545162860098447_6344121519166977378_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=ae9488&_nc_eui2=AeFSvZj1zSFfGUwbL5p6JB9W2HePo7Xa64TYd4-jtdrrhAQWauqlkpwzGT-aPbckn41EJ5zn-EcZekKpbohZYkfJ&_nc_ohc=iI0ZZYVaZdkAX-Wqf4-&_nc_ht=scontent.fbkk12-2.fna&oh=3a1e0222bc2255f886fb8bd63bafbe77&oe=61698786');
        height: 100vh;
      "
    >
  <div>
      <topside-bar />

    <div class="container">
      <div class="row ">
        <div class="col ">
          <input
            type="file"
            accept=".csv, .xlsx"
            class="sze"
            @change="previewFiles"
            multiple
          />
          <b-button  variant="success" v-on:click="onBtn">{{ btn }}</b-button>
        </div>
      </div>
      <div class="row" v-if="data != []">
        <div class="col">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th v-for="(key, index) in dataKey" :key="index">{{ key }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(data, index) in datas" :key="index">
                <th
                  v-for="(key, keyIndex) in dataKey"
                  :key="keyIndex"
                  v-on:click="changeValue(key, index)"
                >
                  <span>
                    {{ data[key] }}
                  </span>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="mt-3 fixed-bottom sizeex p-3">
        <div class="col mt-3 cl">
          <b-button variant="danger" @click="onExport">export xslx</b-button>
        </div>
      </div>
      <!-- <div class="row">
        <div class="col"> -->
          <!-- {{dataKey}} -->
        <!-- {{ datas }}
        </div>
      </div> -->
    </div>
  </div>
   </div>
  
</template>

<script>
import XLSX from "xlsx";
import Swal from "sweetalert2";
import TopsideBar from "../components/TopsideBar";
export default {
  components: { TopsideBar },
  Name: "Case8",
  data() {
    return {
      datas: [],
      dataKey: [],
      btn: "edit",
      col: 1,
      isActive: "",
    };
  },
  methods: {
    previewFiles(e) {
      const selectedFile = e.target.files[0];
      const fileReader = new FileReader();
      fileReader.readAsBinaryString(selectedFile);
      fileReader.onload = (e) => {
        let binaryData = e.target.result;
        let workbook = XLSX.read(binaryData, { type: "binary" });
        workbook.SheetNames.forEach((sheet) => {
          const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
          this.datas = data;
          this.getKey();
          console.log(data);
        });
      };
    },
    getKey() {
      var allkey = [];
      for (var i in this.datas) {
        var k = Object.keys(this.datas[i]);
        for (var j in k) {
          if (!allkey.includes(k[j])) {
            allkey.push(k[j]);
          }
        }
      }
      this.dataKey = allkey;
    },
    changeValue(key, index) {
      var a = this.datas[0]["Hello"];
      Swal.fire({
        title: `Change ${key} column`,
        input: "text",
        inputLabel: `from ${this.datas[index][key]}`,
        inputPlaceholder: "Enter your new value",
      }).then((result) => {
        if (key == "Hello" && index == 0) {
          this.datas[index][key] = result.value;
          return;
        }
        if (result.isConfirmed && result.value != "") {
          this.datas[index][key] = result.value;
          this.datas[0]["Hello"] = "";
          this.datas[0]["Hello"] = a;
        }
      });
    },
    onBtn() {
      this.isActive = "disabled";
      this.dataKey.push("new col");
      for (var i in this.datas) {
        var data = this.datas[i];
        if (data["Thank"] != null || data["Question"] != null) {
          if (data[this.dataKey[2]] == data[this.dataKey[3]]) {
            data["new col"] = "true";
          } else {
            data["new col"] = "false";
          }
        }
      }
    },
    onExport() {
      const dataWS = XLSX.utils.json_to_sheet(this.datas);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, dataWS);
      XLSX.writeFile(wb, "export.csv");
    },
  },
};
</script>

<style>
.sze{
  margin-left: 30%;
  margin-top: 10%;
}
.sizeex {
  margin-left: 90%;
}

.sizeex {
  margin-left: 90%;
}

</style>