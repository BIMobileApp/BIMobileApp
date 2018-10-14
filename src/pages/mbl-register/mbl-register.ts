import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';


declare var dateDisplayAll:any;
declare var changeCurrencyNoUnit:any;
declare var convertMthBudYear:any;
declare var monthNowNumber:any;
/* start for pinch */
const MAX_SCALE = 11.1;
const MIN_SCALE = 0.9;
const BASE_SCALE = 1.3;
/* end  */
@IonicPage()
@Component({
  selector: 'page-mbl-register',
  templateUrl: 'mbl-register.html',
})
export class MblRegisterPage {

  offcode: any;
  responseData: any;
  username:any;

  responseDateTitle:any;
  dateDisplay:any;
  dateAsOff:any;

  responseRegion:any;
  ResponseProvince:any;

  Province:any;
  region:any;
  province:any;
  branch:any;

  select_region:any;
  select_all_value:any;
  select_all_prov_value:any;
  select_province:any;
  isEnable:any;
  isEnableProv:any;
  oldRegion:any;
  oldtypeCur:any;
  mthNumber:any;

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
      this.username = localStorage.userData;
      this.dateDisplay = localStorage.last_update_date;
      this.mthNumber = monthNowNumber;
    //  this.dateAsOff =  dateDisplayAll;

      this.dateAsOff = 'ข้อมูล '+dateDisplayAll;
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

  select_mth_from = '';
  select_mth_to = '';
  ionViewDidLoad() {
    this.ddlMonthFrom();
    this.ddlMonthTo();

    let Region;
    let Province;
    let typeCur  = 'B';
    let Mth_From = convertMthBudYear(this.mthNumber);
    let Mth_To  = convertMthBudYear(this.mthNumber);

    this.select_mth_from = Mth_From;
    this.select_mth_to = Mth_To;

    this.selectDataAll(Mth_From,Mth_To,Region,Province,typeCur);
    this.selectRegionAll();
    this.selectionProvinceAll();
  }

  ResponseMthFrom:any;
  ddlMonthFrom(){
    this.webapi.getData('dllMMonth').then((data) => {
      this.ResponseMthFrom = data;
    });
  }

  ResponseMthTo:any;
  ddlMonthTo(){
    this.webapi.getData('dllMMonth').then((data) => {
      this.ResponseMthTo = data;
    });
  }

  selectRegionAll(){
    this.webapi.getData('ddlMRegion?offcode='+this.offcode).then((data) => {
      this.responseRegion = data;
    });
  }
  selectionProvinceAll(){
    let area;
    if(this.region != "00"){
      area = localStorage.region_desc;
    }
   
    this.webapi.getData('ddlMProvince?offcode='+this.offcode+'&area='+area).then((data) => {
      this.ResponseProvince = data;
    }); 
  }
  selectRegion(Mth_From,Mth_To,Region,Province,typeCur){
    Province =  'undefined';
    this.Province = 'undefined';

    this.selectionProvince(Mth_From,Mth_To,Region,Province,typeCur);
    
  }

  /*selectionProvinceFill(Region){
    this.webapi.getData('ddlMProvince?offcode='+this.offcode+'&area='+Region).then((data) => {
      this.ResponseProvince = data;
    }); 
  }*/

  selectionProvince(Mth_From,Mth_To,Region,Province,typeCur){ 
    if(this.region != "00"){
      Region = localStorage.region_desc;
    }
    this.webapi.getData('ddlMProvince?offcode='+this.offcode+'&area='+Region).then((data) => {
      this.ResponseProvince = data;
    }); 

   // this.selectionProvinceFill(Region);
    this.selectDataAll(Mth_From,Mth_To,Region,Province,typeCur);
  }

  selectMonthFrom(Mth_From,Mth_To,Region,Province,typeCur){
    this.selectDataAll(Mth_From,Mth_To,Region,Province,typeCur);
  }

  selectMonthTo(Mth_From,Mth_To,Region,Province,typeCur){
    this.selectDataAll(Mth_From,Mth_To,Region,Province,typeCur);
  }

  regionSelectType = "";
  selectDataAll(Mth_From,Mth_To,Region,Province,typeCur){
  
    if(this.region != "00"){
      Region = localStorage.region_desc;
    }else{
      Region = Region;
    }

    if(this.branch != "00"){
      Province = this.select_province;
    }else{
      Province = Province;
    }

    if(typeCur == undefined){
      this.regionSelectType = "B";
    }else{
      this.regionSelectType =  typeCur;
    }
   
    this.webapi.getData('MBLRegister?offcode='+this.offcode+'&region='+Region+'&province='+Province+'&month_from=' + Mth_From+'&month_to='+Mth_To).then((data)=>{
      this.responseData = data;  
      this.getChangNumber(this.regionSelectType);    
    });
    
    this.getDateTiTle(Mth_From,Mth_To);
  }

  getDateTiTle(monthFrom,monthTo){  
 
    let dateTitle;
    if(monthFrom != undefined  && monthTo != undefined){
      if( monthFrom != 'undefined'  && monthTo != 'undefined'){
      this.webapi.getData('DateTitle?startMonth='+(monthFrom == undefined  ? monthTo : monthFrom) +'&endMonth='+(monthTo == undefined ? monthFrom :monthTo)).then((data) => {
        this.responseDateTitle = data;       
        dateTitle= this.responseDateTitle[0].DATE_TITLE;
      //  console.log("dateTitle"+dateTitle);
        if (dateTitle == "0"){
          this.dateAsOff="โปรดตรวจสอบช่วงเดือนอีกครั้ง";
         }else{
    
          this.dateAsOff =dateTitle;
         }
       //  console.log("this.dateAsOff"+this.dateAsOff);
       }); 
      }else{   
        this.dateAsOff = 'ข้อมูล '+dateDisplayAll;
      }
    }else{
      this.dateAsOff = 'ข้อมูล '+dateDisplayAll;
    }    
  }

  getChangNumber(typeCur){
    console.log(typeCur);
    let imp_register;
    let in_register;
    let total_register;

    for (var i = 0; i < this.responseData.length; i++) {
      imp_register = this.responseData[i].IMP_REGISTER;
      in_register = this.responseData[i].IN_REGISTER;
      total_register = this.responseData[i].TOTAL_REGISTER;

      if (imp_register != null) { imp_register = changeCurrencyNoUnit(imp_register, typeCur); }
      if (in_register != null) { in_register = changeCurrencyNoUnit(in_register, typeCur); }
      if (total_register != null) { total_register = changeCurrencyNoUnit(total_register, typeCur); }

      this.responseData[i].IMP_REGISTER = imp_register;
      this.responseData[i].IN_REGISTER = in_register;
      this.responseData[i].TOTAL_REGISTER = total_register;
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
