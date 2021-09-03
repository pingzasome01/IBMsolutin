<template>
  <div class="images">
    <div class="container-fluid ce">
      <div class="row">
        <div class="col  ">
          <input 
            class="sizeim"
            type="file"
            accept=".csv, .xlsx"
            @change="previewFiles"
            multiple
          />
          <div  class="col mt-3 bd ">
            <b-table striped hover :items="data"></b-table>
          </div>
        </div>
        <div class="row-6  ">
          <div class="col sizeex mt-3">
            <b-button variant="danger"  @click="onExport">export xslx</b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import XLSX from "xlsx"; // import xlsx

export default {
  data() {
    return {
      data: [],
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
.images {
  background-color: rgb(230, 215, 215);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: scroll;
  
}
.ce {
  margin-top: 5%;
}
.sizeex {
  margin-left: 50%;
  position: sticky;
  top: -50px;
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
</style>