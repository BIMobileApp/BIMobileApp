import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-test1',
  templateUrl: 'test1.html'
})
export class Test1Page {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    
    /*  template:`
  <ion-header>
  <ion-navbar>
    <ion-title>Other Page</ion-title>
  </ion-navbar>
</ion-header>
<ion-content>I'm the other page!</ion-content>`*/
    console.log('ionViewDidLoad Test1Page');
  }

}
