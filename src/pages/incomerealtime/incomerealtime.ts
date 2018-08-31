import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-incomerealtime',
  templateUrl: 'incomerealtime.html',
})
export class IncomerealtimePage {
  
  respondData: any;
  respondSumData: any;
  offcode: any;
  username:any;
  dateDisplay:any;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public webapi:RestProvider) {
      this.offcode = localStorage.offcode;
      this.username = localStorage.userData;
      this.dateDisplay = localStorage.last_update_date;
  }

  ionViewDidLoad() {
    this.webapi.getData('SourceImcome?offcode='+this.offcode).then((data)=>{
      this.respondData = data;
      this.getTableTAX();
    });

    this.webapi.getData('SumIncomeList?offcode='+this.offcode).then((data)=>{
      this.respondSumData = data;
      this.getTableSumTAX();
     });
  }

  getTableTAX() {
    let val;
    for (var i = 0; i < this.respondData.length; i++) {
      val = this.respondData[i].TAX/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.respondData[i].TAX = val;
    }
  }

  getTableSumTAX(){
    let val;
    for (var i = 0; i < this.respondSumData.length; i++) {
      val = this.respondSumData[i].SUM_TAX/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.respondSumData[i].SUM_TAX = val;
    }
  }

}
