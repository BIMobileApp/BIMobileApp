import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

declare var dateDisplayAll:any;
declare var dateDisplayNow:any;

@IonicPage()
@Component({
  selector: 'page-follow-tax-realtime',
  templateUrl: 'follow-tax-realtime.html',
})
export class FollowTaxRealtimePage {

  responseData: any;
  month:any;
  offcode:any;
  username:any;
  dateDisplay:any;
  dateAsOff:any;
  oldArea="";
  dateNow = "";

  region:any;
  province:any;
  branch:any;
  select_region:any;
  select_all_value:any;
  isEnable:any;
  select_province:any;
  select_all_prov_value:any;
  isEnableProv:any;

  responseRegion:any;
  responseProvince:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public webapi:RestProvider) {

  this.offcode = localStorage.offcode;
  this.dateDisplay = localStorage.last_update_date;
  this.dateAsOff =  dateDisplayAll;
  this.dateNow = dateDisplayNow;
  this.username = localStorage.userData;

  ///หา offcode เพื่อหา ภาค จังหวัด สาขา
  this.region = localStorage.offcode.substring(0, 2);
  this.province = localStorage.offcode.substring(2, 4);
  this.branch =  localStorage.offcode.substring(4, 6);
  /// end  หา offcode เพื่อหา ภาค จังหวัด สาขา

  ///ตรวจสอบภาคเพื่อ default selection
  if(this.region != "00"){
  this.select_region = localStorage.region_desc;
  this.select_all_value = false;    
  this.isEnable  = true;        
  }else{
  this.select_all_value = true;
  this.isEnable  = false;
  }
  ///end ตรวจสอบภาคเพื่อ default selection

  /// ตรวจสอบสาขาเพื่อ default selection
  var res = "";
  if(this.branch != "00"){          
  res =  localStorage.offdesc.split(" ");
  this.select_province  = res[0];
  this.select_all_prov_value = false;
  this.isEnableProv = true;
  }else{
  this.select_all_prov_value = true;
  this.isEnableProv = false;
  }
  ///end  ตรวจสอบสาขาเพื่อ default selection

  }

  ionViewDidLoad() {
    this.selectionAreaAll();
    this.selectionProvinceAll();

    var Region = undefined;
    var Province = undefined;
    this.geDataAll(Region,Province);    
  }

  selectionAreaAll(){
    this.webapi.getData('ddlMRegion?offcode=' + this.offcode).then((data) => {
      this.responseRegion = data;
    });
  }

  selectionProvinceAll(){
    let region;
    if(this.region != "00"){
      region = localStorage.region_desc;
    }
    this.webapi.getData('ddlMProvince?offcode=' + this.offcode + '&area='+region).then((data) => {
      this.responseProvince = data;
    }); 
  }

  selectRegion(Region,Province){
    Province =  'undefined';
    this.selectionProvince(Region,Province);
  }

  selectionProvince(Region,Province){
    if(this.region != "00"){
      Region = localStorage.region_desc;
    }
    this.webapi.getData('ddlMProvince?offcode=' + this.offcode + '&area='+Region).then((data) => {
      this.responseProvince = data;
    }); 

    this.geDataAll(Region,Province);
  }

  geDataAll(Region,Province){
    if(this.region != "00"){
      Region = localStorage.region_desc;
    }
  
    if(this.branch != "00"){     
      Province =  this.select_province;
    }
    /*if (Region != this.oldArea) {
      Province = undefined;
    }*/
     this.webapi.getData('TaxRealtimeDaily?offcode='+this. offcode+'&area='+Region+'&province='+Province).then((data)=>{
       this.responseData = data;
       this.getTableFZ_EXCISE();
       this.getTableIN_EXCISE();
       this.getTableEXCISE();
       this.getTableSTAMP();
       this.getDateFormat();
     });
   }  
  /* getDashboardItemsByDate(month){

    var d = new Date(); 
    var nt = d.getFullYear()+543;
    if(month== ""){
      this.geDataAll();
    }else{
      this.webapi.getData('FollowPayTaxRealtime?month='+month+'&year='+nt).then((data)=>{
        this.responseData = data;
        this.getTableCD_INCOME();
        this.getTableINCOME();
        this.getTableIMPORT();
        this.getTableSUM_ALL();
      });
    }
  }*/

  getTableFZ_EXCISE() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].FZ_EXCISE_AMT/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].FZ_EXCISE_AMT = val;
    }
  }
  getTableIN_EXCISE() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].IN_EXCISE_AMT/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].IN_EXCISE_AMT = val;
    }
  }
  getTableEXCISE() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].EXCISE_AMT/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].EXCISE_AMT = val;
    }
  }

  getTableSTAMP() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].STAMP_AMT/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].STAMP_AMT = val;
    }
  }

  getDateFormat(){
    let val;
    let date;
    let month;
    let year;
    for (var i = 0; i < this.responseData.length; i++) {
    
        val = this.responseData[i].DIM_DATA_DATE_ID.toString();
        if(val != 'รวม'){
          year = val.substring(0,4);
          month = val.substring(6,4);
          date = val.substring(6,8);
          val = date+'/'+month+'/'+year;
        }
       
       
      this.responseData[i].DIM_DATA_DATE_ID = val;
    }
  }
}