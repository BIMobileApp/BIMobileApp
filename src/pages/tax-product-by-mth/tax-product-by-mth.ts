import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
declare var dateDisplayAll: any;
@IonicPage()
@Component({
  selector: 'page-tax-product-by-mth',
  templateUrl: 'tax-product-by-mth.html',
})
export class TaxProductByMthPage {

  dateAsOff = "";
  responseData: any;
  summaryDate:any;
  offcode: any;
  criteRia:any;
  year_en:any;
  year_th:any;
  username:any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public webapi:RestProvider) {
      this.offcode = localStorage.offcode;
      this.username = localStorage.userData;
    this.dateAsOff = dateDisplayAll;
  }

  ionViewDidLoad() {
   var d = new Date(); 
    var n = d.getFullYear();
    var nt = d.getFullYear()+543;
    console.log(nt);
    var range = [];
    for(var i=0;i<10;i++) {

     this.year_en = n-i;
     this.year_th = nt-i;

      range.push( {"key":this.year_th,"value": this.year_en});
    }
    this.summaryDate = range;
    console.log(this.summaryDate);

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

  selectDate(mth, ){
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
