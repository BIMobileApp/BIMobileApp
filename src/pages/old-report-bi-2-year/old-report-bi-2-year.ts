import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-old-report-bi-2-year',
  templateUrl: 'old-report-bi-2-year.html',
})
export class OldReportBi_2YearPage {
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

    this.webapi.getData('OldREPORT_BI_2_YEAR').then((data) => {
    this.responseData = data;
    console.log(this.responseData);
    this.getTableTAX();
    this.getTableESTIMATE();
    this.getTableTAX_LY();
    this.getTableCOMPARE_EST();
    this.getTableCOMPARE_TAX();
   /* this.getTableESTIMATE_PER();
    this.getTableLAST_TAX_PER();*/
  });
}

  getTableTAX() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].TAX_NETTAX_AMT/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].TAX_NETTAX_AMT = val;
    }
  }

  

  getTableESTIMATE() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].ESTIMATE/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].ESTIMATE = val;
    }
  }

  getTableTAX_LY() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].LAST_TAX_NETTAX_AMT/1000000
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].LAST_TAX_NETTAX_AMT = val;
    }
  }

  getTableCOMPARE_EST() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].COMPARE_ESTIMATE/1000000
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].COMPARE_ESTIMATE = val;
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

 /* getTableESTIMATE_PER() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].ESTIMATE_PERCENTAGE;
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].ESTIMATE_PERCENTAGE = val;
    }
  }
  getTableLAST_TAX_PER() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].LAST_TAX_PERCENTAGE;
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].LAST_TAX_PERCENTAGE = val;
    }
  }*/
  


}
