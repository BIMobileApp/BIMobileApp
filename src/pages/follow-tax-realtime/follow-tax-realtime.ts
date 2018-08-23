import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-follow-tax-realtime',
  templateUrl: 'follow-tax-realtime.html',
})
export class FollowTaxRealtimePage {

  responseData: any;
  month:any;
  offcode:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public webapi:RestProvider) {
      this.offcode = localStorage.offcode;
  }

  ionViewDidLoad() {
    this.geDataAll();
  }

  geDataAll(){
   /* let month = '';
    var d = new Date(); 
    var nt = d.getFullYear()+543;*/

    this.webapi.getData('FollowPayTaxRealtimeAll?offcode='+this. offcode).then((data)=>{
      this.responseData = data;
      this.getTableFZ_EXCISE();
      this.getTableIN_EXCISE();
      this.getTableEXCISE();
      this.getTableSTAMP();
      this.getDateFormat();
    });
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