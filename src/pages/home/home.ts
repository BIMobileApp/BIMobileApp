import { Component } from '@angular/core';
import { NavController, App, NavParams, AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { MenuGroupPage } from '../menu-group/menu-group';
import { DataStatusPage } from '../data-status/data-status';
import { NewsEventPage } from '../news-event/news-event';

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

    this.webapi.getData('TMP_USER?username=' + this.userData.username + '&password=' + this.userData.password).then((data) => {
      this.userDB = data;

      
      if (this.userDB.length!=0) {
       this.offcode = this.userDB[0].OFFCODE;
       this.offdesc = this.userDB[0].OFFDESC;
       this.username = this.userDB[0].USERNAME;
        //บันทึกข้อมูลของ local storage
        localStorage.setItem("userData", this.userData.username);
        localStorage.setItem("offcode", this.offcode);
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

  NewsEvent(){
    this.app.getRootNav().push(NewsEventPage);  
  }
  
  test(){
    this.app.getRootNav().push(MenuGroupPage);  
  }

  DataStatus(){
    this.app.getRootNav().push(DataStatusPage);  
  }

}