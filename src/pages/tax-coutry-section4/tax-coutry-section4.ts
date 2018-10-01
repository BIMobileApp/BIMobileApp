import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

declare var dateDisplayAll: any;
declare var changeCurrency: any;

/* start for pinch */
const MAX_SCALE = 11.1;
const MIN_SCALE = 0.9;
const BASE_SCALE = 1.3;
/* end  */
@IonicPage()
@Component({
  selector: 'page-tax-coutry-section4',
  templateUrl: 'tax-coutry-section4.html',
})
export class TaxCoutrySection4Page {
  username:any;
  dateAsOff = "";
  offcode: any;
  region:any;
  province:any;
  branch:any;

   //Table parm
   DataCurYear: any;
   DataProduct: any;
   DataGauge: any;
   DataProvince: any;
   DataOverallBranch:any;
   Data = [];
   TAX = [];
   TAX_LY = [];
   EST = [];
 
   ProdTAX = [];
   ProdTAX_LY = [];
   ProdEST = [];
   responseProvince:any;
   oldArea:any;
   brance = 0;
   area = 'ภาค 04';
   curTG = "ล้านบาท";
   display_province_fillter = "";

/* start for pinch */
public fontSize = `${BASE_SCALE}rem`;
private scale = BASE_SCALE;
private alreadyScaled = BASE_SCALE;
public isScaling = false;
/* end  */

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public app: App,
    public webapi: RestProvider) {
    this.username = localStorage.userData;
    this.dateAsOff = dateDisplayAll;
    this.offcode = localStorage.offcode;

       ///หา offcode เพื่อหา ภาค จังหวัด สาขา
       this.region = localStorage.offcode.substring(0, 2);
       this.province = localStorage.offcode.substring(2, 4);
       this.branch =  localStorage.offcode.substring(4, 6);
  }

  ionViewDidLoad() {
    this.UserAthu();
    this.dateAsOff = dateDisplayAll;
  }
  UserAthu() {
    
     this.selectionProvince();
     //this.TableGetDataAll();
     let typeCurFirst = 'M';
     this.GetProvinceTable(typeCurFirst);
     var Province = undefined;
     let typeCur = 'M';
     this.TableGetData(Province,typeCur);
     this.brance = 0;
     this.OverallBranch(this.area, Province, typeCur);
   }

   selectionProvince(){
    this.webapi.getData('getAreaProvinceTaxCurYear?offcode='+this.offcode+'&area='+this.area).then((data) => {
      this.responseProvince = data;
    });
  }

  TableGetDataAll(typeCur){
    if(typeCur == "M"){
      this.curTG = "ล้านบาท";
    }else{
      this.curTG = "บาท";
    }

    this.webapi.getData('TaxCurYearbyYear?offcode=' + this.offcode).then((data) => {
      this.DataCurYear = data;
      this.getTAX(typeCur);
    });
    this.webapi.getData('TaxProductCurYearbyYear?offcode=' + this.offcode).then((data) => {
      this.DataProduct = data;
      this.getProductTAX(typeCur);
    });
  }

GetProvinceTable(typeCurFirst){
  this.webapi.getData('TaxProvinceCurYear?area=' + this.area+'&offcode='+this.offcode).then((data) => {
    this.DataProvince = data;
    this.getProvinceTAX(typeCurFirst);
  });
}

regionSelectType = "";
TableGetData(Province,typeCur) {
  if(Province != "undefined"){
    this.display_province_fillter = Province;
   }else{
    this.display_province_fillter = "";
   }

   if(typeCur == undefined){
    this.regionSelectType = "M";
  }else{
    this.regionSelectType =  typeCur;
  }

  if(typeCur == "M"){
    this.curTG = "ล้านบาท";
  }else if(typeCur == undefined){
    this.curTG = "ล้านบาท";
  }else{
    this.curTG = "บาท";
  }

  this.brance = 1;
  this.webapi.getData('TaxCurYearbyYear?offcode=' + this.offcode+'&area='+this.area+'&province='+Province).then((data) => {
    this.DataCurYear = data;
    this.getTAX(this.regionSelectType );
  });
  this.webapi.getData('TaxProductCurYear?offcode=' + this.offcode+'&area='+this.area+'&province='+Province).then((data) => {
    this.DataProduct = data;
    this.getProductTAX(this.regionSelectType );
  });
  this.OverallBranch(this.area, Province, this.regionSelectType );
}

OverallBranch(area, Province, typeCur){

  if (this.branch != "00" || this.province != "00") {
    Province = localStorage.offcode.substring(2, 4);
  } else {
    Province = Province;
  }

  this.webapi.getData('TaxOverallBranch?&region='+this.area+'&province='+Province).then((data) => {
    this.DataOverallBranch = data;
    this.getTaxBranch(typeCur);
  });
 }

 getTaxBranch(typeCur){
  let tax_branch;
  let last_tax_branch;
  for (var i = 0; i < this.DataOverallBranch.length; i++) {
    tax_branch = this.DataOverallBranch[i].TAX;
    if (tax_branch != null) { tax_branch = changeCurrency(tax_branch, typeCur); }
    this.DataOverallBranch[i].TAX = tax_branch;

    last_tax_branch = this.DataOverallBranch[i].LAST_TAX;
    if (last_tax_branch != null) { last_tax_branch = changeCurrency(last_tax_branch, typeCur); }
    this.DataOverallBranch[i].LAST_TAX = last_tax_branch;
  }
 }

