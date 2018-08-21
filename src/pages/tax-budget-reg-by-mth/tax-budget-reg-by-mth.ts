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
    this.selectDataAll();
  }

  summaryDate: any;

  selectDataAll(){  
    this.webapi.getData('TaxBudgetRegByMth').then((data)=>{
      this.responseData = data;
      this.getTableTAX();
    });
  }

  selectDate(summaryDate){
  
    if(summaryDate == ""){
      this.selectDataAll();
    }else
      this.webapi.getData('TaxBudgetRegByMth?mth='+summaryDate).then((data)=>{
        this.responseData = data;
        this.getTableTAX();
      });
   
  }

  getTableTAX() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].TAX/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].TAX = val;

    }
  }
}
