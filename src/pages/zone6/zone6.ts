import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-zone6',
  templateUrl: 'zone6.html',
})
export class Zone6Page {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    document.getElementById("P-phetchabun").setAttribute("class", "color2");
  }

}
