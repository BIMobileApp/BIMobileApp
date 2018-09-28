import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-zone10',
  templateUrl: 'zone10.html',
})
export class Zone10Page {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    document.getElementById("P-bangkok4").setAttribute("class", "color2");
  }

}
