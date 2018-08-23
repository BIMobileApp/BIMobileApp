import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-old-report-bi-law2-1',
  templateUrl: 'old-report-bi-law2-1.html',
})
export class OldReportBi_Law21Page {
  responseData: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public webapi: RestProvider) {
  }

  ionViewDidLoad() {
    this.getTableData();
  }

  getTableData() {

    this.webapi.getData('OldREPORT_BI_Law2_1').then((data) => {
    this.responseData = data;
    console.log(this.responseData);
    this.getTableLAW_AMT();
    this.getTableTARGET_AMT();
    this.getTableL_LAW_AMT();
    this.getTableCOMPARE_TARGET();
    this.getTableCOMPARE_TAX();
  });
}

  getTableLAW_AMT() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {      
       let val2;
       val2 = this.responseData[i].LAW_TYPE;  
        if(val2=='คดี'){
          val = this.responseData[i].LAW_AMT;
        }else{
          val = this.responseData[i].LAW_AMT/1000000;
        }
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].LAW_AMT = val;
    }
  }

  

  getTableTARGET_AMT() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].TARGET_AMT/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].TARGET_AMT = val;
    }
  }

  getTableL_LAW_AMT() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].L_LAW_AMT/1000000
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].L_LAW_AMT = val;
    }
  }

  getTableCOMPARE_TARGET() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].COMPARE_TARGET/1000000
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].COMPARE_TARGET = val;
    }
  }


  getTableCOMPARE_TAX() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].COMPARE_TAX/1000000
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].COMPARE_TAX = val;
    }
  }
  


}
