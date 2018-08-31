import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tax-coutry-section6',
  templateUrl: 'tax-coutry-section6.html',
})
export class TaxCoutrySection6Page {
  username:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.username = localStorage.userData;
  }

  ionViewDidLoad() {
  }

}
