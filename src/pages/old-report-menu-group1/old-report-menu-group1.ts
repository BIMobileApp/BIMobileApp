import { Component } from '@angular/core';
import { IonicPage, NavController, App, NavParams } from 'ionic-angular';
import { FollowProductGroupPage } from '../follow-product-group/follow-product-group';

import { CheckDeliveryAllTaxPage } from '../check-delivery-all-tax/check-delivery-all-tax';

@IonicPage()
@Component({
  selector: 'page-old-report-menu-group1',
  templateUrl: 'old-report-menu-group1.html',
})
export class OldReportMenuGroup1Page {
  username:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public app:App
  ) {
    this.username = localStorage.userData;
  }

  ionViewDidLoad() {
  }

  gotofollowProduct(){
    this.app.getRootNav().push(FollowProductGroupPage); 
  }

  

}
