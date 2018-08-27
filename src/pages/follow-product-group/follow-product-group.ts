import { Component } from '@angular/core';
import { IonicPage, NavController,App, NavParams } from 'ionic-angular';
import { OldReportBarAllTaxPage } from '../old-report-bar-all-tax/old-report-bar-all-tax';
import { CheckDeliveryAllTaxPage } from '../check-delivery-all-tax/check-delivery-all-tax';

@IonicPage()
@Component({
  selector: 'page-follow-product-group',
  templateUrl: 'follow-product-group.html',
})
export class FollowProductGroupPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public app:App) {
  }

  ionViewDidLoad() {
  }

  OldBarAllTax(){
    this.app.getRootNav().push(OldReportBarAllTaxPage); 
  }

  CheckDeliveryAllTax(){
    this.app.getRootNav().push(CheckDeliveryAllTaxPage);  
  }
}
