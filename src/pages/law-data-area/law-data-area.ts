import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-law-data-area',
  templateUrl: 'law-data-area.html',
})
export class LawDataAreaPage {
  //Table Pram
  responseData: any;
  responseArea: any;
  responseProvince: any;
  responseGroupName: any;
  offcode: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public webapi: RestProvider) {
  }

  ionViewDidLoad() {
    this.UserAthu();

  }
  UserAthu() {
    this.offcode = localStorage.offcode;
    this.selectionArea();
    //this.getTableData();
  }

  selectionArea(){
    this.webapi.getData('LawReportArea?offcode='+this.offcode).then((data) => {
      this.responseArea = data;
    });
  }

  selectionProvince(){
    this.webapi.getData('LawReportArea?offcode='+this.offcode).then((data) => {
      this.responseProvince = data;
    });
  }

  selectionGeoupName(){
    this.webapi.getData('LawReportArea?offcode='+this.offcode).then((data) => {
      this.responseGroupName = data;

    });
  }

  getTableData(region,province,group_desc) {
    this.webapi.getData('LawReportArea?offcode='+this.offcode+'&region='+region+"&province="+province+"&group_desc="+group_desc ).then((data) => {
    this.responseData = data;
    this.getTableLaw_qty();
    this.getTableTarget_qty();
    this.getTableLaw_amt();
    this.getTableTarget_amt();
    this.getTableTrea_money();
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
