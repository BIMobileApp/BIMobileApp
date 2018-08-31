import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-old-report-menu-group2',
  templateUrl: 'old-report-menu-group2.html',
})
export class OldReportMenuGroup2Page {
  username:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.username = localStorage.userData;
  }

  ionViewDidLoad() {
  }

}
