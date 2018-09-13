import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

declare var changeCurrency: any;
declare var dateDisplayNow: any;
declare var dateDisplayAll: any;

@IonicPage()
@Component({
  selector: 'page-incomerealtime',
  templateUrl: 'incomerealtime.html',
})
export class IncomerealtimePage {

  respondData: any;
  respondSumData: any;
  responseRegion: any;
  ResponseProvince: any;

  offcode: any;
  username: any;
  dateAsOff = "";
  dateDisplay = "";
  dateNow = "";
  unitType: any;
  Region: any;
  Province: any;
  time: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public webapi: RestProvider) {
    this.offcode = localStorage.offcode;
    this.username = localStorage.userData;
    this.dateAsOff = dateDisplayAll;
    this.dateDisplay = localStorage.last_update_date;
    this.dateNow = dateDisplayNow;
    var d = new Date();
    this.time = d.getHours() + " : " + d.getMinutes();
  }

  ionViewDidLoad() {
    let Region = 'undefined';
    let Province = 'undefined';
    let typeCur = "B";
    this.getData(Region, Province,typeCur);
    this.selectionAreaAll();
    
  }

  selectionAreaAll() {

    this.webapi.getData('TaxRealtimeRegion?offcode=' + this.offcode).then((data) => {
      this.responseRegion = data;
      this.selectionProvinceFill(data[0].REGION_NAME);
      
    });
  }

  selectionProvinceFill(Region) {

    this.webapi.getData('TaxRealtimeProvince?offcode=' + this.offcode + '&area=' + Region).then((data) => {
      this.ResponseProvince = data;
    });
  }

  selectRegion(Region, Province,typeCur) {
    Province = 'undefined';
    this.selectionProvinceFill(Region);
    this.getData(Region, Province, typeCur);
  }

  getData(Region, Province,typeCur) {
    this.webapi.getData('SourceImcome?offcode=' + this.offcode + '&region=' + Region + '&province=' + Province).then((data) => {
      this.respondData = data;
      this.getTableTAX(typeCur);
    });
    /* this.webapi.getData('SumIncomeList?offcode='+this.offcode).then((data)=>{
         this.respondSumData = data;
         //this.getTableSumTAX();
       });*/
  }

  /* getCurrency(valB) {
    this.webapi.getData('SourceImcome?offcode=' + this.offcode + '&region=' + this.Region + '&province=' + this.Province).then((data) => {
      this.respondData = data;
      let valIn;
      let valOut;
      for (var i = 0; i < this.respondData.length; i++) {
        valIn = this.respondData[i].TAX;
        valOut = changeCurrency(valIn, valB);
        this.respondData[i].TAX = valOut;
      }
    });
  } */

  selectionProvince(Region, Province,typeCur) {
    this.getData(Region, Province,typeCur);
    /*this.webapi.getData('SourceImcome?offcode='+this.offcode+'&region='+Region+'&province='+Province).then((data)=>{
      this.respondData = data;

       // this.getTableTAX();
      
  });*/
    /*this.webapi.getData('SumIncomeList?offcode='+this.offcode).then((data)=>{
        this.respondSumData = data;
  
          this.getTableSumTAX();
        
      });*/
  }


  getTableTAX(typeCur) {
    let val;
    for (var i = 0; i < this.respondData.length; i++) {
      val = this.respondData[i].TAX;
      if(val != null){
        val = changeCurrency(val, typeCur);
      }
      this.respondData[i].TAX = val;
    }
  }

  /*getTableSumTAX(){
    let val;
    for (var i = 0; i < this.respondSumData.length; i++) {
      val = this.respondSumData[i].SUM_TAX;
     // val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.respondSumData[i].SUM_TAX = val;
    }
  }*/

}
