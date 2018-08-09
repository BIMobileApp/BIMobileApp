import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-compare-tax-drink',
  templateUrl: 'compare-tax-drink.html',
})
export class CompareTaxDrinkPage {
  responseData: any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public webapi:RestProvider) {
  }

  ionViewDidLoad() {
    let grp_name = 'ภาษีเครื่องดื่ม';
    this.webapi.getData('CompareTax?grp_name='+grp_name).then((data)=>{
      this.responseData = data;
      console.log(this.responseData);
    });
  }

}
