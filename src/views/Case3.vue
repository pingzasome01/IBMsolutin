<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <input
          placeholder="Excel Only"
          type="file"
          id="fileElem"
          multiple
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          style="display: none"
        />
        <button id="fileSelect">can only select Excel files</button>
      </div>
    </div>
  </div>
</template>

<script>
// https://stackoverflow.com/questions/11832930/html-input-file-accept-attribute-file-type-csv

const log = console.log;

const file = document.querySelector(`[id="fileElem"]`);

file.addEventListener(
  `change`,
  () => {
    const blob = file.files[0];
    const { name, type, size } = blob;
    log(`blob`, blob);
    // type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    // if (!name.includes(`.xls`) || !name.includes(`.csv`)) {
    //   this.$message({
    //     message: `not excel!`,
    //     type: 'error'
    //   });
    // } else {
    //   this.previewFile(box);
    // }
  },
  false
);

const fileSelect = document.getElementById("fileSelect");

fileSelect.addEventListener(
  "click",
  function (e) {
    if (fileElem) {
      fileElem.click();
    }
  },
  false
);

export default {};
</script>

<style>
button {
  padding: 5px;
}
</style>