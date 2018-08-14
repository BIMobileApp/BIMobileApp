import { Component } from '@angular/core';
import { NavController, App, NavParams, AlertController } from 'ionic-angular';
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
  userDB: any;
  offcode: any;
  offdesc: any;
  username: any;

  constructor(public navCtrl: NavController,
    public app: App,
    public restProvider: RestProvider,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public webapi: RestProvider) {

  }

  ionViewDidLoad() {
  }

  login() {

    //console.log(this.userData);
    //function check login
    this.webapi.getData('TMP_USER?username=' + this.userData.username + '&password=' + this.userData.password).then((data) => {
      this.userDB = data;
      console.log(this.userDB.length);

      
      if (this.userDB.length!=0) {
        //if (this.userData.username == "a" && this.userData.password == "a") { 
       this.offcode = this.userDB[0].OFFCODE;
       this.offdesc = this.userDB[0].OFFDESC;
       this.username = this.userDB[0].USERNAME;
       //console.log(this.offcode+'----'+this.offdesc+'------'+this.username);
        //บันทึกข้อมูลของ local storage
        localStorage.setItem("userData", this.userData.username);
        //ปิดหน้า login และกลับไปหน้าหลัง
        this.navCtrl.setRoot(MenuGroupPage);
      } else {
        const alert = this.alertCtrl.create({
          title: 'เข้าสู่ระบบไม่สำเร็จ!',
          subTitle: 'กรุณากรอกข้อมูลอีกครั้ง',
          buttons: ['OK']
        });
        alert.present();
      }
    });
    
  }
  //this.app.getRootNav().push(MenuGroupPage); 




 /*login(){
    this.app.getRootNav().push(MenuGroupPage);  
  }*/
  /*GotoChart(){
    this.app.getRootNav().push(ChartPage);  
  }

  GotoFax(){
    this.app.getRootNav().push(FollowTaxMthPage);  
  
 //Test2 ของดาว
  GotoTest2(){
     this.app.getRootNav().push(Test2Page);  
  }*/

  
  }
/*
    GotoHomePage(){
      this.app.getRootNav().push(DashboardPage);  
    }
  
    GotoGauge(){
      this.app.getRootNav().push(TabGaugeAllmthSectionTaxPage);  
    }*/

  /*GotoGaugeChart(){
    this.app.getRootNav().push(GaugechartPage);  
  }

  GotoDashboard(){
    this.app.getRootNav().push(DashboardPage);  
  }

  GotoMenuGroup(){
    this.app.getRootNav().push(MenuGroupPage);  
  }*/


