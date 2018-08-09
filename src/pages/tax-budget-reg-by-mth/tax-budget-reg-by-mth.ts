import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-tax-budget-reg-by-mth',
  templateUrl: 'tax-budget-reg-by-mth.html',
})
export class TaxBudgetRegByMthPage {

  responseData: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public webapi:RestProvider ) {

  }

  ionViewDidLoad() {
  }

  summaryDate: any;
  getDashboardItemsByDate(summaryDate){
    console.log(summaryDate);
    this.webapi.getData('TaxBudgetRegByMth?mth='+summaryDate).then((data)=>{
      this.responseData = data;
      console.log(this.responseData);
    });
  }
}
