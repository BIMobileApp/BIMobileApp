import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tax-coutry-section7',
  templateUrl: 'tax-coutry-section7.html',
})
export class TaxCoutrySection7Page {
  username:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.username = localStorage.userData;
  }

  ionViewDidLoad() {
  }

}
