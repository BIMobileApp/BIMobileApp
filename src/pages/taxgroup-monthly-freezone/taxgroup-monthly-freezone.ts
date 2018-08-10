import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TaxgroupMonthlyFreezonePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-taxgroup-monthly-freezone',
  templateUrl: 'taxgroup-monthly-freezone.html',
})
export class TaxgroupMonthlyFreezonePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaxgroupMonthlyFreezonePage');
  }

}
