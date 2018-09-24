import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

declare var dateDisplayAll:any;
declare var changeCurrency: any;
/* start for pinch */
const MAX_SCALE = 11.1;
const MIN_SCALE = 0.9;
const BASE_SCALE = 1.3;
/* end  */
@IonicPage()
@Component({
  selector: 'page-law-data-mth',
  templateUrl: 'law-data-mth.html',
})
export class LawDataMthPage {

responseData: any;
offcode: any;
username:any;
dateAsOff:any;

responseArea:any;
responseProvince:any;

repondProductSura:any;

  SProvince:any;
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
  toggleTable2 = 0;
  toggleTable1 = 0;
/* start for pinch */
public fontSize = `${BASE_SCALE}rem`;
private scale = BASE_SCALE;
private alreadyScaled = BASE_SCALE;
public isScaling = false;
/* end  */

constructor(
  public navCtrl: NavController, 
  public navParams: NavParams,
  public webapi: RestProvider) {

    this.username = localStorage.userData;
    this.offcode = localStorage.offcode;
    this.dateAsOff =  dateDisplayAll;

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
  let typeCur = 'B';
  let typeCurFirst = 'B';

  this.selectionAreaAll();
  this.selectionProvinceAll();
  this.getTableData(typeCurFirst);

  let SRegion;
  let SProvince; 
 
  this.getProductAll(SRegion,SProvince,typeCur);
}
toggleTable2Show() {
  if (this.toggleTable2 == 0) {
    this.toggleTable2 = 1;
  } else {
    this.toggleTable2 = 0;
  }
}

toggleTable1Show() {
  if (this.toggleTable1 == 0) {
    this.toggleTable1 = 1;
  } else {
    this.toggleTable1 = 0;
  }
}
selectionAreaAll(){
    this.webapi.getData('ddlMRegion?offcode=' + this.offcode).then((data) => {
      this.responseArea = data;
    });
}

selectionProvinceAll(){
  let area;
  if(this.region != "00"){
    area = localStorage.region_desc;
  }

  this.webapi.getData('ddlMProvince?offcode=' + this.offcode + '&area='+area).then((data) => {
    this.responseProvince = data;
  });
}


getitemsRegion(SRegion,SProvince,typeCur){
  SProvince = 'undefined';
  this.SProvince =  'undefined';

  this.getitemsProvince(SRegion,SProvince,typeCur);
  //this.getProductAll(area,province,typeCur);
}

getitemsProvince(SRegion,SProvince,typeCur){ 

  if(this.region != "00"){
    SRegion = localStorage.region_desc;
  }

  this.webapi.getData('ddlMProvince?offcode=' + this.offcode + '&area=' + SRegion).then((data) => {
    this.responseProvince = data;
  });

  this.getProductAll(SRegion,SProvince,typeCur);
}

getTableData(typeCurFirst) { 
  this.webapi.getData('LawReportMth?offcode='+this.offcode).then((data) => {
    this.responseData = data;
    this.getTableLaw(typeCurFirst);
  });
}

///select all product///
getProductAll(SRegion,SProvince,typeCur){
  
  if(this.region != "00"){
    SRegion = localStorage.region_desc;
  }else{
    SRegion = SRegion;
  }

  if(this.branch != "00" || this.province != "00"){
    SProvince = this.select_province;
  }else{
    SProvince = SProvince;
  }
  alert("ภาค="+SRegion+" จังหวัด="+ SProvince+" หน่วย="+ typeCur);
  this.webapi.getData('LawProduct?offcode='+this.offcode+'&region='+SRegion+'&province='+SProvince).then((data) => {
    this.repondProductSura = data; 
    this.getTableTAX(typeCur);
  });
}

getTableTAX(typeCur){
  let law_qty;
  let tar_qty;
  let law_amt;
  let tar_amt;
  let money;

  for (var i = 0; i < this.repondProductSura.length; i++) {
    law_qty = this.repondProductSura[i].LAW_QTY;
    tar_qty = this.repondProductSura[i].TARGET_QTY;
    law_amt = this.repondProductSura[i].LAW_AMT;
    tar_amt = this.repondProductSura[i].TARGET_AMT;
    money = this.repondProductSura[i].TREASURY_MONEY;

    if (law_qty != null) { law_qty = changeCurrency(law_qty, typeCur); }
    if (tar_qty != null) { tar_qty = changeCurrency(tar_qty, typeCur); }
    if (law_amt != null) { law_amt = changeCurrency(law_amt, typeCur); }
    if (tar_amt != null) { tar_amt = changeCurrency(tar_amt, typeCur); }
    if (money != null) { money = changeCurrency(money, typeCur); }

    this.repondProductSura[i].LAW_QTY = law_qty;
    this.repondProductSura[i].TARGET_QTY = tar_qty;
    this.repondProductSura[i].LAW_AMT = law_amt;
    this.repondProductSura[i].TARGET_AMT = tar_amt;
    this.repondProductSura[i].TREASURY_MONEY = money;
  }
}

getTableLaw(typeCurFirst){
  let law_qty;
  let tar_qty;
  let law_amt;
  let tar_amt;
  let money;

  for (var i = 0; i < this.responseData.length; i++) {
    law_qty = this.responseData[i].LAW_QTY;
    tar_qty = this.responseData[i].TARGET_QTY;
    law_amt = this.responseData[i].LAW_AMT;
    tar_amt = this.responseData[i].TARGET_AMT;
    money = this.responseData[i].TREASURY_MONEY;

    if (law_qty != null) { law_qty = changeCurrency(law_qty, typeCurFirst); }
    if (tar_qty != null) { tar_qty = changeCurrency(tar_qty, typeCurFirst); }
    if (law_amt != null) { law_amt = changeCurrency(law_amt, typeCurFirst); }
    if (tar_amt != null) { tar_amt = changeCurrency(tar_amt, typeCurFirst); }
    if (money != null) { money = changeCurrency(money, typeCurFirst); }

    this.responseData[i].LAW_QTY = law_qty;
    this.responseData[i].TARGET_QTY = tar_qty;
    this.responseData[i].LAW_AMT = law_amt;
    this.responseData[i].TARGET_AMT = tar_amt;
    this.responseData[i].TREASURY_MONEY = money;
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
