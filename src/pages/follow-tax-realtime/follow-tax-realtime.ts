import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

declare var dateDisplayAll:any;

@IonicPage()
@Component({
  selector: 'page-follow-tax-realtime',
  templateUrl: 'follow-tax-realtime.html',
})
export class FollowTaxRealtimePage {

  responseData: any;
  month:any;
  offcode:any;
  username:any;
  dateDisplay:any;
  dateAsOff:any;
  responseArea:any;
  responseProvince:any;
  oldArea="";

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public webapi:RestProvider) {
      this.offcode = localStorage.offcode;
      this.dateDisplay = localStorage.last_update_date;
      this.dateAsOff =  dateDisplayAll;
  }

  ionViewDidLoad() {
    var area = undefined;
    var Province = undefined;
    this.geDataAll(area,Province);
    this.selectionProviceFirst();
    this.selectionArea();
    this.username = localStorage.userData;
  }


  selectionArea(){
    this.webapi.getData('ddlMRegion?offcode='+this.offcode).then((data) => {
      this.responseArea = data;
    });
  }
  selectionProviceFirst(){
    this.webapi.getData('ddlMProvince?offcode='+this.offcode+'&area=undefined').then((data) => {
      this.responseProvince = data;

    });
  }
  selectionProvince(area,Province){  
    this.webapi.getData('ddlMProvince?offcode='+this.offcode+'&area='+area).then((data) => {
      this.responseProvince = data;

    });
    this.geDataAll(area,Province);
  }

  
  geDataAll(area,Province){
    if (area != this.oldArea) {
      Province = undefined;
    }
     this.webapi.getData('TaxRealtimeDaily?offcode='+this. offcode+'&area='+area+'&province='+Province).then((data)=>{
       this.responseData = data;
       this.getTableFZ_EXCISE();
       this.getTableIN_EXCISE();
       this.getTableEXCISE();
       this.getTableSTAMP();
       this.getDateFormat();
     });
     this.oldArea = area;
   }  
  /* getDashboardItemsByDate(month){

    var d = new Date(); 
    var nt = d.getFullYear()+543;
    if(month== ""){
      this.geDataAll();
    }else{
      this.webapi.getData('FollowPayTaxRealtime?month='+month+'&year='+nt).then((data)=>{
        this.responseData = data;
        this.getTableCD_INCOME();
        this.getTableINCOME();
        this.getTableIMPORT();
        this.getTableSUM_ALL();
      });
    }
  }*/

  getTableFZ_EXCISE() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].FZ_EXCISE_AMT/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].FZ_EXCISE_AMT = val;
    }
  }
  getTableIN_EXCISE() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].IN_EXCISE_AMT/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].IN_EXCISE_AMT = val;
    }
  }
  getTableEXCISE() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].EXCISE_AMT/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].EXCISE_AMT = val;
    }
  }

  getTableSTAMP() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].STAMP_AMT/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].STAMP_AMT = val;
    }
  }

  getDateFormat(){
    let val;
    let date;
    let month;
    let year;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].DIM_DATA_DATE_ID.toString();
      year = val.substring(0,4);
      month = val.substring(6,4);
      date = val.substring(6,8);
      val = date+'/'+month+'/'+year;

      this.responseData[i].DIM_DATA_DATE_ID = val;
    }
  }
}