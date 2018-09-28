import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-zone2',
  templateUrl: 'zone2.html',
})
export class Zone2Page {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    document.getElementById("P-chonburi1").setAttribute("class", "color2");
    document.getElementById("P-samut_prakan2").setAttribute("class", "color1");
  }

}
