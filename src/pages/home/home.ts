import { Component } from '@angular/core';
import { NavController ,App,NavParams, AlertController} from 'ionic-angular';
import { ChartPage } from '../chart/chart';
import { RestProvider } from '../../providers/rest/rest';
import { FollowTaxMthPage } from '../follow-tax-mth/follow-tax-mth';
import { Test2Page } from '../test2/test2';
import { TabGaugeAllmthSectionTaxPage } from '../tab-gauge-allmth-section-tax/tab-gauge-allmth-section-tax';

import { GaugechartPage } from '../gaugechart/gaugechart';
import { DashboardPage } from '../dashboard/dashboard';
import { MenuGroupPage } from '../menu-group/menu-group';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  userData = {
    "username": "",
    "password": ""
  };

  constructor(public navCtrl: NavController,
    public app:App,
    public restProvider: RestProvider,
    public alertCtrl: AlertController,
    public navParams: NavParams){
    
  }

  ionViewDidLoad() {
  }

  /*login() {

    console.log(this.userData);

    //function check login
      if (this.userData.username == "parinya_i" && this.userData.password == "parinya79") { 
        //alert 
        const alert = this.alertCtrl.create({
          title: 'เข้าสู่ระบบสำเร็จ',
          buttons: ['OK']
        });
        alert.present();
        //บันทึกข้อมูลของ local storage
        localStorage.setItem("userData", this.userData.username);
        //ปิดหน้า login และกลับไปหน้าหลัง
        this.navCtrl.setRoot(TabGaugeAllmthSectionTaxPage);
      } else {
        const alert = this.alertCtrl.create({
          title: 'เข้าสู่ระบบไม่สำเร็จ!',
          subTitle: 'กรุณากรอกข้อมูลอีกครั้ง',
          buttons: ['OK']
        });
        alert.present();
      }
    };*/

  GotoChart(){
  }
  login(){
    this.app.getRootNav().push(MenuGroupPage);  
  }
  /*GotoChart(){
    this.app.getRootNav().push(ChartPage);  
  }

  GotoFax(){
    this.app.getRootNav().push(FollowTaxMthPage);  
  
 //Test2 ของดาว
  GotoTest2(){
     this.app.getRootNav().push(Test2Page);  
  }
*/ 
 GotoGauge(){
    this.app.getRootNav().push(TabGaugeAllmthSectionTaxPage);  
  }
  }

  /*GotoGaugeChart(){
    this.app.getRootNav().push(GaugechartPage);  
  }

  GotoDashboard(){
    this.app.getRootNav().push(DashboardPage);  
  }

  GotoMenuGroup(){
    this.app.getRootNav().push(MenuGroupPage);  
  }*/


