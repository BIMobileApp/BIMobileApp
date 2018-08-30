import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-tax-coutry-section1',
  templateUrl: 'tax-coutry-section1.html',
})
export class TaxCoutrySection1Page {
  username:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.username = localStorage.userData;
  }

  ionViewDidLoad() {
  }

}
