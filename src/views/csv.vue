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
                <b-tabs content-class fill card>
                    <b-tab v-for="(sheet, index) in datas" :key="index" :title="sheet['sheet']" @click="sheetPreview = index">
                        <table class="table table-bordered">
                            <thead class="table-dark">
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
            loadingData: true,
            SubscribedKeyWord : [  
              [ "f5", "big ip", "load balance", "f5(n/a):  big-ip" ], 
              [ "v7000 firmware", "ibm", "-", "v7000 firmware(n/a):  storwize v7000" ], 
              [ "os", "fabric", "san switch", "san switch(n/a):  fabric os (fos)" ], 
              [ "firmware", "bootcode", "tape library", "tape library(n/a):  tape library" ], 
              [ "virtual i/o server", "ibm", "virtual io server", "virtual i/o server(n/a):  virtual i/o server (vios)" ], 
              [ "aix", "ibm", "profile / his+was / oracledb", "aix(n/a):  aix;apache(n/a):  http server (ihs);ssh…o-sudocfg;was(n/a):  websphere application server" ], 
              [ "hmc", "ibm", "hmc", "hmc(n/a):  hardware management console (hmc)" ], 
              [ "windows server 2012 r2 standard", "microsoft", "-", "symantec(n/a):  endpoint protection;windows 2012(n/a):  windows server 2012 r2" ], 
              [ "virtual i/o server", "ibm", "virtual io", "virtual i/o server(n/a):  virtual i/o server (vios)" ], 
              [ "virtual i/o server", "ibm", "vios", "virtual i/o server(n/a):  virtual i/o server (vios)" ], 
              [ "aix", "ibm", "profile / his+was / oracledb", "aix(n/a):  aix;apache(n/a):  http server (ihs);ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;was(n/a):  websphere application server" ], 
              [ "aix", "ibm", "deployment+db", "aix(n/a):  aix;oracle(11.2.0.4):  database;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg" ], 
              [ "aix", "ibm", "profiledirect+xpress", "aix(n/a):  aix;apache(n/a):  http server (ihs);db2(n/a):  db2;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;tds(n/a):  security directory server (isds);was(n/a):  websphere application server" ], 
              [ "aix", "ibm", "profile+gt.m", "aix(n/a):  aix;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg" ], 
              [ "aix", "ibm", "storage manager", "aix(n/a):  aix;db2(n/a):  db2;ibm spectrum control (fka tivoli storage productivity center (tpc)(n/a):  ibm tivoli productivity center;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg" ], 
              [ "aix", "ibm", "xpress db", "aix(n/a):  aix;oracle(11.2.0.4):  database;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg" ], 
              [ "virtual i/o server", "ibm", "vio", "virtual i/o server(n/a):  virtual i/o server (vios)" ], 
              [ "aix", "ibm", "storage manager", "aix(n/a):  aix;db2(n/a):  db2;spectrum protect(n/a):  spectrum protect;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;tsm(n/a):  spectrum protect" ], 
              [ "ios", "cisco", "firewall", "firewall(n/a):  adaptive security appliance (asa)" ], 
              [ "aix", "ibm", "profiledirect+xpress", "aix(n/a):  aix;apache(n/a):  http server (ihs);ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;was(n/a):  websphere application server" ], 
              [ "ios", "cisco", "router", "router(15.5(3)m5):  ios" ], 
              [ "v7000 firmware", "ibm", "storage server", "v7000 firmware(n/a):  storwize v7000" ], 
              [ "aix", "ibm", "itm", "aix(n/a):  aix;db2(n/a):  db2;itcam(n/a):  tivoli composite application manager;itm(6.3.7):  tivoli monitoring;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg" ], 
              [ "aix", "ibm", "deployment", "aix(n/a):  aix;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg" ], 
              [ "ios", "cisco", "router", "router(15.2(4)m6):  ios" ], 
              [ "windows server 2012 r2 standard", "microsoft", "application server", "windows 2012(n/a):  windows server 2012 r2" ], 
              [ "windows server 2012 r2 standard", "microsoft", "-", "windows 2012(n/a):  windows server 2012 r2" ], 
              [ "aix", "ibm", "nim", "aix(n/a):  aix;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg" ], 
              [ "aix", "ibm", "itm", "aix(n/a):  aix;itcam(n/a):  tivoli composite application manager;itm(6.3.7):  tivoli monitoring;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg" ], 
              [ "ios", "cisco", "router", "router(15.5(1)t2):  ios" ], 
              [ "ios", "cisco", "switch", "switch(n/a):  switch" ], 
              [ "cisco", "dummy-spndsasws1", "cisco", "switch(n/a):  switch" ], 
              [ "cisco", "dummy-spndsasws3", "cisco", "switch(n/a):  switch" ], 
              [ "cisco", "dummy-spndsasws2", "cisco", "switch(n/a):  switch" ], 
              [ "ibm", "sudo", "ibm sudo", "aix(n/a):  aix;oracle(11.2.0.4):  database;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg" ], 
              [ "ibm", "ssh", "ibm openssh", "aix(n/a):  aix;oracle(11.2.0.4):  database;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg" ], 
              [ "oracle", "oracle_xescore1_spndsdbp1", "oracle", "aix(n/a):  aix;oracle(11.2.0.4):  database;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg" ], 
              [ "oracle", "oracle_tpad1_spndsdbp1", "oracle", "aix(n/a):  aix;oracle(11.2.0.4):  database;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg" ], 
              [ "oracle", "oracle_xescore_spndscpd1", "oracle", "aix(n/a):  aix;oracle(11.2.0.4):  database;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg" ], 
              [ "oracle", "oracle_tpad_spndscpd1", "oracle", "aix(n/a):  aix;oracle(11.2.0.4):  database;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg" ], 
              [ "ibm", "sudo", "ibm sudo", "aix(n/a):  aix;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg" ], 
              [ "ibm", "ssh", "ibm openssh", "aix(n/a):  aix;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg" ], 
              [ "ibm", "db2_tsminst1_tsmdb1_spndstsmp1", "db2 udb", "aix(n/a):  aix;db2(n/a):  db2;spectrum protect(n/a):  spectrum protect;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;tsm(n/a):  spectrum protect" ], 
              [ "ibm", "sp_tsminst1_spndstsmp1", "spectrum protect", "aix(n/a):  aix;db2(n/a):  db2;spectrum protect(n/a):  spectrum protect;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;tsm(n/a):  spectrum protect" ], 
              [ "ibm", "ssh", "ibm openssh", "aix(n/a):  aix;db2(n/a):  db2;spectrum protect(n/a):  spectrum protect;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;tsm(n/a):  spectrum protect" ], 
              [ "ibm", "sudo", "ibm sudo", "aix(n/a):  aix;db2(n/a):  db2;spectrum protect(n/a):  spectrum protect;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;tsm(n/a):  spectrum protect" ], 
              [ "oracle", "oracle_xescore_spndsdbp3", "oracle", "aix(n/a):  aix;oracle(11.2.0.4):  database;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg" ], 
              [ "oracle", "oracle_tpad_spndsdbp3", "oracle", "aix(n/a):  aix;oracle(11.2.0.4):  database;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg" ], 
              [ "ibm", "db2_db2inst1_tpcdb_ntndstpc", "db2 udb", "aix(n/a):  aix;db2(n/a):  db2;ibm spectrum control (fka tivoli storage productivity center (tpc)(n/a):  ibm tivoli productivity center;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg" ], 
              [ "ibm", "sc_db2inst1_ntndstpc", "spectrum control", "aix(n/a):  aix;db2(n/a):  db2;ibm spectrum control (fka tivoli storage productivity center (tpc)(n/a):  ibm tivoli productivity center;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg" ], 
              [ "ibm", "ssh", "ibm openssh", "aix(n/a):  aix;db2(n/a):  db2;ibm spectrum control (fka tivoli storage productivity center (tpc)(n/a):  ibm tivoli productivity center;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg" ], 
              [ "ibm", "sudo", "ibm sudo", "aix(n/a):  aix;db2(n/a):  db2;ibm spectrum control (fka tivoli storage productivity center (tpc)(n/a):  ibm tivoli productivity center;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg" ], 
              [ "ibm", "apache_dev_httpserver_4_spndspfd1", "http server", "aix(n/a):  aix;apache(n/a):  http server (ihs);ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;was(n/a):  websphere application server" ], 
              [ "ibm", "apache_dev_httpserver_2_spndspfd1", "http server", "aix(n/a):  aix;apache(n/a):  http server (ihs);ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;was(n/a):  websphere application server" ], 
              [ "ibm", "apache_dev_httpserver_spndspfd1", "http server", "aix(n/a):  aix;apache(n/a):  http server (ihs);ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;was(n/a):  websphere application server" ], 
              [ "ibm", "apache_dev_httpserver_3_spndspfd1", "http server", "aix(n/a):  aix;apache(n/a):  http server (ihs);ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;was(n/a):  websphere application server" ], 
              [ "ibm", "apache_dev_httpserver_1_spndspfd1", "http server", "aix(n/a):  aix;apache(n/a):  http server (ihs);ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;was(n/a):  websphere application server" ], 
              [ "ibm", "apache_dev_httpserver_5_spndspfd1", "http server", "aix(n/a):  aix;apache(n/a):  http server (ihs);ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;was(n/a):  websphere application server" ], 
              [ "ibm", "ssh", "ibm openssh", "aix(n/a):  aix;apache(n/a):  http server (ihs);ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;was(n/a):  websphere application server" ], 
              [ "ibm", "sudo", "ibm sudo", "aix(n/a):  aix;apache(n/a):  http server (ihs);ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;was(n/a):  websphere application server" ], 
              [ "ibm", "was_dev_appsrv05_spndspfd1", "ibm websphere application server", "aix(n/a):  aix;apache(n/a):  http server (ihs);ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;was(n/a):  websphere application server" ], 
              [ "ibm", "was_dev_appsrv02_spndspfd1", "ibm websphere application server", "aix(n/a):  aix;apache(n/a):  http server (ihs);ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;was(n/a):  websphere application server" ], 
              [ "ibm", "was_dev_appsrv03_spndspfd1", "ibm websphere application server", "aix(n/a):  aix;apache(n/a):  http server (ihs);ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;was(n/a):  websphere application server" ], 
              [ "ibm", "was_dev_appsrv04_spndspfd1", "ibm websphere application server", "aix(n/a):  aix;apache(n/a):  http server (ihs);ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;was(n/a):  websphere application server" ], 
              [ "ibm", "was_dev_appsrv01_spndspfd1", "ibm websphere application server", "aix(n/a):  aix;apache(n/a):  http server (ihs);ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;was(n/a):  websphere application server" ], 
              [ "ibm", "was_dev_appsrv06_spndspfd1", "ibm websphere application server", "aix(n/a):  aix;apache(n/a):  http server (ihs);ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;was(n/a):  websphere application server" ], 
              [ "ibm", "db2_db2uat_ldapclog_spndsappp1", "db2 udb", "aix(n/a):  aix;apache(n/a):  http server (ihs);db2(n/a):  db2;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;tds(n/a):  security directory server (isds);was(n/a):  websphere application server" ], 
              [ "ibm", "db2_db2uat_fisuatdb_spndsappp1", "db2 udb", "aix(n/a):  aix;apache(n/a):  http server (ihs);db2(n/a):  db2;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;tds(n/a):  security directory server (isds);was(n/a):  websphere application server" ], 
              [ "ibm", "apache_uat_httpserver_1_spndsappp1", "http server", "aix(n/a):  aix;apache(n/a):  http server (ihs);db2(n/a):  db2;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;tds(n/a):  security directory server (isds);was(n/a):  websphere application server" ], 
              [ "ibm", "apache_uat_httpserver_spndsappp1", "http server", "aix(n/a):  aix;apache(n/a):  http server (ihs);db2(n/a):  db2;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;tds(n/a):  security directory server (isds);was(n/a):  websphere application server" ], 
              [ "ibm", "ssh", "ibm openssh", "aix(n/a):  aix;apache(n/a):  http server (ihs);db2(n/a):  db2;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;tds(n/a):  security directory server (isds);was(n/a):  websphere application server" ], 
              [ "ibm", "sudo", "ibm sudo", "aix(n/a):  aix;apache(n/a):  http server (ihs);db2(n/a):  db2;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;tds(n/a):  security directory server (isds);was(n/a):  websphere application server" ], 
              [ "ibm", "was_uat_dmgr01_spndsappp1", "ibm websphere application server", "aix(n/a):  aix;apache(n/a):  http server (ihs);db2(n/a):  db2;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;tds(n/a):  security directory server (isds);was(n/a):  websphere application server" ], 
              [ "ibm", "was_uat_xpresscluster_a_spndsappp1", "ibm websphere application server", "aix(n/a):  aix;apache(n/a):  http server (ihs);db2(n/a):  db2;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;tds(n/a):  security directory server (isds);was(n/a):  websphere application server" ], 
              [ "ibm", "was_uat_webcluster_a_spndsappp1", "ibm websphere application server", "aix(n/a):  aix;apache(n/a):  http server (ihs);db2(n/a):  db2;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;tds(n/a):  security directory server (isds);was(n/a):  websphere application server" ], 
              [ "ibm", "tds_uat_ldapuat_spndsappp1", "ibm tivoli directory server", "aix(n/a):  aix;apache(n/a):  http server (ihs);db2(n/a):  db2;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;tds(n/a):  security directory server (isds);was(n/a):  websphere application server" ], 
              [ "ibm", "apache_sit_httpserver_1_spndsapppt1", "http server", "aix(n/a):  aix;apache(n/a):  http server (ihs);ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;was(n/a):  websphere application server" ], 
              [ "ibm", "apache_sit_httpserver_spndsappt1", "http server", "aix(n/a):  aix;apache(n/a):  http server (ihs);ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;was(n/a):  websphere application server" ], 
              [ "ibm", "was_sit_appsrv02_spndsappt1", "ibm websphere application server", "aix(n/a):  aix;apache(n/a):  http server (ihs);ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;was(n/a):  websphere application server" ], 
              [ "ibm", "was_sit_appsrv01_spndsappt1", "ibm websphere application server", "aix(n/a):  aix;apache(n/a):  http server (ihs);ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;was(n/a):  websphere application server" ], 
              [ "oracle", "oracle_xescore_spndsdbn1", "oracle", "aix(n/a):  aix;oracle(11.2.0.4):  database;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg" ], 
              [ "oracle", "oracle_tpad_spndsdbn1", "oracle", "aix(n/a):  aix;oracle(11.2.0.4):  database;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg" ], 
              [ "oracle", "oracle_xescore2_spndsdbp2", "oracle", "aix(n/a):  aix;oracle(11.2.0.4):  database;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg" ], 
              [ "oracle", "oracle_tpad2_spndsdbp2", "oracle", "aix(n/a):  aix;oracle(11.2.0.4):  database;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg" ], 
              [ "ibm", "apache_trn_httpserver_1_spndsappn1", "http server", "aix(n/a):  aix;apache(n/a):  http server (ihs);ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;was(n/a):  websphere application server" ], 
              [ "ibm", "apache_trn_httpserver_spndsappn1", "http server", "aix(n/a):  aix;apache(n/a):  http server (ihs);ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;was(n/a):  websphere application server" ], 
              [ "ibm", "was_trn_appsrv02_spndsappn1", "ibm websphere application server", "aix(n/a):  aix;apache(n/a):  http server (ihs);ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;was(n/a):  websphere application server" ], 
              [ "ibm", "was_trn_appsrv01_spndsappn1", "ibm websphere application server", "aix(n/a):  aix;apache(n/a):  http server (ihs);ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;was(n/a):  websphere application server" ], 
              [ "ibm", "apache_uat_httpserver_1_spndsappp3", "http server", "aix(n/a):  aix;apache(n/a):  http server (ihs);ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;was(n/a):  websphere application server" ], 
              [ "ibm", "apache_uat_httpserver_spndsappp3", "http server", "aix(n/a):  aix;apache(n/a):  http server (ihs);ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;was(n/a):  websphere application server" ], 
              [ "ibm", "was_uat_appsrv01_spndsappp3", "ibm websphere application server", "aix(n/a):  aix;apache(n/a):  http server (ihs);ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;was(n/a):  websphere application server" ], 
              [ "ibm", "was_uat_appsrv02_spndsappp3", "ibm websphere application server", "aix(n/a):  aix;apache(n/a):  http server (ihs);ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;was(n/a):  websphere application server" ], 
              [ "ibm", "db2_db2uat_fisuatdb_spndsappp2", "db2 udb", "aix(n/a):  aix;apache(n/a):  http server (ihs);db2(n/a):  db2;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;tds(n/a):  security directory server (isds);was(n/a):  websphere application server" ], 
              [ "ibm", "db2_db2uat_ldapclog_spndsappp2", "db2 udb", "aix(n/a):  aix;apache(n/a):  http server (ihs);db2(n/a):  db2;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;tds(n/a):  security directory server (isds);was(n/a):  websphere application server" ], 
              [ "ibm", "apache_uat_httpserver_1_spndsappp2", "http server", "aix(n/a):  aix;apache(n/a):  http server (ihs);db2(n/a):  db2;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;tds(n/a):  security directory server (isds);was(n/a):  websphere application server" ], 
              [ "ibm", "apache_uat_httpserver_2_spndsappp2", "http server", "aix(n/a):  aix;apache(n/a):  http server (ihs);db2(n/a):  db2;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;tds(n/a):  security directory server (isds);was(n/a):  websphere application server" ], 
              [ "ibm", "apache_uat_httpserver_spndsappp2", "http server", "aix(n/a):  aix;apache(n/a):  http server (ihs);db2(n/a):  db2;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;tds(n/a):  security directory server (isds);was(n/a):  websphere application server" ], 
              [ "ibm", "was_uat_xpresscluster_b_spndsappp2", "ibm websphere application server", "aix(n/a):  aix;apache(n/a):  http server (ihs);db2(n/a):  db2;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;tds(n/a):  security directory server (isds);was(n/a):  websphere application server" ], 
              [ "ibm", "was_uat_webcluster_b_spndsappp2", "ibm websphere application server", "aix(n/a):  aix;apache(n/a):  http server (ihs);db2(n/a):  db2;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;tds(n/a):  security directory server (isds);was(n/a):  websphere application server" ], 
              [ "ibm", "tds_uat_ldapuat_spndsappp2", "ibm tivoli directory server", "aix(n/a):  aix;apache(n/a):  http server (ihs);db2(n/a):  db2;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;tds(n/a):  security directory server (isds);was(n/a):  websphere application server" ], 
              [ "ibm", "was_uat_appsrv01_spndsappp2", "ibm websphere application server", "aix(n/a):  aix;apache(n/a):  http server (ihs);db2(n/a):  db2;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;tds(n/a):  security directory server (isds);was(n/a):  websphere application server" ], 
              [ "oracle", "oracle_xescore_spndsdbt1", "oracle", "aix(n/a):  aix;oracle(11.2.0.4):  database;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg" ], 
              [ "oracle", "oracle_tpad_spndsdbt1", "oracle", "aix(n/a):  aix;oracle(11.2.0.4):  database;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg" ], 
              [ "cisco", "dummy-spndscsws1", "cisco", "switch(n/a):  switch" ], 
              [ "oracle", "oracle_tpad_spndsdbr1a", "oracle", "aix(n/a):  aix;oracle(11.2.0.4):  database;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg" ], 
              [ "oracle", "oracle_xescore_spndsdbr1a", "oracle", "aix(n/a):  aix;oracle(11.2.0.4):  database;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg" ], 
              [ "ibm", "sp_tsminst1_spndstsmr1a", "spectrum protect", "aix(n/a):  aix;db2(n/a):  db2;spectrum protect(n/a):  spectrum protect;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;tsm(n/a):  spectrum protect" ], 
              [ "ibm", "db2_tsminst1_tsmdb1_spndstsmr1a", "db2 udb", "aix(n/a):  aix;db2(n/a):  db2;spectrum protect(n/a):  spectrum protect;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;tsm(n/a):  spectrum protect" ], 
              [ "oracle", "oracle_tpad2_ntndsdbs1b", "oracle", "aix(n/a):  aix;oracle(11.2.0.4):  database;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg" ], 
              [ "oracle", "oracle_xescore2_ntndsdbs1b", "oracle", "aix(n/a):  aix;oracle(11.2.0.4):  database;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg" ], 
              [ "cisco", "dummy-pakin-sym", "cisco", "router(15.2(4)m6):  ios" ], 
              [ "cisco", "dummy-ibm-true", "cisco", "router(15.2(4)m6):  ios" ], 
              [ "cisco", "dummy-ibm-symp", "cisco", "router(15.2(4)m6):  ios" ], 
              [ "ibm", "symantec antivirus", "symantec antivirus", "symantec(n/a):  endpoint protection;windows 2012(n/a):  windows server 2012 r2" ], 
              [ "ibm", "db2_db2tdw_tdw_spndsitm", "db2 udb", "aix(n/a):  aix;db2(n/a):  db2;itcam(n/a):  tivoli composite application manager;itm(6.3.7):  tivoli monitoring;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg" ], 
              [ "ibm", "db2_db2inst1_teps_spndsitm", "db2 udb", "aix(n/a):  aix;db2(n/a):  db2;itcam(n/a):  tivoli composite application manager;itm(6.3.7):  tivoli monitoring;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg" ], 
              [ "ibm", "db2_db2jazz_frsdb_spndsitm", "db2 udb", "aix(n/a):  aix;db2(n/a):  db2;itcam(n/a):  tivoli composite application manager;itm(6.3.7):  tivoli monitoring;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg" ], 
              [ "ibm", "db2_db2tcr_tcrdb_spndsitm", "db2 udb", "aix(n/a):  aix;db2(n/a):  db2;itcam(n/a):  tivoli composite application manager;itm(6.3.7):  tivoli monitoring;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg" ], 
              [ "ibm", "ibm tivoli monitoring 6", "ibm tivoli monitoring 6", "aix(n/a):  aix;db2(n/a):  db2;itcam(n/a):  tivoli composite application manager;itm(6.3.7):  tivoli monitoring;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg" ], 
              [ "ibm", "ssh", "ibm openssh", "aix(n/a):  aix;db2(n/a):  db2;itcam(n/a):  tivoli composite application manager;itm(6.3.7):  tivoli monitoring;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg" ], 
              [ "ibm", "sudo", "ibm sudo", "aix(n/a):  aix;db2(n/a):  db2;itcam(n/a):  tivoli composite application manager;itm(6.3.7):  tivoli monitoring;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg" ], 
              [ "ibm", "ibm tivoli monitoring 6", "ibm tivoli monitoring 6", "aix(n/a):  aix;itcam(n/a):  tivoli composite application manager;itm(6.3.7):  tivoli monitoring;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg" ], 
              [ "ibm", "ssh", "ibm openssh", "aix(n/a):  aix;itcam(n/a):  tivoli composite application manager;itm(6.3.7):  tivoli monitoring;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg" ], 
              [ "ibm", "sudo", "ibm sudo", "aix(n/a):  aix;itcam(n/a):  tivoli composite application manager;itm(6.3.7):  tivoli monitoring;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg" ], 
              [ "ibm", "db2_db2prd_fisprddb_ntndsapps1b", "db2 udb", "aix(n/a):  aix;apache(n/a):  http server (ihs);db2(n/a):  db2;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;tds(n/a):  security directory server (isds);was(n/a):  websphere application server" ], 
              [ "ibm", "db2_db2prd_ldapclog_ntndsapps1b", "db2 udb", "aix(n/a):  aix;apache(n/a):  http server (ihs);db2(n/a):  db2;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;tds(n/a):  security directory server (isds);was(n/a):  websphere application server" ], 
              [ "ibm", "apache_prd_httpserver_1_ntndsapps1b", "http server", "aix(n/a):  aix;apache(n/a):  http server (ihs);db2(n/a):  db2;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;tds(n/a):  security directory server (isds);was(n/a):  websphere application server" ], 
              [ "ibm", "apache_prd_httpserver_ntndsapps1b", "http server", "aix(n/a):  aix;apache(n/a):  http server (ihs);db2(n/a):  db2;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;tds(n/a):  security directory server (isds);was(n/a):  websphere application server" ], 
              [ "ibm", "was_prd_xpresscluster_b_ntndsapps1b", "ibm websphere application server", "aix(n/a):  aix;apache(n/a):  http server (ihs);db2(n/a):  db2;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;tds(n/a):  security directory server (isds);was(n/a):  websphere application server" ], 
              [ "ibm", "was_prd_webcluster_b_ntndsapps1b", "ibm websphere application server", "aix(n/a):  aix;apache(n/a):  http server (ihs);db2(n/a):  db2;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;tds(n/a):  security directory server (isds);was(n/a):  websphere application server" ], 
              [ "ibm", "tds_prd_ldapprd_ntndsapps1b", "ibm tivoli directory server", "aix(n/a):  aix;apache(n/a):  http server (ihs);db2(n/a):  db2;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;tds(n/a):  security directory server (isds);was(n/a):  websphere application server" ], 
              [ "ibm", "db2_db2prd_fisprddb_spndsappr1a", "db2 udb", "aix(n/a):  aix;apache(n/a):  http server (ihs);db2(n/a):  db2;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;tds(n/a):  security directory server (isds);was(n/a):  websphere application server" ], 
              [ "ibm", "db2_db2prd_ldapclog_spndsappr1a", "db2 udb", "aix(n/a):  aix;apache(n/a):  http server (ihs);db2(n/a):  db2;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;tds(n/a):  security directory server (isds);was(n/a):  websphere application server" ], 
              [ "ibm", "apache_dr_httpserver_1_spndsappr1a", "http server", "aix(n/a):  aix;apache(n/a):  http server (ihs);db2(n/a):  db2;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;tds(n/a):  security directory server (isds);was(n/a):  websphere application server" ], 
              [ "ibm", "apache_dr_httpserver_spndsappr1a", "http server", "aix(n/a):  aix;apache(n/a):  http server (ihs);db2(n/a):  db2;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;tds(n/a):  security directory server (isds);was(n/a):  websphere application server" ], 
              [ "ibm", "was_dr_dmgr01_spndsappr1a", "ibm websphere application server", "aix(n/a):  aix;apache(n/a):  http server (ihs);db2(n/a):  db2;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;tds(n/a):  security directory server (isds);was(n/a):  websphere application server" ], 
              [ "ibm", "was_dr_webcluster_a_spndsappr1a", "ibm websphere application server", "aix(n/a):  aix;apache(n/a):  http server (ihs);db2(n/a):  db2;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;tds(n/a):  security directory server (isds);was(n/a):  websphere application server" ], 
              [ "ibm", "was_dr_xpresscluster_a_spndsappr1a", "ibm websphere application server", "aix(n/a):  aix;apache(n/a):  http server (ihs);db2(n/a):  db2;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;tds(n/a):  security directory server (isds);was(n/a):  websphere application server" ], 
              [ "ibm", "tds_dr_ldapprd_spndsappr1a", "ibm tivoli directory server", "aix(n/a):  aix;apache(n/a):  http server (ihs);db2(n/a):  db2;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;tds(n/a):  security directory server (isds);was(n/a):  websphere application server" ], 
              [ "ibm", "db2_tsminst1_tsmdb1_ntndstsms1a_backup", "db2 udb", "aix(n/a):  aix;db2(n/a):  db2;spectrum protect(n/a):  spectrum protect;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;tsm(n/a):  spectrum protect" ], 
              [ "ibm", "sp_tsminst1_ntndstsms1a_backup", "spectrum protect", "aix(n/a):  aix;db2(n/a):  db2;spectrum protect(n/a):  spectrum protect;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;tsm(n/a):  spectrum protect" ], 
              [ "ibm", "db2_tsminst1_tsmdb1_ntndstsms1b_backup", "db2 udb", "aix(n/a):  aix;db2(n/a):  db2;spectrum protect(n/a):  spectrum protect;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;tsm(n/a):  spectrum protect" ], 
              [ "ibm", "sp_tsminst1_ntndstsms1b_backup", "spectrum protect", "aix(n/a):  aix;db2(n/a):  db2;spectrum protect(n/a):  spectrum protect;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;tsm(n/a):  spectrum protect" ], 
              [ "ibm", "db2_db2prd_ldapclog_ntndsapps1a", "db2 udb", "aix(n/a):  aix;apache(n/a):  http server (ihs);db2(n/a):  db2;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;tds(n/a):  security directory server (isds);was(n/a):  websphere application server" ], 
              [ "ibm", "db2_db2prd_fisprddb_ntndsapps1a", "db2 udb", "aix(n/a):  aix;apache(n/a):  http server (ihs);db2(n/a):  db2;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;tds(n/a):  security directory server (isds);was(n/a):  websphere application server" ], 
              [ "ibm", "apache_prd_httpserver_1_ntndsapps1a", "http server", "aix(n/a):  aix;apache(n/a):  http server (ihs);db2(n/a):  db2;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;tds(n/a):  security directory server (isds);was(n/a):  websphere application server" ], 
              [ "ibm", "apache_prd_httpserver_ntndsapps1a", "http server", "aix(n/a):  aix;apache(n/a):  http server (ihs);db2(n/a):  db2;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;tds(n/a):  security directory server (isds);was(n/a):  websphere application server" ], 
              [ "ibm", "was_prd_dmgr01_ntndsapps1a", "ibm websphere application server", "aix(n/a):  aix;apache(n/a):  http server (ihs);db2(n/a):  db2;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;tds(n/a):  security directory server (isds);was(n/a):  websphere application server" ], 
              [ "ibm", "was_prd_webcluster_a_ntndsapps1a", "ibm websphere application server", "aix(n/a):  aix;apache(n/a):  http server (ihs);db2(n/a):  db2;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;tds(n/a):  security directory server (isds);was(n/a):  websphere application server" ], 
              [ "ibm", "was_prd_xpresscluster_a_ntndsapps1a", "ibm websphere application server", "aix(n/a):  aix;apache(n/a):  http server (ihs);db2(n/a):  db2;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;tds(n/a):  security directory server (isds);was(n/a):  websphere application server" ], 
              [ "ibm", "tds_prd_ldapprd_ntndsapps1a", "ibm tivoli directory server", "aix(n/a):  aix;apache(n/a):  http server (ihs);db2(n/a):  db2;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg;tds(n/a):  security directory server (isds);was(n/a):  websphere application server" ], 
              [ "oracle", "oracle_xescore1_ntndsdbs1a", "oracle", "aix(n/a):  aix;oracle(11.2.0.4):  database;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg" ], 
              [ "oracle", "oracle_tpad1_ntndsdbs1a", "oracle", "aix(n/a):  aix;oracle(11.2.0.4):  database;ssh(n/a):  openssh;sudo(n/a):  sudo-sudocfg" ], 
              [ "cisco", "dummy-pakin-true", "cisco", "router(15.2(4)m6):  ios" ], 
              [ "cisco", "dummy-spndsfws1", "cisco", "firewall(n/a):  adaptive security appliance (asa)" ] 
            ]
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
                    var loop = (data.length-1) / 10 
                    var key=[]
                    // console.log((loop < 10 ? data.length-1 : loop));                              //98 => 98 // 120 => 12  // 1200 => 120
                    // console.log(data.length-1 < 100 ? data.length-1 : (loop < 100 ? 100 : loop)); //98 => 98 // 120 => 100 // 1200 => 120 
                    for(var j=0; j < (data.length-1 < 100 ? data.length-1 : (loop < 100 ? 100 : loop)) ; j++){
                      key= [...new Set(key.concat(Object.keys(data[j])))]
                    }
                    // console.log(key);
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
                var selectSheet1 = ['GACDW_FIS_OS','GACDW_ICBC_OS']
                var selectSheet2 = ['GACDW_FIS_Subsystem', 'GACDW_ICBC_Subsystem']
                var selectSheet3 = ['RCP_FIS', 'RCP_ICBC']
                var selectcolCompare =["Category","IpAddress","Status","CiLifeCycleState","HostName","OsName","OsProvider","Purpose","Device Name"]
                var selectcolSubscribed =["Category","IpAddress","Status","CiLifeCycleState","HostName","OsName","OsProvider","Purpose","Manufacturer","Name","ProductName","Device Name","External Software Products(Version): MSS/MF Products"]
                var Comparecol1 = ["HostName","Device Name"]
                var subscribcol1 = ["OsName","OsProvider","Purpose","External Software Products(Version): MSS/MF Products"]
                var subscribcol2 = ["Manufacturer","Name","ProductName","External Software Products(Version): MSS/MF Products"]
                var deselect =["CiLifeCycleState"]
                var deselectOS =["Manufacturer","Name","ProductName","CiLifeCycleState","Device Name"]
                var deselectSubsystem =["CiLifeCycleState","Device Name"]
                this.newworksheet1(selectSheet1,selectSheet3,'CompareDevice',Comparecol1,selectcolCompare,deselect)
                this.newworksheet2(selectSheet1,selectSheet3,'OS_Subscribed',subscribcol1,selectcolSubscribed,deselectOS)
                this.newworksheet2(selectSheet2,selectSheet3,'Subsystem_Subscribed',subscribcol2,selectcolSubscribed,deselectSubsystem)
                this.loadingData = false
            }, 150);
        },
        newworksheet1(selectSheet1,selectSheet2,name,Comparecol,selectcol,deselect){
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
                    lastoutput.push(this.jsonConcat2(output[k],bin[k],deselect))
                }
                // var key = Object.keys(output[0])
                // this.datas.push({"sheet":name, "data":output, "key":key})
                var key1 = Object.keys(lastoutput[0])
                this.datas.push({"sheet":name, "data":lastoutput, "key":key1})
        },
        newworksheet2(selectSheet1,selectSheet2,name,Comparecol,selectcol,deselect){
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
                        else for(var x in temp[1]){
                                  if(temp[0][j]["HostName"].toLowerCase()==temp[1][x]["Device Name"].toLowerCase()){
                                      output.push(this.jsonConcat(temp[0][j], temp[1][x],selectcol))
                                      // console.log(j);
                                      // console.log(temp[0][j]['HostName']);
                                      // console.log(temp[1][x]['Device Name']);
                                  } 
                              }
                    }
                }
                // console.log(output);
                var bin = this.CheckSubscribed(output,Comparecol)
                // console.log(bin);
                var lastoutput =[]
                for(var k in output){
                    lastoutput.push(this.jsonConcat2(output[k],bin[k],deselect))
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
        jsonConcat2(o1, o2, deselect) {
            // var deselect = ["CiLifeCycleState"]
            var temp = {}
            for (var key1 in o1) {
                if(deselect.includes(key1)) continue
                temp[key1] = o1[key1]
            }
            for (var key2 in o2) {
                var key = key2
                if(deselect.includes(key)) continue
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
            var keyword = this.SubscribedKeyWord
            var out = []
            for (var i=0;i < o1.length;i++) {
                if(o1[i][select[0]]!=undefined) {bin1.push(o1[i][select[0]].toLowerCase())} else {bin1.push(undefined)}
                if(o1[i][select[1]]!=undefined) {bin2.push(o1[i][select[1]].toLowerCase())} else {bin2.push(undefined)}
                if(o1[i][select[2]]!=undefined) {bin3.push(o1[i][select[2]].toLowerCase())} else {bin3.push(undefined)}
                if(o1[i][select[3]]!=undefined) {bin4.push(o1[i][select[3]].toLowerCase())} else {bin4.push(undefined)}
                // console.log(o1[i]);
                // console.log(i);
                // console.log(o1[i][select[0]]);
                // console.log(o1[i][select[1]]);
                // console.log(o1[i][select[2]]);
                // console.log(o1[i][select[3]]);
            }
            for(var j=0;j<o1.length;j++){
                var temp = {}
                if(bin4[j]==undefined){
                    temp['Subscription']='Not Subscribed'
                }else {
                    var check = 0
                    for(var all in keyword){
                      if(bin1[j]==keyword[all][0] && bin2[j]==keyword[all][1] && bin3[j]==keyword[all][2] && bin4[j]==keyword[all][3]){
                          check++
                      }
                    }
                    if(check>0){
                        temp['Subscription']='Subscribed'}
                    else {
                        temp['Subscription']='Incorrect Subscribed'
                    }
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
            // console.log(this.sheetPreview);
            // console.log(key);
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
                if(this.sheetPreview==4){
                  // console.log('test1')
                  if(key=='Subscription' && result.value == 'Subscribed'){
                      var j = 0
                      var i
                      var NewSet = this.datas[this.sheetPreview]['data'][index]
                      for(i=0; i < this.SubscribedKeyWord.length ; i++){
                        if(NewSet['OsName'].toLowerCase()!=this.SubscribedKeyWord[i][0]||NewSet['OsProvider'].toLowerCase()!=this.SubscribedKeyWord[i][1]||NewSet['Purpose'].toLowerCase()!=this.SubscribedKeyWord[i][2]||NewSet['External Software Products(Version): MSS/MF Products'].toLowerCase()!=this.SubscribedKeyWord[i][3]) j++
                        // console.log(i);
                      }
                      if(j==i){this.SubscribedKeyWord.push([NewSet['OsName'].toLowerCase(),NewSet['OsProvider'].toLowerCase(),NewSet['Purpose'].toLowerCase(),NewSet['External Software Products(Version): MSS/MF Products'].toLowerCase()])}
                      // console.log(i);
                      // console.log(j);
                      // console.log(this.SubscribedKeyWord);
                      this.onchangeSubscription('OsName','OsProvider','Purpose')
                    }
                }else 
                if(this.sheetPreview==5){
                  // console.log('test2')
                  if(key=='Subscription' && result.value == 'Subscribed'){
                      var a = 0
                      var b
                      var NewSet2 = this.datas[this.sheetPreview]['data'][index]
                      for(b=0; b < this.SubscribedKeyWord.length ; b++){
                        if(NewSet2['Manufacturer'].toLowerCase()!=this.SubscribedKeyWord[b][0]||NewSet2['Name'].toLowerCase()!=this.SubscribedKeyWord[b][1]||NewSet2['ProductName'].toLowerCase()!=this.SubscribedKeyWord[b][2]||NewSet2['External Software Products(Version): MSS/MF Products'].toLowerCase()!=this.SubscribedKeyWord[b][3]) a++
                        // console.log(i);
                      }
                      if(a==b){this.SubscribedKeyWord.push([NewSet2['Manufacturer'].toLowerCase(),NewSet2['Name'].toLowerCase(),NewSet2['ProductName'].toLowerCase(),NewSet2['External Software Products(Version): MSS/MF Products'].toLowerCase()])}
                      // console.log(i);
                      // console.log(j);
                      // console.log(this.SubscribedKeyWord);
                      this.onchangeSubscription('Manufacturer','Name','ProductName')
                    }
                }
            })
        },
        onchangeSubscription(str1,str2,str3){
            var keyword = this.SubscribedKeyWord
            var data = this.datas[this.sheetPreview]['data']
            for(var j in data){
                console.log(j)
                if((data[j]['External Software Products(Version): MSS/MF Products'].toLowerCase())==undefined){
                    this.datas[this.sheetPreview]['data'][j]['Subscription']='Not Subscribed'
                }else {
                    var check = 0
                    for(var all in keyword){
                      if((data[j][str1].toLowerCase())==keyword[all][0] && (data[j][str2].toLowerCase())==keyword[all][1] && (data[j][str3].toLowerCase())==keyword[all][2] && (data[j]['External Software Products(Version): MSS/MF Products'].toLowerCase())==keyword[all][3]){
                          check++
                      }
                    }
                    if(check>0){
                        this.datas[this.sheetPreview]['data'][j]['Subscription']='Subscribed'}
                    else {
                        this.datas[this.sheetPreview]['data'][j]['Subscription']='Incorrect Subscribed'
                    }
                }
            }
        }
        ,
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