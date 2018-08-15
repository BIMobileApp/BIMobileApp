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
    });
    console.log(this.respondData);
  }
}
