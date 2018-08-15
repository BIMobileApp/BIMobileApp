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

   year_en:any;
   year_th:any;

  ionViewDidLoad() {
    var d = new Date(); 
    var n = d.getFullYear();
    var nt = d.getFullYear()+543;
 

    var range = [];
    for(var i=0;i<10;i++) {

     this.year_en = n-i;
     this.year_th = nt-i;

      range.push( {"key":this.year_th,"value": this.year_en});
    }
    this.summaryDate = range;
  }

  dataYear:any;
  getDashboardItemsByDate(dataYear){
   this.webapi.getData('TaxProductGroupByYear?year='+dataYear).then((data)=>{
      this.responseData = data;
    });
  }
}
