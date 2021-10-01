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
        <div class="row">
          <div class="col">
            <input
              type="file"
              accept=".csv, .xlsx"
              class="sze"
              @change="previewFiles"
              multiple
            />


          </div>
        </div>
        <div class="row" v-if="!loadingData">
          <div class="col">
                <b-tabs content-class fill>
                    <b-tab v-for="(sheet, index) in datas" :key="index" :title="sheet['sheet']" @click="sheetPreview = index">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th v-for="(key, index) in datas[sheetPreview]['key']" :key = "index">{{key}}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(data, indexData) in datas[sheetPreview]['data']" :key = "indexData">
                                    <th v-for="(key, indexs) in datas[sheetPreview]['key']" :key = "indexs" v-on:click="changeValue(key, indexData)">
                                        <span>
                                            {{data[key]}}
                                        </span>
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </b-tab>
                </b-tabs>
                <!-- {{ datas[0]['data'][1]['CiLifeCycleState'] }} -->
                <!-- {{ datas }} -->
            </div>
        </div>
        <div class="mt-3 fixed-bottom sizeex p-3">
          <div class="col mt-3 cl">
            <b-button variant="danger" @click="onExport">SaveAs</b-button>
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
import FileSaver from 'file-saver';
import XLSX from "xlsx";
import Swal from "sweetalert2";
import TopsideBar from "../components/TopsideBar";
export default {
  components: { TopsideBar },
  Name: "Case8",
  data() {
        return {
            datas: [],
            btn : 'edit',
            col : 1,
            isActive : false,
            sheetPreview : 0,
            loadingData: true
        }
  },
  methods: {
    previewFiles(e) {
            if (!e.target.files[0]) return
            this.datas = []
            for (var i in e.target.files){
                if (i == 'length') break
                const selectedFile = e.target.files[i];
                const fileReader = new FileReader();
                const sheetname = selectedFile['name'].substr(0,selectedFile['name'].length-4)
                fileReader.readAsBinaryString(selectedFile);
                fileReader.onload = e => {
                    let binaryData = e.target.result;
                    let workbook = XLSX.read(binaryData, { type: "binary" });
                    workbook.SheetNames.forEach(sheet => {
                    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
                    var key=[]
                    for(var j in data){
                      key = key.concat(Object.keys(data[j]))
                    }
                    key= [...new Set(key)]
                    // for(var j in data){
                    //   var k = Object.keys(data[j])
                    //   for (var l in k) {
                    //       if (!key.includes(k[l])) {
                    //           key.push(k[l])
                    //       }
                    //   }
                    // }
                    if(sheet=='Sheet1'){this.datas.push({"sheet": sheetname, "data": data, "key":key})}
                    else{this.datas.push({"sheet": sheet, "data": data, "key":key})}
                    });
                };
            }
            setTimeout(() => {
                var selectSheet1 = ['Dummy1', 'GACDW_FIS_OS','GACDW_ICBC_OS']
                // var selectSheet2 = ['Dummy2', 'GACDW_FIS_Subsystem', 'GACDW_ICBC_Subsystem']
                var selectSheet3 = ['Dummy3', 'RCP_FIS', 'RCP_ICBC']
                var selectcolCompare =["Category","Server Name\r\n(Hostname)","IpAddress","Status","CiLifeCycleState","HostName","OsName","OsProvider","Purpose","Device Name"]
                var selectcolSubscribed =["Category","Server Name\r\n(Hostname)","IpAddress","Status","CiLifeCycleState","HostName","OsName","OsProvider","Purpose","Device Name","External Software Products(Version): MSS/MF Products"]
                var Comparecol1 = ["HostName","Device Name"]
                // var Comparecol2 = ["HostName","Device Name"]
                var subscribcol1 = ["OsName","OsProvider","Purpose","External Software Products(Version): MSS/MF Products"]
                this.newworksheet1(selectSheet1,selectSheet3,'CompareDevice',Comparecol1,selectcolCompare)
                this.newworksheet2(selectSheet1,selectSheet3,'OS_Subscribed',subscribcol1,selectcolSubscribed)
                // this.newworksheet2(selectSheet2,selectSheet3,'OS_Subscribed',Comparecol1,Comparecol2,selectcol)
                this.loadingData = false
            }, 100);
        },
        newworksheet1(selectSheet1,selectSheet2,name,Comparecol,selectcol){
                var temp = []
                for (var i in this.datas){
                    if (selectSheet1.includes(this.datas[i]['sheet'])) {
                        temp.push(this.datas[i]['data'])
                    }
                }
                for (var a in this.datas){
                  // External Software Products(Version): MSS/MF Products
                    if (selectSheet2.includes(this.datas[a]['sheet'])) {
                        temp.push(this.datas[a]['data'])
                    }
                }
                // console.log(temp);
                var output = []
                for(var j in temp[temp[0].length > temp[1].length? 0: 1]){
                    if(temp[0][j]!=undefined){
                        if(temp[0][j]['CiLifeCycleState']!="PRODUCTION"){temp[0].splice(j,1)}
                        if(temp[1][j]!=undefined){output.push(this.jsonConcat(temp[0][j], temp[1][j],selectcol))}
                        else{output.push(this.jsonConcat(temp[0][j],[],selectcol))}
                    }
                    else{output.push(this.jsonConcat([], temp[1][j],selectcol))}
                }
                // console.log(output);
                var bin = this.CompareDevice(output,Comparecol)
                // console.log(bin);
                var lastoutput =[]
                for(var k in output){
                    lastoutput.push(this.jsonConcat2(output[k],bin[k]))
                }
                // var key = Object.keys(output[0])
                // this.datas.push({"sheet":name, "data":output, "key":key})
                var key1 = Object.keys(lastoutput[0])
                this.datas.push({"sheet":name, "data":lastoutput, "key":key1})
        },
        newworksheet2(selectSheet1,selectSheet2,name,Comparecol,selectcol){
                var temp = []
                for (var i in this.datas){

                    if (selectSheet1.includes(this.datas[i]['sheet'])) {
                        temp.push(this.datas[i]['data'])
                    }
                }
                for (var a in this.datas){
                    if (selectSheet2.includes(this.datas[a]['sheet'])) {
                        temp.push(this.datas[a]['data'])
                    }
                }
                // console.log(temp);
                // console.log(temp[0][1]["HostName"]);
                var output = []
                for(var j in temp[0]){
                    if(temp[0][j]!=undefined){
                        if(temp[0][j]['CiLifeCycleState']!="PRODUCTION"){temp[0].splice(j,1)}
                        else if(temp[1][j]!=undefined){
                                for(var x in temp[1]){
                                    if(temp[0][j]["HostName"].toLowerCase()==temp[1][x]["Device Name"].toLowerCase()){
                                        output.push(this.jsonConcat(temp[0][j], temp[1][x],selectcol))
                                    }
                                }
                          } else {output.push(this.jsonConcat(temp[0][j],[],selectcol))}
                        
                    }
                }
                // console.log(output);
                var bin = this.CheckSubscribed(output,Comparecol)
                // console.log(bin);
                var lastoutput =[]
                for(var k in output){
                    lastoutput.push(this.jsonConcat2(output[k],bin[k]))
                }
                // var key = Object.keys(output[0])
                // this.datas.push({"sheet":name, "data":output, "key":key})
                var key1 = Object.keys(lastoutput[0])
                this.datas.push({"sheet":name, "data":lastoutput, "key":key1})
        },
        jsonConcat(o1, o2, select) {
            var temp = {}
            for (var key1 in o1) {
                if(!select.includes(key1)) continue
                temp[key1] = o1[key1]
            }
            for (var key2 in o2) {
                var key = key2
                if(!select.includes(key)) continue
                if (key2 in temp) key = key2+'_RCP'
                temp[key] = o2[key2];
            }
            return temp;
        },
        jsonConcat2(o1, o2) {
            var select = ["CiLifeCycleState"]
            var temp = {}
            for (var key1 in o1) {
                if(select.includes(key1)) continue
                temp[key1] = o1[key1]
            }
            for (var key2 in o2) {
                var key = key2
                if(select.includes(key)) continue
                if (key2 in temp) key = key2+'_RCP'
                temp[key] = o2[key2];
            }
            return temp;
        },
        CompareDevice(o1,select) {
            var bin1=[]
            var bin2=[]
            var out = []
            for (var i=0;i < o1.length;i++) {
                if(o1[i][select[1]]!=undefined) bin2.push(o1[i][select[1]].toLowerCase())
                if(o1[i][select[0]]!=undefined) bin1.push(o1[i][select[0]].toLowerCase())
                // console.log(i);
                // console.log(o1[i][select[0]]);
                // console.log(o1[i][select[1]]);
            }
            
            for(var j=0;j<o1.length;j++){
                var temp = {}
                if(bin2.includes(bin1[j])){
                  temp['GACDW-RCP']='Found'
                }else{
                  if(bin1[j]==undefined){
                    temp['GACDW-RCP']=undefined
                  }else{
                    temp['GACDW-RCP']='Not Found'
                  }
                }

                if(bin1.includes(bin2[j])){
                  temp['RCP-GACDW']='Found'
                }else{
                  if(bin2[j]==undefined){
                  temp['RCP-GACDW']=undefined
                  }else{temp['RCP-GACDW']='Not Found'}
                }
                out.push(temp)
            }
            return out;
        },
        CheckSubscribed(o1,select) {
            var bin1=[]
            var bin2=[]
            var bin3=[]
            var bin4=[]
            var out = []
            for (var i=0;i < o1.length;i++) {
                if(o1[i][select[0]]!=undefined) {bin1.push(o1[i][select[0]].toLowerCase())} else {bin1.push(undefined)}
                if(o1[i][select[1]]!=undefined) {bin2.push(o1[i][select[1]].toLowerCase())} else {bin2.push(undefined)}
                if(o1[i][select[2]]!=undefined) {bin3.push(o1[i][select[2]].toLowerCase())} else {bin3.push(undefined)}
                if(o1[i][select[3]]!=undefined) {bin4.push(o1[i][select[3]].toLowerCase())} else {bin4.push(undefined)}
            }
            for(var j=0;j<o1.length;j++){
                var temp = {}
                if(bin4[j]==undefined){
                    temp['Subscription']='Not Subscribed'
                }else if(bin4[j].search(bin1[j])>-1 || bin4[j].search(bin2[j])>-1 || bin4[j].search(bin3[j])>-1){
                    temp['Subscription']='Subscribed'
                }else {
                    temp['Subscription']='Incorrect Subscribed'
                    console.log(bin4[j]);
                }
                out.push(temp)
            }
            return out;
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

    getKey1(data) {
      var allkey = [];
      for (var i in data) {
        var k = Object.keys(data[i]);
        for (var j in k) {
          if (!allkey.includes(k[j])) {
            allkey.push(k[j]);
          }
        }
      }
      return allkey;
    },

    changepage1(newdata,newkey){
      this.datas=newdata;
      this.dataKey=newkey;
      this.datastate="data1";
    },

        changeValue(key, index) {
            Swal.fire({
                title: `Change ${key} column`,
                input: 'text',
                inputLabel: `from ${this.datas[this.sheetPreview]['data'][index][key]}`,
                inputPlaceholder: 'Enter your new value'
            }).then((result) => {
                if (result.isConfirmed && result.value != '') {
                    this.datas[this.sheetPreview]['data'][index][key] = result.value
                    this.$forceUpdate();
                }
            })
        },
        onExport() {
            var wb = XLSX.utils.book_new();
            for (var i in this.datas){
                XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(this.datas[i]['data']), this.datas[i]['sheet']);
            }
            const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const data1 = new Blob([excelBuffer], { type: fileType });
            FileSaver.saveAs(data1, "BookDetail Summary.xlsx");    
        },
  },
};
</script>
<style>

.sze {
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