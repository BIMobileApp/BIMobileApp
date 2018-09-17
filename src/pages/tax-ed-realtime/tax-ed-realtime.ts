import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
declare var changeCurrency: any;
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
      let typeCur = 'B';
      let region;
      if(this.region != "00"){
        region = localStorage.region_desc;
      }else{
        region = 'undefined';
      }

      this.getData(region,Province,typeCur);
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

  selectRegion(Region,Province,typeCur){
    Province =  'undefined';
    this.selectionProvince(Region,Province,typeCur);
    this.getData(Region,Province,typeCur);
  }

  selectionProvince(Region,Province,typeCur){
    if(this.region != "00"){
      Region = localStorage.region_desc;
    }
    this.getData(Region,Province,typeCur);
  }

  getData(Region,Province,typeCur){ 
     this.webapi.getData('FollowPayTaxRealtimeAll?offcode='+this. offcode+'&region='+Region+'&province='+Province).then((data)=>{
       this.responseData = data;

       this.getTableFZ_EXCISE(typeCur);
       this.getDateFormat();
       this.sumtax(Region,Province,typeCur);
     });
   }  

   sumtax(Region,Province,typeCur){
    this.webapi.getData('SumFollowPayTaxRealtime?offcode='+this. offcode+'&region='+Region+'&province='+Province).then((data)=>{
      this.responseSumData = data; 
      this.getSumTableFZ_EXCISE(typeCur);
    });
  }

   getTableFZ_EXCISE(typeCur) {
     let FZ;
     let IN;
     let AMT;
     for (var i = 0; i < this.responseData.length; i++) {
      FZ = this.responseData[i].FZ_EXCISE_AMT;
       if (FZ != null) { FZ = changeCurrency(FZ, typeCur); }
       this.responseData[i].FZ_EXCISE_AMT = FZ;

       IN = this.responseData[i].IN_EXCISE_AMT;
       if (IN != null) { IN = changeCurrency(IN, typeCur); }
       this.responseData[i].IN_EXCISE_AMT = IN;

       AMT = this.responseData[i].EXCISE_AMT;
       if (AMT != null) { AMT = changeCurrency(AMT, typeCur); }
       this.responseData[i].EXCISE_AMT = AMT;
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

   getSumTableFZ_EXCISE(typeCur) {
     let FZ;
     let IN;
     let AMT;
    for (var i = 0; i < this.responseSumData.length; i++) {
      FZ = this.responseSumData[i].FZ_EXCISE_AMT;
      if (FZ != null) { FZ = changeCurrency(FZ, typeCur); }
      this.responseSumData[i].FZ_EXCISE_AMT = FZ;

      IN = this.responseSumData[i].IN_EXCISE_AMT;
      if (IN != null) { IN = changeCurrency(IN, typeCur); }
      this.responseSumData[i].IN_EXCISE_AMT = IN;

      AMT = this.responseSumData[i].EXCISE_AMT;
      if (AMT != null) { AMT = changeCurrency(AMT, typeCur); }
      this.responseSumData[i].EXCISE_AMT = AMT;
    }
  }

}
