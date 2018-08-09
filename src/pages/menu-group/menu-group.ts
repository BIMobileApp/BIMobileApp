import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App } from 'ionic-angular';
import { MenuGroupNewReportPage } from '../menu-group-new-report/menu-group-new-report';
import { MenuGroupOldReportPage } from '../menu-group-old-report/menu-group-old-report';
import { DashboardPage } from '../dashboard/dashboard';
import { CetegoryTaxPage } from '../cetegory-tax/cetegory-tax';
import { CategoryDepartmentListPage } from '../category-department-list/category-department-list';

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

  gotoDepartmentReport(){
    this.app.getRootNav().push(MenuGroupNewReportPage); 
  }

  gotoReport(){
    this.app.getRootNav().push(MenuGroupNewReportPage);  
  }

  gotoOldReport(){
    this.app.getRootNav().push(DashboardPage);  
  }

  thisYaerReport(){
    this.app.getRootNav().push(MenuGroupOldReportPage); 
  }

  beforReport(){
    this.app.getRootNav().push(MenuGroupNewReportPage); 
  }

  caseReport(){
    
  }

  gotoCategoryTax(){
    this.app.getRootNav().push(CetegoryTaxPage); 
  }

  gotoDepartmentList(){
    this.app.getRootNav().push(CategoryDepartmentListPage); 
  }

}
