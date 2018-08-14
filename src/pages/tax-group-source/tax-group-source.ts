import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-tax-group-source',
  templateUrl: 'tax-group-source.html',
})
export class TaxGroupSourcePage {

  responseData: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public webapi:RestProvider) {
  }

  ionViewDidLoad() {
    this.webapi.getData('TaxProductGroupSource').then((data)=>{
      this.responseData = data;
    });
  }
}
