import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-tax-year-by-product',
  templateUrl: 'tax-year-by-product.html',
})
export class TaxYearByProductPage {

  summaryDate:any;
  responseData: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public webapi:RestProvider) {
  }

  ionViewDidLoad() {
    var d = new Date(); 
    var n = d.getFullYear();
    
    let date_year = new Array<any>();

    for(let i = 0; i <= 10 ; i++){     
      date_year.push(n-i);
    } 
   this.summaryDate = date_year;
  }

  dataYear:any;
  getDashboardItemsByDate(dataYear){
   this.webapi.getData('TaxProductGroupByYear?year='+dataYear).then((data)=>{
      this.responseData = data;
    });
  }
}
