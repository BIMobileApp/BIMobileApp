import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-tax-product-by-mth',
  templateUrl: 'tax-product-by-mth.html',
})
export class TaxProductByMthPage {

  responseData: any;
  offcode: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public webapi:RestProvider) {
      this.offcode = localStorage.offcode;
  }

  ionViewDidLoad() {
      this.getDataAll();
  }

  getDataAll(){
    this.webapi.getData('TaxProductGroupByMthAll?offcode='+this.offcode).then((data)=>{
       this.responseData = data;
       this.getTAX();
       this.getTAX_Ly();
       this.getTAX_Est();

     });
  }

  selectDate(mth){
    this.webapi.getData('TaxProductGroupByMth?offcode='+this.offcode+'&month='+mth).then((data)=>{
      this.responseData = data;
      this.getTAX();
      this.getTAX_Ly();
      this.getTAX_Est();
    });
  }

  getTAX() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].TAX/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].TAX = val;

    }
  }

  getTAX_Ly() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].LAST_TAX/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].LAST_TAX = val;

    }
  }

  getTAX_Est() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].ESTIMATE/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].ESTIMATE = val;
    }
  }

}
