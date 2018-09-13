import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

declare var dateDisplayAll:any;

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
repondProductSica:any;
repondProductCard:any;

constructor(
  public navCtrl: NavController, 
  public navParams: NavParams,
  public webapi: RestProvider) {

    this.username = localStorage.userData;
    this.offcode = localStorage.offcode;
    this.dateAsOff =  dateDisplayAll;
}

ionViewDidLoad() {
  this.selectionAreaAll();
  this.selectionProvinceAll();
  this.getTableData();
  this.getProductSuraAll();
  this.getProductSicaAll();
  this.getProductCardAll();
}

selectionAreaAll(){
    this.webapi.getData('ddlMRegion?offcode=' + this.offcode).then((data) => {
      this.responseArea = data;
    });
}

selectionProvinceAll(){
  this.webapi.getData('ddlMProvince?offcode=' + this.offcode + '&area=undefined').then((data) => {
    this.responseProvince = data;
  });
}


getitemsRegion(area,province){
  //province = undefined;
  //console.info("Selected:",province);

  //province = localStorage.getItem('index');

  this.webapi.getData('ddlMRegion?offcode=' + this.offcode).then((data) => {
    this.responseArea = data;

    this.getitemsProvince(area,province);
    this.getTableDataSura(area,province);
    this.getTableDataSica(area,province);
    this.getTableDataCard(area,province);
  });
  province = 'undefined';

}

getitemsProvince(area,province){
 
  this.webapi.getData('ddlMProvince?offcode=' + this.offcode + '&area=' + area).then((data) => {
    this.responseProvince = data;
  });
  this.getTableDataSura(area,province);
  this.getTableDataSica(area,province);
  this.getTableDataCard(area,province);
}

getTableData() { 
  this.webapi.getData('LawReportMth?offcode='+this.offcode).then((data) => {
  this.responseData = data;
  this.getTableLaw_qty();
  this.getTableTarget_qty();
  this.getTableLaw_amt();
  this.getTableTarget_amt();
  this.getTableTrea_money();
});
}

///select all product///
  ///Sura
  getProductSuraAll(){
    this.webapi.getData('LawProductByMthAll?offcode='+this.offcode+'&group_name=สุรา').then((data) => {
      this.repondProductSura = data;
    });
  }

   ///Sica
  getProductSicaAll(){
    this.webapi.getData('LawProductByMthAll?offcode='+this.offcode+'&group_name=ยาสูบ').then((data) => {
      this.repondProductSica = data;
    });
  }

  ///Card
  getProductCardAll(){
    this.webapi.getData('LawProductByMthAll?offcode='+this.offcode+'&group_name=ไพ่').then((data) => {
      this.repondProductCard = data;
    });
  }
///end select all product///


/// fillter  Product ///

getTableDataSura(area,province){
  this.webapi.getData('LawProductByMth?offcode='+this.offcode+'&region='+area+'&province='+province+'&group_desc=สุรา').then((data) => {
    this.repondProductSura = data;
  });
}

getTableDataSica(area,province){
  this.webapi.getData('LawProductByMth?offcode='+this.offcode+'&region='+area+'&province='+province+'&group_desc=ยาสูบ').then((data) => {
    this.repondProductSica = data;
  });
}

getTableDataCard(area,province){
  this.webapi.getData('LawProductByMth?offcode='+this.offcode+'&region='+area+'&province='+province+'&group_desc=ไพ่').then((data) => {
    this.repondProductCard = data;
  });
}

/// end fillter  Product ///

getTableLaw_qty() {
let val;
for (var i = 0; i < this.responseData.length; i++) {
  val = this.responseData[i].LAW_QTY
  val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  this.responseData[i].LAW_QTY = val;
}
}

getTableTarget_qty() {
let val;
for (var i = 0; i < this.responseData.length; i++) {
  val = this.responseData[i].TARGET_QTY;
  val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  this.responseData[i].TARGET_QTY = val;
}
}

getTableLaw_amt() {
let val;
for (var i = 0; i < this.responseData.length; i++) {
  val = this.responseData[i].LAW_AMT/1000000;
  val = val.toFixed(2);
  val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  this.responseData[i].LAW_AMT = val;
}
}

getTableTarget_amt() {
let val;
for (var i = 0; i < this.responseData.length; i++) {
  val = this.responseData[i].TARGET_AMT/1000000;
  val = val.toFixed(2);
  val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  this.responseData[i].TARGET_AMT = val;
}
}

getTableTrea_money() {
let val;
for (var i = 0; i < this.responseData.length; i++) {
  val = this.responseData[i].TREASURY_MONEY/1000000;
  val = val.toFixed(2);
  val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  this.responseData[i].TREASURY_MONEY = val;
}
}
}
