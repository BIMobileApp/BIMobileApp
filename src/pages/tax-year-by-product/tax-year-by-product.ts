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
    this.getDataAll();
  }

  getDataAll(){
      this.webapi.getData('TaxProductGroupByYear').then((data)=>{
         this.responseData = data;
       });
  }

  dataYear:any;
  getDashboardItemsByDate(dataYear){
    if(dataYear == ""){
      this.getDataAll();
    }else{
    this.webapi.getData('TaxProductGroupByYear?year='+dataYear).then((data)=>{
        this.responseData = data;
      });
   }
  }

  getTableOCT() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].OCT/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].OCT = val;
      console.log(this.responseData);
    }
  }
  getTableNOV() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].NOV/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].NOV = val;
      console.log(this.responseData);
    }
  }
  getTableDEC() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].DEC/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].DEC = val;
      console.log(this.responseData);
    }
  }
  getTableJAN() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].JAN/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].JAN = val;
      console.log(this.responseData);
    }
  }
  getTableFAB(){
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].FAB/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].FAB = val;
      console.log(this.responseData);
    }
  }
  getTableMAR() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].MAR/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].MAR = val;
      console.log(this.responseData);
    }
  }
  getTableAPR() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].APR/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].APR = val;
      console.log(this.responseData);
    }
  }
  getTableMAY() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].MAY/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].MAY = val;
      console.log(this.responseData);
    }
  }
  getTableJUN() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].JUN/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].JUN = val;
      console.log(this.responseData);
    }
  }
  getTableJUL() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].JUL/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].JUL = val;
      console.log(this.responseData);
    }
  }
  getTableAUG() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].AUG/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].AUG = val;
      console.log(this.responseData);
    }
  }

  getTableSEP() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].SEP/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].SEP = val;
      console.log(this.responseData);
    }
  }

}
