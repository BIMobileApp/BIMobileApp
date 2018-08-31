import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tax-coutry-section8',
  templateUrl: 'tax-coutry-section8.html',
})
export class TaxCoutrySection8Page {
  username:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.username = localStorage.userData;
  }


  ionViewDidLoad() {
  }

}
