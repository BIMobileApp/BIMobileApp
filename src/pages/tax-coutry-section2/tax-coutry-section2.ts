import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-tax-coutry-section2',
  templateUrl: 'tax-coutry-section2.html',
})
export class TaxCoutrySection2Page {
  username:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.username = localStorage.userData;
  }

  ionViewDidLoad() {
  }

}
