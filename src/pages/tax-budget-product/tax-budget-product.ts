import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-tax-budget-product',
  templateUrl: 'tax-budget-product.html',
})
export class TaxBudgetProductPage {

  responseData: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public webapi:RestProvider
  ) {
  }

  ionViewDidLoad() {
    this.webapi.getData('TaxBudgetProduct').then((data)=>{
      this.responseData = data;
    });
  }

}
