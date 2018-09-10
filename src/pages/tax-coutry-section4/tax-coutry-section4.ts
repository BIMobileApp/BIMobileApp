import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
declare var dateDisplayAll: any;
@IonicPage()
@Component({
  selector: 'page-tax-coutry-section4',
  templateUrl: 'tax-coutry-section4.html',
})
export class TaxCoutrySection4Page {
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
   area = 'ภาค 04';
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
     this.TableGetDataAll();
     this.GetProvinceTable();
   }

   selectionProvince(){
    this.webapi.getData('getAreaProvinceTaxCurYear?offcode='+this.offcode+'&area='+this.area).then((data) => {
      this.responseProvince = data;
    });
  }

  TableGetDataAll(){
    this.webapi.getData('TaxCurYearbyYear?offcode=' + this.offcode).then((data) => {
      this.DataCurYear = data;
      this.getTAX();
      this.getLAST_TAX();
      this.getEST();
      this.getPercent();
    });
    this.webapi.getData('TaxProductCurYearbyYear?offcode=' + this.offcode).then((data) => {
      this.DataProduct = data;
      this.getProductTAX();
      this.getProductLAST_TAX();
      this.getProductEST();
      this.getProductPERCENT_TAX();
    });
  }

GetProvinceTable(){
  this.webapi.getData('TaxProvinceCurYear?area=' + this.area).then((data) => {
    this.DataProvince = data;
    this.getProvinceTAX();
    this.getProvinceLAST_TAX();
    this.getProvinceEST();
    this.getProvincePERCENT_TAX();
  });
}

TableGetData(Province) {
  this.brance = 1;
  this.webapi.getData('TaxCurYearbyYear?offcode=' + this.offcode+'&area='+this.area+'&province='+Province).then((data) => {
    this.DataCurYear = data;
    this.getTAX();
    this.getLAST_TAX();
    this.getEST();
    this.getPercent();
  });
  this.webapi.getData('TaxProductCurYear?offcode=' + this.offcode+'&area='+this.area+'&province='+Province).then((data) => {
    this.DataProduct = data;
    this.getProductTAX();
    this.getProductLAST_TAX();
    this.getProductEST();
    this.getProductPERCENT_TAX();
  });
}

getPercent(){
  for (var i = 0; i < this.DataCurYear.length; i++) {
    if(this.DataCurYear[i].PERCENT_TAX != null){
      this.DataCurYear[i].PERCENT_TAX = this.DataCurYear[i].PERCENT_TAX.toFixed(2);
    }
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

TableProductGetData(area,Province) {
  console.log("area : "+area);
  if(area != this.oldArea){
    Province = 'undefined';
  }
  console.log("Province : "+Province);
  this.webapi.getData('TaxProductCurYear?offcode=' + this.offcode+'&area='+area+'&province='+Province).then((data) => {
    this.DataProduct = data;
    this.getProductTAX();
    this.getProductLAST_TAX();
    this.getProductEST();
    this.getProductPERCENT_TAX();
  });
}

getProductTAX() {
  let val;
  for (var i = 0; i < this.DataProduct.length; i++) {
    val = this.DataProduct[i].TAX / 1000000;
    val = val.toFixed(2);
    val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    this.DataProduct[i].TAX = val;
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

getProvinceTAX(){
  let val;
  for (var i = 0; i < this.DataProvince.length; i++) {
    val = this.DataProvince[i].TAX / 1000000
    val = val.toFixed(2);
    val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    this.DataProvince[i].TAX = val;
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

}
