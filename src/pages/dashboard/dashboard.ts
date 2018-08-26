import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App } from 'ionic-angular';
import { OldReportMenuGroup1Page } from '../old-report-menu-group1/old-report-menu-group1';
import { OldReportMenuGroup2Page } from '../old-report-menu-group2/old-report-menu-group2';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public app:App) {
  }

  ionViewDidLoad() {
  }

  menuGroup1(){
    this.app.getRootNav().push(OldReportMenuGroup1Page); 
  }

  menuGroup2(){
    this.app.getRootNav().push(OldReportMenuGroup2Page); 
  }
  
}
