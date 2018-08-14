import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { RadialGauge } from '../../JS/RadialGauge.js';


@IonicPage()
@Component({
  selector: 'page-tax-monthly-freezone',
  templateUrl: 'tax-monthly-freezone.html',
})
export class TaxMonthlyFreezonePage {
    TaxGauge: any;
    TaxlyGauge: any;
    TaxEstGauge: any;

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams) {
    }

  ionViewDidLoad() {

  }
}
