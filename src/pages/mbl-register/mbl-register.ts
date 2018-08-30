import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-mbl-register',
  templateUrl: 'mbl-register.html',
})
export class MblRegisterPage {

  offcode: any;
  responseData: any;
  username:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public webapi:RestProvider) {
      this.offcode = localStorage.offcode;
      this.username = localStorage.userData;
  }

  ionViewDidLoad() {
    this.selectDataAll();
  }

  selectDataAll(){
    this.webapi.getData('MBLRegister?offcode='+this.offcode).then((data)=>{
      this.responseData = data;     
    });
  }

}
