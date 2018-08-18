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

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public webapi:RestProvider) {

  }

  ionViewDidLoad() {
    this.webapi.getData('SourceImcome').then((data)=>{
      this.respondData = data;
      this.getTableTAX();
    });
    console.log(this.respondData);
  }
  getTableTAX() {
    let val;
    for (var i = 0; i < this.respondData.length; i++) {
      val = this.respondData[i].TAX/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.respondData[i].TAX = val;
      console.log(this.respondData);
    }
  }
}
