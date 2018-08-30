import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-law-data-area',
  templateUrl: 'law-data-area.html',
})
export class LawDataAreaPage {

  responseData: any;
  responseArea: any;
  responseProvince: any;
  responseGroupName: any;
  repondProduct:any;
  offcode: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public webapi: RestProvider) {
      this.offcode = localStorage.offcode;
  }

  ionViewDidLoad() {
    this.getTableData();
    this.selectionArea();
    this.selectionProvince();
    this.selectionGeoupName();
    this.IncProductAll();
  }

   selectionArea(){
    this.webapi.getData('SelectionLawArea?offcode='+this.offcode).then((data) => {
      this.responseArea = data;
    });
  }

  selectionProvince(){
    this.webapi.getData('SelectionLawProvince?offcode='+this.offcode).then((data) => {
      this.responseProvince = data;
    });
  }

  selectionGeoupName(){
    this.webapi.getData('SelectionLawGroupName?offcode='+this.offcode).then((data) => {
      this.responseGroupName = data;

    });
  }

  getTableData() {
    this.webapi.getData('LawReportArea?offcode='+this.offcode).then((data) => {
        this.responseData = data;
        this.getTableLaw_qty();
        this.getTableTarget_qty();
        this.getTableLaw_amt();
        this.getTableTarget_amt();
        this.getTableTrea_money();
    });
}


IncProductAll(){
  this.webapi.getData('LawProductAreaAll?offcode='+this.offcode).then((data) => {
    this.repondProduct = data;
    this.getTableData();
    this.getlowqty();
    this.gettargetqty();
    this.getlowamt();
    this.gettargetamt();
    this.getmoney();
  });
}

getlowqty(){
  let val;
  for (var i = 0; i < this.repondProduct.length; i++) {
    val = this.repondProduct[i].LAW_QTY;
    val = val.toFixed(2);
    val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    this.repondProduct[i].LAW_QTY = val;
  }
}

gettargetqty(){
  let val;
  for (var i = 0; i < this.repondProduct.length; i++) {
    val = this.repondProduct[i].TARGET_QTY;
    val = val.toFixed(2);
    val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    this.repondProduct[i].TARGET_QTY = val;
  }
}

getlowamt(){
  let val;
  for (var i = 0; i < this.repondProduct.length; i++) {
    val = this.repondProduct[i].TARGET_AMT/1000000;
    val = val.toFixed(2);
    val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    this.repondProduct[i].TARGET_AMT = val;
  }
}

gettargetamt(){
  let val;
  for (var i = 0; i < this.repondProduct.length; i++) {
    val = this.repondProduct[i].TARGET_AMT/1000000;
    val = val.toFixed(2);
    val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    this.repondProduct[i].TARGET_AMT = val;
  }
}

getmoney(){
  let val;
  for (var i = 0; i < this.repondProduct.length; i++) {
    val = this.repondProduct[i].TREASURY_MONEY/1000000;
    val = val.toFixed(2);
    val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    this.repondProduct[i].TREASURY_MONEY = val;
  }
}

getitemsRegion(area,province,group_name){
  this.webapi.getData('LawProductByArea?offcode='+this.offcode+'&region='+area+'&province='+province+'&group_desc='+group_name ).then((data) => {
    this.repondProduct = data;
    this.getTableData();
    this.getlowqty();
    this.gettargetqty();
    this.getlowamt();
    this.gettargetamt();
    this.getmoney();
  });
}

getitemsProvince(area,province,group_name){
  this.webapi.getData('LawProductByArea?offcode='+this.offcode+'&region='+area+'&province='+province+'&group_desc='+group_name ).then((data) => {
    this.repondProduct = data;
    this.getTableData();
    this.getlowqty();
    this.gettargetqty();
    this.getlowamt();
    this.gettargetamt();
    this.getmoney();
  });
}

getitemsGroupName(area,province,group_name){
  this.webapi.getData('LawProductByArea?offcode='+this.offcode+'&region='+area+'&province='+province+'&group_desc='+group_name ).then((data) => {
  this.repondProduct = data;
  this.getTableData();
    this.getlowqty();
    this.gettargetqty();
    this.getlowamt();
    this.gettargetamt();
    this.getmoney();
});
}

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
