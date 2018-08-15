import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-tax-budget-reg',
  templateUrl: 'tax-budget-reg.html',
})
export class TaxBudgetRegPage {

  responseData: any;
  summaryDate:any;
  year:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public webapi:RestProvider) {
  }
 
  ionViewDidLoad() {
    var d = new Date(); 
    var n = d.getFullYear();
    var nt = d.getFullYear()+543;
    let year_en:any;
    let year_th:any;

    var range = [];
    for(var i=0;i<10;i++) {

     year_en = n-i;
     year_th = nt-i;

      range.push( {"key":year_th,"value": year_en});
    }
    this.summaryDate = range;
  }

  selectDate(year){
     this.webapi.getData('TaxBudgetReg?year='+year).then((data)=>{
      this.responseData = data;
    });
  }
}
