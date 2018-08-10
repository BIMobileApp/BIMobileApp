import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-tax-ed-realtime',
  templateUrl: 'tax-ed-realtime.html',
})
export class TaxEdRealtimePage {

  responseData:any;
  month:any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public webapi:RestProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaxEdRealtimePage');
  }

  getDashboardItemsByDate(month){
    this.webapi.getData('FollowPayTaxRealtime?month='+month).then((data)=>{
      this.responseData = data;
    });
  }

}
