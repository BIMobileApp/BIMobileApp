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
    this.getData(Region, Province);
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

  selectRegion(Region, Province) {
    Province = 'undefined';
    this.selectionProvinceFill(Region);
    this.getData(Region, Province,);
  }

  getData(Region, Province) {
    this.webapi.getData('SourceImcome?offcode=' + this.offcode + '&region=' + Region + '&province=' + Province).then((data) => {
      this.respondData = data;
     
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

  selectionProvince(Region, Province) {
    this.getData(Region, Province);
    
  }




}
