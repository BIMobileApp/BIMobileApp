import { Component } from '@angular/core';
import { IonicPage, NavController, App, NavParams } from 'ionic-angular';
import { FollowProductGroupPage } from '../follow-product-group/follow-product-group';

/**
 * Generated class for the OldReportMenuGroup1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import { CheckDeliveryAllTaxPage } from '../check-delivery-all-tax/check-delivery-all-tax';

@IonicPage()
@Component({
  selector: 'page-old-report-menu-group1',
  templateUrl: 'old-report-menu-group1.html',
})
export class OldReportMenuGroup1Page {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public app:App
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OldReportMenuGroup1Page');
  }

  gotofollowProduct(){
    this.app.getRootNav().push(FollowProductGroupPage); 
  }

  

}
