import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App ,MenuController} from 'ionic-angular';
import { MenuGroupNewReportPage } from '../menu-group-new-report/menu-group-new-report';
import { MenuGroupOldReportPage } from '../menu-group-old-report/menu-group-old-report';
import { DashboardPage } from '../dashboard/dashboard';
import { HomePage } from '../home/home';
import { ContactPage } from '../contact/contact';

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

  gotoReport(){
    this.app.getRootNav().push(MenuGroupNewReportPage);  
  }

  gotoOldReport(){
    this.app.getRootNav().push(DashboardPage);  
  }

}
