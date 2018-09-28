import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
declare var changeCurrency: any;
declare var dateDisplayAll:any;
declare var dateDisplayNow:any;
/* start for pinch */
const MAX_SCALE = 11.1;
const MIN_SCALE = 0.9;
const BASE_SCALE = 1.3;
/* end  */
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
  dateNow = "";

  Province:any;
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
  oldRegion: any;
  oldtypeCur : any;
   /* start for pinch */
   public fontSize = `${BASE_SCALE}rem`;
   private scale = BASE_SCALE;
   private alreadyScaled = BASE_SCALE;
   public isScaling = false;
   /* end  */

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
  if(this.branch != "00" || this.province != "00"){          
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
    let typeCur = 'B';
    let Region = undefined;
    let Province = undefined;
    this.getData(Region,Province,typeCur);    
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
    this.Province =  'undefined';
    this.selectionProvince(Region,Province,typeCur);
  }

  selectionProvince(Region,Province,typeCur){
    if(this.region != "00"){
      Region = localStorage.region_desc;
    }
    this.webapi.getData('ddlMProvince?offcode=' + this.offcode + '&area='+Region).then((data) => {
      this.responseProvince = data;
    }); 

    this.getData(Region,Province,typeCur);
  }

  getData(Region,Province,typeCur){
    if(this.region != "00"){
      Region = localStorage.region_desc;
    }
  
    if(this.branch != "00" || this.province != "00"){     
      Province =  this.select_province;
    }
    if (Region !== this.oldRegion || typeCur !== this.oldtypeCur) {
      Province = undefined;
    }
    //alert("ภาค="+Region+" จังหวัด="+ Province+" หน่วย="+ typeCur);
    
     this.webapi.getData('TaxRealtimeDaily?offcode='+this. offcode+'&area='+Region+'&province='+Province).then((data)=>{
       this.responseData = data;
       this.getTableAmt(typeCur);
       this.getDateFormat();
     });
     this.oldRegion = Region;
     this.oldtypeCur = typeCur;
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

  getTableAmt(typeCur) {
    let FZ;
    let IN;
    let AMT;
    let STAMP;
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

      STAMP = this.responseData[i].STAMP_AMT;
      if (STAMP != null) { STAMP = changeCurrency(STAMP, typeCur); }
      this.responseData[i].STAMP_AMT = STAMP;
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
  /* start for pinch */
public onPinchStart(e) {
  this.isScaling = true;
}
public onPinchEnd(e) {
  this.isScaling = false;
  this.alreadyScaled = this.scale * this.alreadyScaled;
}
public onPinchMove(e) {
  this.scale = e.scale;
  let totalScaled = this.alreadyScaled * e.scale;
  if (totalScaled >= MAX_SCALE) {
    this.scale = MAX_SCALE / this.alreadyScaled;
    totalScaled = MAX_SCALE;
  } else if (totalScaled <= MIN_SCALE) {
    this.scale = MIN_SCALE / this.alreadyScaled;
    totalScaled = MIN_SCALE;
  }

  let fontSize = Math.round(totalScaled * 10) / 10;
  if ((fontSize * 10) % 3 === 0) {
    this.fontSize = `${fontSize}rem`;
  }
}
/* end  */
}