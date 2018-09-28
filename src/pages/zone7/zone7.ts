import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-zone7',
  templateUrl: 'zone7.html',
})
export class Zone7Page {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    document.getElementById("P-kanchanaburi").setAttribute("class", "color2");
  }

}
