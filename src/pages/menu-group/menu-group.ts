import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App ,MenuController} from 'ionic-angular';
import { MenuGroupNewReportPage } from '../menu-group-new-report/menu-group-new-report';
import { MenuGroupOldReportPage } from '../menu-group-old-report/menu-group-old-report';
import { DashboardPage } from '../dashboard/dashboard';
import { HomePage } from '../home/home';
import { ContactPage } from '../contact/contact';
import { CetegoryTaxPage } from '../cetegory-tax/cetegory-tax';
import { CategoryDepartmentListPage } from '../category-department-list/category-department-list';
import { TaxMonthlyFreezonePage } from '../tax-monthly-freezone/tax-monthly-freezone'; 
import { LawDataAreaPage } from '../law-data-area/law-data-area';
import { LawDataMthPage } from '../law-data-mth/law-data-mth';
import { IncDataAreaPage } from '../inc-data-area/inc-data-area';
import { IncDataMthPage } from '../inc-data-mth/inc-data-mth';

@IonicPage()
@Component({
  selector: 'page-menu-group',
  templateUrl: 'menu-group.html',
})
export class MenuGroupPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public app:App,
    public menuCtrl: MenuController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuGroupPage');
  }

  openMenu() {
    this.menuCtrl.open();
  }
  toggleRightMenu() {
    this.menuCtrl.toggle('right');
  }
  
  gotoHome(){
    this.app.getRootNav().push(HomePage);  
  }
  gotoContact(){
    this.app.getRootNav().push(ContactPage);  
  }
  gotoLogout(){
    this.app.getRootNav().push(HomePage);  
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
    this.app.getRootNav().push(MenuGroupNewReportPage); 
  }

  gotoCategoryTax(){
    this.app.getRootNav().push(CetegoryTaxPage); 
  }

  gotoDepartmentList(){
    this.app.getRootNav().push(CategoryDepartmentListPage); 
  }
  
  TaxMonthlyFreezone(){
    this.app.getRootNav().push(TaxMonthlyFreezonePage); 
  }

  gotoDepartmentReport(){
    this.app.getRootNav().push(MenuGroupNewReportPage); 
  } 

  LawDataArea(){
    this.app.getRootNav().push(LawDataAreaPage); 
  }

  LawDataMth(){
    this.app.getRootNav().push(LawDataMthPage); 
  }

  IncDataArea(){
    this.app.getRootNav().push(IncDataAreaPage); 
  }

  IncDataMth(){
    this.app.getRootNav().push(IncDataMthPage); 
  }

}
