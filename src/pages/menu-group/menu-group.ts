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
import { OldReportBi_Law21Page } from '../old-report-bi-law2-1/old-report-bi-law2-1';
import { OldReportBi_Law31Page } from '../old-report-bi-law3-1/old-report-bi-law3-1';

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
  gotoCategoryLawTax(){
    this.app.getRootNav().push(OldReportBi_Law21Page); 
  }

  gotoCategoryFinesTax(){
    this.app.getRootNav().push(OldReportBi_Law31Page); 
  }

}
