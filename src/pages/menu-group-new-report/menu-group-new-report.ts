import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App } from 'ionic-angular';
import { IncomerealtimePage } from '../incomerealtime/incomerealtime';

@IonicPage()
@Component({
  selector: 'page-menu-group-new-report',
  templateUrl: 'menu-group-new-report.html',
})
export class MenuGroupNewReportPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public app:App) {
  }
   ionViewDidLoad() {
    console.log('ionViewDidLoad MenuGroupNewReportPage');
  }

  reportincome(){
    this.app.getRootNav().push(IncomerealtimePage);  
  }

}
