<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <input
          type="file"
          accept=".csv, .xlsx"
          @change="previewFiles"
          multiple
        />
       
        <button @click="onExport">export xslx</button>
      </div>
    </div>
    <div class="row">
        <div class="col">
            <b-table striped hover :items="data"></b-table>
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
    };
  },
  methods: {
    previewFiles(e) {
      const selectedFile = e.target.files[0];
      const fileReader = new FileReader();
      fileReader.readAsBinaryString(selectedFile);
      fileReader.onload = e => {
        let binaryData = e.target.result;
        let workbook = XLSX.read(binaryData, { type: "binary" });
        workbook.SheetNames.forEach(sheet => {
          const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
          this.data = data;
        });
      };
    },
    showData() {
      console.log(this.data);
    },
    onExport() {
      const dataWS = XLSX.utils.json_to_sheet(this.data)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, dataWS)
      XLSX.writeFile(wb,'export.csv')
    },
  }
};
</script>

<style></style>
