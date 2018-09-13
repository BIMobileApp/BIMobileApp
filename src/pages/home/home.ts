import { Component } from '@angular/core';
import { NavController, App, NavParams, AlertController,Platform } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { MenuGroupPage } from '../menu-group/menu-group';
import { DataStatusPage } from '../data-status/data-status';
import { NewsEventPage } from '../news-event/news-event';
import { Http, ResponseContentType } from '@angular/http';
import { File } from '@ionic-native/file';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';
import { FileTransfer } from '@ionic-native/file-transfer';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  userData = {
    "username": "",
    "password": "user123"
  };
  userDB: any;
  offcode: any;
  offdesc: any;
  username: any;
  region:any;
  lastUpdateDate: any;
  region_shot:any;
 

  constructor(public navCtrl: NavController,
    public app: App,
    public restProvider: RestProvider,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public webapi: RestProvider,
    private document: DocumentViewer,
     private file: File, 
     private transfer: FileTransfer,
     private platform: Platform) {
      
  }


  ionViewDidLoad() {
   
  }

  login() {

    this.webapi.getData('TMP_USER?username=' + this.userData.username + '&password=' + this.userData.password).then((data) => {
      this.userDB = data;

      
     if (this.userDB.length!=0) {
        this.offcode = this.userDB[0].OFFCODE;
        this.offdesc = this.userDB[0].OFFDESC;
        this.username = this.userDB[0].NAME;  
        this.region =  this.userDB[0].REGION_DESC;
        this.lastUpdateDate = this.userDB[0].LAST_UPDATE_DATE;
        this.region_shot = this.userDB[0].REGION_SHOT;

         //บันทึกข้อมูลของ local storage
         localStorage.setItem("userData", this.userData.username);
         localStorage.setItem("offcode", this.offcode);
         localStorage.setItem("last_update_date", this.lastUpdateDate);
         localStorage.setItem("offdesc", this.offdesc);
         localStorage.setItem("region_desc", this.region);
         localStorage.setItem("username", this.username); 
         localStorage.setItem("region_shot", this.region_shot); 
         
         //ปิดหน้า login และกลับไปหน้าหลัง

         this.navCtrl.setRoot(MenuGroupPage);
       }else {
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
    this.app.getRootNav().push( MenuGroupPage);  
  }

  DataStatus(){
    this.app.getRootNav().push(DataStatusPage);  
  }
  //this.app.getRootNav().push(MenuGroupPage); 
  

  openLocalPdf() {
    const options: DocumentViewerOptions = {
      title: 'My PDF'
    }
    this.document.viewDocument('assets/5-tools.pdf', 'application/pdf', options);
  }

  dowload_file() {
 
   let path = null;

    if (this.platform.is('ios')) {
      path = this.file.documentsDirectory;
    } else if (this.platform.is('android')) {
      path = this.file.dataDirectory;
    }

    path = this.file.documentsDirectory;
    const transfer = this.transfer.create();
    transfer.download('../src/assets/document/user_guide.pdf', path + 'user_guide.pdf').then(entry => {
      let url = entry.toURL();
      this.document.viewDocument(url, 'application/pdf', {});
    });
 }
}