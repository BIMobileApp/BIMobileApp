import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-tax-group-source',
  templateUrl: 'tax-group-source.html',
})
export class TaxGroupSourcePage {

  responseData: any;
  username:any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public webapi:RestProvider) {
      this.username = localStorage.userData;
  }

  ionViewDidLoad() {
    this.webapi.getData('TaxProductGroupSource').then((data)=>{
      this.responseData = data;
      this.getTableINCOME();
      this.getTableIMPORT();
      this.getTableSUM_ALL();
    });
  }

  getTableINCOME() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].INCOME/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].INCOME = val;
    }
  }
  getTableIMPORT() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].IMPORT/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].IMPORT = val;
    }
  }
  getTableSUM_ALL() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].SUM_ALL/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].SUM_ALL = val;
    }
  }
}
