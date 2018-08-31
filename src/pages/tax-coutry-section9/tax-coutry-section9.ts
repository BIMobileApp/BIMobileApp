import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tax-coutry-section9',
  templateUrl: 'tax-coutry-section9.html',
})
export class TaxCoutrySection9Page {
  username:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.username = localStorage.userData;
  }


  ionViewDidLoad() {
  }

}
