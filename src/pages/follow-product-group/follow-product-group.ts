import { Component } from '@angular/core';
import { IonicPage, NavController,App, NavParams } from 'ionic-angular';
import { OldReportBarAllTaxPage } from '../old-report-bar-all-tax/old-report-bar-all-tax';

/**
 * Generated class for the FollowProductGroupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
    console.log('ionViewDidLoad FollowProductGroupPage');
  }

  OldBarAllTax(){
    this.app.getRootNav().push(OldReportBarAllTaxPage); 
  }
}
