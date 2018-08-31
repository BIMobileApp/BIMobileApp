import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-taxbudgetyear',
  templateUrl: 'taxbudgetyear.html',
})
export class TaxbudgetyearPage {
  username:any;
  responseData: any;
  constructor(public navCtrl: NavController,
                      public navParams: NavParams,
                      public webapi:RestProvider) {
                        this.username = localStorage.userData;
  }

  ionViewDidLoad() {
    this.getTableData(); 
  }

  getTableData() {
    this.webapi.getData('TaxBudgetYear').then((data)=>{
      this.responseData = data;
      this.getTableTAX();
      this.getTableTAX_LY();
      this.getTableEST();
    });
  }
  getTableTAX() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].TAX / 1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].TAX = val;
    }
  }
  getTableTAX_LY() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].TAX_LY / 1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].TAX_LY = val;
    }
  }
  getTableEST() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].ESTIMATE / 1000000
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].ESTIMATE = val;
    }
  }
}
