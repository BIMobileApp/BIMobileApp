import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App } from 'ionic-angular';
import { MenuGroupNewReportPage } from '../menu-group-new-report/menu-group-new-report';
import { MenuGroupOldReportPage } from '../menu-group-old-report/menu-group-old-report';
import { DashboardPage } from '../dashboard/dashboard';

@IonicPage()
@Component({
  selector: 'page-menu-group',
  templateUrl: 'menu-group.html',
})
export class MenuGroupPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public app:App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuGroupPage');
  }

  gotoReport(){
    this.app.getRootNav().push(MenuGroupNewReportPage);  
  }

  gotoOldReport(){
    this.app.getRootNav().push(DashboardPage);  
  }

}
