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

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public webapi:RestProvider) {
  }
 
  ionViewDidLoad() {
    var d = new Date(); 
    var n = d.getFullYear();
    var nt = d.getFullYear();
    console.log(n);

    this.summaryDate = n;
    this.webapi.getData('TaxBudgetReg?year='+n).then((data)=>{
        this.responseData = data;
        console.log(this.responseData);
    });
  }
}
