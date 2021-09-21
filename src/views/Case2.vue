<template>
  <div>
    <div
      class="col ggg bg-image"
      style="
        background-image: url('https://scontent.fbkk12-2.fna.fbcdn.net/v/t1.15752-9/242057289_545162860098447_6344121519166977378_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=ae9488&_nc_eui2=AeFSvZj1zSFfGUwbL5p6JB9W2HePo7Xa64TYd4-jtdrrhAQWauqlkpwzGT-aPbckn41EJ5zn-EcZekKpbohZYkfJ&_nc_ohc=iI0ZZYVaZdkAX-Wqf4-&_nc_ht=scontent.fbkk12-2.fna&oh=3a1e0222bc2255f886fb8bd63bafbe77&oe=61698786');
        height: 100vh;
      "
    >
      <topside-bar />
      <!-- <div>
    <b-navbar type="dark" variant="dark">
            <b-navbar-nav>
              <b-nav-item class="al" href="#">Revalidation</b-nav-item>
            </b-navbar-nav>
          </b-navbar>
        </div>   -->
      <div class="container-fluid ce">
        <div class="row">
          <div class="col bdd">
            <input
              class="sizeim"
              type="file"
              accept=".csv, .xlsx"
              @change="previewFiles"
              multiple
            />
            <div v-if="data" class="col mt-3 bd">
              <b-table striped hover :items="data"></b-table>
            </div>
          </div>
          <div class="row-6 p-3 fixed-bottom">
            <div class="col sizeex mt-3">
              <b-button variant="danger" @click="onExport"
                >export xslx</b-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import XLSX from "xlsx"; // import xlsx
import TopsideBar from "../components/TopsideBar.vue";
export default {
  components: { TopsideBar },
  data() {
    return {
      data: false,
      items: [
        { age: 40, first_name: "Dickerson", last_name: "Macdonald" },
        { age: 21, first_name: "Larsen", last_name: "Shaw" },
        {
          age: 89,
          first_name: "Geneva",
          last_name: "Wilson",
          _rowVariant: "info",
        },
        {
          age: 40,
          first_name: "Thor",
          last_name: "MacDonald",
          _cellVariants: { age: "info", first_name: "warning" },
        },
        { age: 29, first_name: "Dick", last_name: "Dunlap" },
      ],
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
          this.data = data;
          console.log(this.data);
        });
      };
    },
    showData() {
      console.log(this.data);
    },
    onExport() {
      const dataWS = XLSX.utils.json_to_sheet(this.data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, dataWS);
      XLSX.writeFile(wb, "export.csv");
    },
  },
};
</script>

<style>
/* .images {
  background-color: rgb(230, 215, 215);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: scroll;
  
} */
.ce {
  margin-top: 5%;
}
.sizeex {
  margin-left: 90%;
}
.sizeim {
  margin-left: 47%;
}
.bd {
  border: rgb(0, 0, 0);
  border-style: solid;
  margin: auto;
  overflow: scroll;
  border-width: 1px;
}
.ggg {
  
  overflow:auto;
}
</style>