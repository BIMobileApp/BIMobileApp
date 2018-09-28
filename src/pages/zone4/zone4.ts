import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-zone4',
  templateUrl: 'zone4.html',
})
export class Zone4Page {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    document.getElementById("P-khonkhen").setAttribute("class", "color2");
  }

}
