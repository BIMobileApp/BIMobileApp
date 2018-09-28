import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-zone9',
  templateUrl: 'zone9.html',
})
export class Zone9Page {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    document.getElementById("P-narathiwat").setAttribute("class", "color2");
  }

}
