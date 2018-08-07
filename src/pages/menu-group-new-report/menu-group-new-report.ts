import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-menu-group-new-report',
  templateUrl: 'menu-group-new-report.html',
})
export class MenuGroupNewReportPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
   ionViewDidLoad() {
    console.log('ionViewDidLoad MenuGroupNewReportPage');
  }

}
