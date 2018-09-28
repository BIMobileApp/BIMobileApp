import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-zone1',
  templateUrl: 'zone1.html',
})
export class Zone1Page {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    document.getElementById("P-chai_nat").setAttribute("class", "color2");
  }

}
