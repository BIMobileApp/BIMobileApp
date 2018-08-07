import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App } from 'ionic-angular';
import { CheckDeliveryAllTaxPage } from '../check-delivery-all-tax/check-delivery-all-tax';

@IonicPage()
@Component({
  selector: 'page-old-report-menu-group1',
  templateUrl: 'old-report-menu-group1.html',
})
export class OldReportMenuGroup1Page {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public app:App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OldReportMenuGroup1Page');
  }

  CheckDeliveryAllTax(){
    this.app.getRootNav().push(CheckDeliveryAllTaxPage);  
  }

}
