import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

declare var dateDisplayAll:any;

@IonicPage()
@Component({
  selector: 'page-mbl-register',
  templateUrl: 'mbl-register.html',
})
export class MblRegisterPage {

  offcode: any;
  responseData: any;
  username:any;

  dateDisplay:any;
  dateAsOff:any;

  responseRegion:any;
  ResponseProvince:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public webapi:RestProvider) {
      this.offcode = localStorage.offcode;
      this.username = localStorage.userData;

      this.dateDisplay = localStorage.last_update_date;
      this.dateAsOff =  dateDisplayAll;
  }

  ionViewDidLoad() {
    let Region = 'undefined';
    let Province = 'undefined';

    this.selectDataAll(Region,Province);
    this.selectRegionAll();
    this.selectionProvinceAll();
  }

  selectRegionAll(){
    this.webapi.getData('ddlMRegion?offcode='+this.offcode).then((data) => {
      this.responseRegion = data;
    });
  }
  selectionProvinceAll(){
    let  Region = 'undefined';
    this.webapi.getData('ddlMProvince?offcode='+this.offcode+'&area='+Region).then((data) => {
      this.ResponseProvince = data;
    }); 
  }
  selectRegion(Region,Province){
    this.selectionProvinceFill(Region);
    this.selectDataAll(Region,Province);
  }

  selectionProvinceFill(Region){
    this.webapi.getData('ddlMProvince?offcode='+this.offcode+'&area='+Region).then((data) => {
      this.ResponseProvince = data;
    }); 
  }

  selectionProvince(Region,Province){ 
    this.selectionProvinceFill(Region);
    this.selectDataAll(Region,Province);
  }

  selectDataAll(Region,Province){
    this.webapi.getData('MBLRegister?offcode='+this.offcode+'&region='+Region+'&province='+Province).then((data)=>{
      this.responseData = data;     
    });
  }

}
