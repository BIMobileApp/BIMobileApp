import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-check-delivery-all-tax',
  templateUrl: 'check-delivery-all-tax.html',
})
export class CheckDeliveryAllTaxPage {

  responseData: any;

  dateData = {"startDate":"","endDate":""}

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public webapi:RestProvider) {

  }

  ionViewDidLoad() {
  }

  viewgraph(){

    let st_date =  this.dateData.startDate.split("-");
    let st_date_res = st_date[0]+st_date[1]+st_date[2];

    let en_date =   this.dateData.startDate.split("-");
    let en_date_res  = en_date[0]+en_date[1]+en_date[2];

    this.webapi.getData('CheckDelivery?st_date='+st_date_res+"&en_date="+en_date_res).then((data)=>{
      this.responseData = data;
    });
  }
  
}
