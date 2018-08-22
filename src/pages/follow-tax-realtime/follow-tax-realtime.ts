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
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public webapi:RestProvider) {
  }

  ionViewDidLoad() {
    this.geDataAll();
  }

  geDataAll(){
    let month = '';
    var d = new Date(); 
    var nt = d.getFullYear()+543;

    this.webapi.getData('FollowPayTaxRealtimeAll?year='+nt).then((data)=>{
      this.responseData = data;
      this.getTableCD_INCOME();
      this.getTableINCOME();
      this.getTableIMPORT();
      this.getTableSUM_ALL();
    });
  }

  getDashboardItemsByDate(month){

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
  }
  getTableCD_INCOME() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].CD_INCOME/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].CD_INCOME = val;
    }
  }
  getTableINCOME() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].INCOME/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].INCOME = val;
    }
  }
  getTableIMPORT() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].IMPORT/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].IMPORT = val;
    }
  }
  getTableSUM_ALL() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].SUM_ALL/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].SUM_ALL = val;
    }
  }
}