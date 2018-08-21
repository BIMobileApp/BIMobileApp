import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-old-report-bi-1-month',
  templateUrl: 'old-report-bi-1-month.html',
})
export class OldReportBi_1MonthPage {
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

    this.webapi.getData('OldREPORT_BI_1_MONTH').then((data) => {
    this.responseData = data;
    console.log(this.responseData);
    this.getTableTAX();
    this.getTableESTIMATE();
    this.getTableTAX_LY();
    this.getTableCOMPARE_EST();
    this.getTableCOMPARE_TAX();
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
  


}
