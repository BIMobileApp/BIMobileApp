import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-zone3',
  templateUrl: 'zone3.html',
})
export class Zone3Page {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    document.getElementById("P-yasothorn").setAttribute("class", "color2");
    document.getElementById("P-amnatcharoen").setAttribute("class", "color4");
  }

}
