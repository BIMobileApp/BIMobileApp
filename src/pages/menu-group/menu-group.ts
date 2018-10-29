import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-menu-group',
  templateUrl: 'menu-group.html',
})
export class MenuGroupPage {
username:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public app:App) {
  }

  ionViewDidLoad() {
    this.username = localStorage.userData;
  }

  /* openMenu() {
    this.menuCtrl.open();
  }
  toggleRightMenu() {
    this.menuCtrl.toggle('right');
  } */
  
  /* gotoHome(){
    this.app.getRootNav().push(HomePage);  
  }
  gotoContact(){
    this.app.getRootNav().push(ContactPage);  
  }
  gotoLogout(){
    this.navCtrl.push('HomePage'); 
    this.app.getRootNav().push(HomePage);  
  } */
  


/*   beforReport(){
    this.navCtrl.push('MenuGroupNewReportPage'); 
   
  } */
/* 
  caseReport(){
    this.navCtrl.push('MenuGroupNewReportPage'); 
   
  }
 */
  gotoCategoryTax(){
    this.navCtrl.push('CetegoryTaxPage'); 
  }

  gotoDepartmentList(){
    this.navCtrl.push('CategoryDepartmentListPage'); 
   /*  this.app.getRootNav().push(CategoryDepartmentListPage);  */
  }
  
  gotoDepartmentReport(){
    this.navCtrl.push('MenuGroupNewReportPage'); 
   /*  this.app.getRootNav().push(MenuGroupNewReportPage);  */
  } 

  LawDataArea(){
    this.navCtrl.push('LawDataAreaPage'); 
   /*  this.app.getRootNav().push(LawDataAreaPage);  */
  }

  LawDataMth(){
    this.navCtrl.push('LawDataMthPage'); 
    /* this.app.getRootNav().push(LawDataMthPage);  */
  }

  IncDataArea(){
    this.navCtrl.push('IncDataAreaPage'); 
    /* this.app.getRootNav().push(IncDataAreaPage);  */
  }

  IncDataMth(){
    this.navCtrl.push('IncDataMthPage'); 
   /*  this.app.getRootNav().push(IncDataMthPage);  */
  }

  IncDataMarket(){
    this.navCtrl.push('LicDataMarketPage'); 
    //this.app.getRootNav().push(LicDataMarketPage); 
  }

  MBLRegisterLink(){
    this.navCtrl.push('MblRegisterPage'); 
   /*  this.app.getRootNav().push(MblRegisterPage);  */
  }
  
}
