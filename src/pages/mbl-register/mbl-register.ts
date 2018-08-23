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

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public webapi:RestProvider) {
  }

  ionViewDidLoad() {
    this.UserAthu();
    this.selectDataAll();
  }

  UserAthu() {
    this.offcode = localStorage.offcode;
    this.offcode = this.offcode.substring(0, 2);
    console.log(this.offcode);
  }

  selectDataAll(){
    this.webapi.getData('MBLRegister?offcode='+this.offcode).then((data)=>{
      this.responseData = data;     
    });
  }

}