getPercent(){
  for (var i = 0; i < this.DataCurYear.length; i++) {
    if(this.DataCurYear[i].PERCENT_TAX != null){
      this.DataCurYear[i].PERCENT_TAX = this.DataCurYear[i].PERCENT_TAX.toFixed(2);
    }
  }
}

getTAX(typeCur) {
  let tax;
  let last_tax;
  let est;

  for (var i = 0; i < this.DataCurYear.length; i++) {

    tax = this.DataCurYear[i].TAX;
    last_tax = this.DataCurYear[i].LAST_TAX;
    est = this.DataCurYear[i].ESTIMATE;

    if (tax != null) { tax = changeCurrency(tax, typeCur); }
    if (last_tax != null) { last_tax = changeCurrency(last_tax, typeCur); }
    if (est != null) { est = changeCurrency(est, typeCur); }

    this.DataCurYear[i].TAX = tax;
    this.DataCurYear[i].LAST_TAX = last_tax;
    this.DataCurYear[i].ESTIMATE = est;
  }
}



getEST() {
  let val;
  for (var i = 0; i < this.DataCurYear.length; i++) {
    val = this.DataCurYear[i].ESTIMATE / 1000000
    val = val.toFixed(2);
    val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    this.DataCurYear[i].ESTIMATE = val;
  }
}

TableProductGetData(area,Province,typeCur) {
  
  if(area != this.oldArea){
    Province = 'undefined';
  }

  this.webapi.getData('TaxProductCurYear?offcode=' + this.offcode+'&area='+area+'&province='+Province).then((data) => {
    this.DataProduct = data;
    this.getProductTAX(typeCur);
    this.getProductLAST_TAX();
    this.getProductEST();
    this.getProductPERCENT_TAX();
  });
}

getProductTAX(typeCur) {
  let tax;
  let last_tax;
  let est;

  for (var i = 0; i < this.DataProduct.length; i++) {
    tax = this.DataProduct[i].TAX;
    last_tax = this.DataProduct[i].LAST_TAX;
    est = this.DataProduct[i].ESTIMATE;

    if (tax != null) { tax = changeCurrency(tax, typeCur); }
    if (last_tax != null) { last_tax = changeCurrency(last_tax, typeCur); }
    if (est != null) { est = changeCurrency(est, typeCur); }

    this.DataProduct[i].TAX = tax;
    this.DataProduct[i].LAST_TAX = last_tax;
    this.DataProduct[i].ESTIMATE = est;
  }
}

getProductLAST_TAX() {
  let val;
  for (var i = 0; i < this.DataProduct.length; i++) {
    val = this.DataProduct[i].LAST_TAX / 1000000;
    val = val.toFixed(2);
    val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    this.DataProduct[i].LAST_TAX = val;
  }
}

getProductEST() {
  let val;
  for (var i = 0; i < this.DataProduct.length; i++) {
    val = this.DataProduct[i].ESTIMATE / 1000000
    val = val.toFixed(2);
    val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    this.DataProduct[i].ESTIMATE = val;
  }
}

getProductPERCENT_TAX(){
  for (var i = 0; i < this.DataProduct.length; i++) {
    if(this.DataProduct[i].PERCENT_TAX != null){
      this.DataProduct[i].PERCENT_TAX = this.DataProduct[i].PERCENT_TAX.toFixed(2);
    }
  }
}

getProvinceTAX(typeCurFirst){
  let tax;
  let last_tax;
  let est;

  for (var i = 0; i < this.DataProvince.length; i++) {
    tax = this.DataProvince[i].TAX;
    last_tax = this.DataProvince[i].LAST_TAX;
    est = this.DataProvince[i].ESTIMATE;

    if (tax != null) { tax = changeCurrency(tax, typeCurFirst); }
    if (last_tax != null) { last_tax = changeCurrency(last_tax, typeCurFirst); }
    if (est != null) { est = changeCurrency(est, typeCurFirst); }

    this.DataProvince[i].TAX = tax;
    this.DataProvince[i].LAST_TAX = last_tax;
    this.DataProvince[i].ESTIMATE = est;
  }
}
getProvinceLAST_TAX(){
  let val;
  for (var i = 0; i < this.DataProvince.length; i++) {
    val = this.DataProvince[i].LAST_TAX / 1000000
    val = val.toFixed(2);
    val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    this.DataProvince[i].LAST_TAX = val;
  }
}
getProvinceEST(){
  let val;
  for (var i = 0; i < this.DataProvince.length; i++) {
    val = this.DataProvince[i].ESTIMATE / 1000000
    val = val.toFixed(2);
    val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    this.DataProvince[i].ESTIMATE = val;
  }
}
getProvincePERCENT_TAX(){
  for (var i = 0; i < this.DataProvince.length; i++) {
    if(this.DataProvince[i].PERCENT_TAX != null){
      this.DataProvince[i].PERCENT_TAX = this.DataProvince[i].PERCENT_TAX.toFixed(2);
    }
  }
}

ChangeUnitFirst(typeCurFirst){
  this.GetProvinceTable(typeCurFirst);
}

ChangeUnit(Province,typeCur){
  this.TableGetData(Province,typeCur);
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
