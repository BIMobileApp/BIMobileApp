import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

declare var dateDisplayNow:any;

@IonicPage()
@Component({
  selector: 'page-tax-ed-realtime',
  templateUrl: 'tax-ed-realtime.html',
})
export class TaxEdRealtimePage {

  responseData:any;
  responseSumData:any;
  responseRegion:any;
  responseProvince:any;
  month:any;
  textmsg: any;
  username:any;
  dateDisplay = "";
  dateNow = "";
  time : any;

  offcode:any;
  offdesc:any;
  regiondesc:any;

  region:any;
  province:any;
  branch:any;

  select_region:any;
  select_all_value:any;
  select_all_prov_value:any;
  select_province:any;
  isEnable:any;
  isEnableProv:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public webapi:RestProvider,
    public alertCtrl: AlertController) {
    this.offcode = localStorage.offcode;
    this.regiondesc = localStorage.region_shot;
    this.offdesc = localStorage.offdesc;
    this.username = localStorage.userData;
    this.dateDisplay = localStorage.last_update_date;
    this.dateNow = dateDisplayNow;

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
  
    var d = new Date();
    this.time = d.getHours() + " : " +  d.getMinutes();
  }

  ionViewDidLoad() {
      let Province = 'undefined';

      let region;
      if(this.region != "00"){
        region = localStorage.region_desc;
      }else{
        region = 'undefined';
      }

      this.getData(region,Province);
      this.selectionAreaAll();
      this.selectionProvinceAll();
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
    this.getData(Region,Province);
  }

  getData(Region,Province){ 
     this.webapi.getData('FollowPayTaxRealtimeAll?offcode='+this. offcode+'&region='+Region+'&province='+Province).then((data)=>{
       this.responseData = data;

       this.getTableFZ_EXCISE();
       this.getTableIN_EXCISE();
       this.getTableEXCISE();
       this.getDateFormat();
       this.sumtax(Region,Province);
     });
   }  

   sumtax(Region,Province){
    this.webapi.getData('SumFollowPayTaxRealtime?offcode='+this. offcode+'&region='+Region+'&province='+Province).then((data)=>{
      this.responseSumData = data;
        
      this.getSumTableFZ_EXCISE();
      this.getSumTableIN_EXCISE();
      this.getSumTableEXCISE();
    });
  }

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

   getDateFormat(){
     let val;
     let date;
     let month;
     let year;
     for (var i = 0; i < this.responseData.length; i++) {
       val = this.responseData[i].DIM_DATA_DATE_ID.toString();
       year = val.substring(0,4);
       month = val.substring(6,4);
       date = val.substring(6,8);
       val = date+'/'+month+'/'+year;
 
       this.responseData[i].DIM_DATA_DATE_ID = val;
     }
   }

   ///get sum

   getSumTableFZ_EXCISE() {
    let val;
    for (var i = 0; i < this.responseSumData.length; i++) {
      val = this.responseSumData[i].FZ_EXCISE_AMT/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseSumData[i].FZ_EXCISE_AMT = val;
    }
  }

  getSumTableIN_EXCISE() {
    let val;
    for (var i = 0; i < this.responseSumData.length; i++) {
      val = this.responseSumData[i].IN_EXCISE_AMT/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseSumData[i].IN_EXCISE_AMT = val;
    }
  }
  
  getSumTableEXCISE() {
    let val;
    for (var i = 0; i < this.responseSumData.length; i++) {
      val = this.responseSumData[i].EXCISE_AMT/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseSumData[i].EXCISE_AMT = val;
    }
  }

}
