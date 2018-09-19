import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

declare var dateDisplayAll: any;
declare var changeCurrency: any;

@IonicPage()
@Component({
  selector: 'page-tax-coutry-section1',
  templateUrl: 'tax-coutry-section1.html',
})
export class TaxCoutrySection1Page {
  username:any;
  dateAsOff = "";
  offcode: any;

   //Table parm
   DataCurYear: any;
   DataProduct: any;
   DataGauge: any;
   DataProvince: any;
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
   area = 'ภาค 01';
   curTG = "บาท";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public app: App,
    public webapi: RestProvider) {
    this.username = localStorage.userData;
    this.dateAsOff = dateDisplayAll;
  }

  ionViewDidLoad() {
    this.UserAthu();
    this.dateAsOff = dateDisplayAll;
  }
  UserAthu() {
    this.offcode = localStorage.offcode;
     this.selectionProvince();
     //this.TableGetDataAll();
     let typeCurFirst = 'B';
     this.GetProvinceTable(typeCurFirst);
     var Province = undefined;

     let typeCur = 'B';
     this.TableGetData(Province,typeCur);
     this.brance = 0;
   }

   selectionProvince(){
    this.webapi.getData('getAreaProvinceTaxCurYear?offcode='+this.offcode+'&area='+this.area).then((data) => {
      this.responseProvince = data;
    });
  }

  TableGetDataAll(typeCur){
    this.webapi.getData('TaxCurYearbyYear?offcode=' + this.offcode).then((data) => {
      this.DataCurYear = data;
      this.getTAX();
      this.getLAST_TAX();
      this.getEST();
      this.getPercent();
    });
    this.webapi.getData('TaxProductCurYearbyYear?offcode=' + this.offcode).then((data) => {
      this.DataProduct = data;
     this.getProductTAX(typeCur);
      /*this.getProductLAST_TAX();
      this.getProductEST();
      this.getProductPERCENT_TAX();*/
    });
  }

GetProvinceTable(typeCurFirst){
  this.webapi.getData('TaxProvinceCurYear?area=' + this.area).then((data) => {
    this.DataProvince = data;
    this.getProvinceTAX(typeCurFirst);
  });
}

TableGetData(Province,typeCur) {

  if(typeCur == "M"){
    this.curTG = "ล้านบาท";
  }else{
    this.curTG = "บาท";
  }

  this.brance = 1;
  this.webapi.getData('TaxCurYearbyYear?offcode=' + this.offcode+'&area='+this.area+'&province='+Province).then((data) => {
    this.DataCurYear = data;
    this.getDataTAX(typeCur);
    /*this.getTAX();
    this.getLAST_TAX();
    this.getEST();
    this.getPercent();*/
  });
  this.webapi.getData('TaxProductCurYear?offcode=' + this.offcode+'&area='+this.area+'&province='+Province).then((data) => {
    this.DataProduct = data;
    this.getProductTAX(typeCur);
    /*this.getProductLAST_TAX();
    this.getProductEST();
    this.getProductPERCENT_TAX();*/
  });
}

getPercent(){
  for (var i = 0; i < this.DataCurYear.length; i++) {
    if(this.DataCurYear[i].PERCENT_TAX != null){
      this.DataCurYear[i].PERCENT_TAX = this.DataCurYear[i].PERCENT_TAX.toFixed(2);
    }
  }
}

getDataTAX(typeCur){
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

getTAX() {
  let val;
  for (var i = 0; i < this.DataCurYear.length; i++) {
    val = this.DataCurYear[i].TAX / 1000000;
    val = val.toFixed(2);
    val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    this.DataCurYear[i].TAX = val;
  }
}

getLAST_TAX() {
  let val;
  for (var i = 0; i < this.DataCurYear.length; i++) {
    val = this.DataCurYear[i].LAST_TAX / 1000000;
    val = val.toFixed(2);
    val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    this.DataCurYear[i].LAST_TAX = val;
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

ChangeUnit(Province, typeCur){
  this.TableGetData(Province,typeCur);
}

ChangeUnitFirst(typeCurFirst){
  this.GetProvinceTable(typeCurFirst);
}

}
