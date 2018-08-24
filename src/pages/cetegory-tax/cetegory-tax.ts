import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { TaxCoutrySection1Page } from '../tax-coutry-section1/tax-coutry-section1';
import { TaxCoutrySection2Page } from '../tax-coutry-section2/tax-coutry-section2';
import { TaxCoutrySection3Page } from '../tax-coutry-section3/tax-coutry-section3';
import { TaxCoutrySection4Page } from '../tax-coutry-section4/tax-coutry-section4';
import { TaxCoutrySection5Page } from '../tax-coutry-section5/tax-coutry-section5';
import { TaxCoutrySection6Page } from '../tax-coutry-section6/tax-coutry-section6';
import { TaxCoutrySection7Page } from '../tax-coutry-section7/tax-coutry-section7';
import { TaxCoutrySection8Page } from '../tax-coutry-section8/tax-coutry-section8';
import { TaxCoutrySection9Page } from '../tax-coutry-section9/tax-coutry-section9';
import { TaxCoutrySection10Page } from '../tax-coutry-section10/tax-coutry-section10';

declare var google;

@IonicPage()
@Component({
  selector: 'page-cetegory-tax',
  templateUrl: 'cetegory-tax.html',
})
export class CetegoryTaxPage {
  //map parm
  offcode: any;
  offcode_full:any;

  //guage parm
  TaxGauge: any;
  TaxlyGauge: any;
  TaxEstGauge: any;

  //Table parm
  responseData: any;
  DataProduct: any;
  DataGauge:any;
  Data = [];
  TAX = [];
  TAX_LY = [];
  EST = [];

   ProdTAX = [];
   ProdTAX_LY = [];
   ProdEST = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public app: App,
    public webapi:RestProvider) {
  }

  ionViewDidLoad() {
    this.UserAthu();
  
  }

  UserAthu() {
    this.offcode_full = localStorage.offcode;
    this.offcode = this.offcode_full.substring(0, 2);
    this.GaugeGetData();
    this.TableGetData();
    this.TableProductGetData();
    this.REP02_GUAGE_REG();
  }

  GaugeGetData(){
    this.webapi.getData('GaugeOverviewRegion?offcode='+this.offcode_full).then((data)=>{
      this.responseData = data;
    });
  }

  TableGetData(){
    this.webapi.getData('TaxCurYear?offcode='+this.offcode_full).then((data)=>{
      this.responseData = data;
      this.getTAX();
      this.getLAST_TAX();
      this.getEST();
    });
  }

  getTAX() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].TAX/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].TAX = val;
     // console.log(this.responseData);
    }
  }

  getLAST_TAX() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].LAST_TAX/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].LAST_TAX = val;
      //console.log(this.responseData);
    }
  }

  getEST() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].ESTIMATE/1000000
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].ESTIMATE = val;
      //console.log(this.responseData);
    }
  }

  TableProductGetData(){
    this.webapi.getData('TaxProductCurYear?offcode='+ this.offcode_full).then((data)=>{
      this.DataProduct = data;

      console.log(this.DataProduct);
      this.getProductTAX();
      this.getProductLAST_TAX();
      this.getProductEST();
    });
  }

  getProductTAX() {
    let val;
    for (var i = 0; i < this.DataProduct.length; i++) {
      val = this.DataProduct[i].TAX/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.DataProduct[i].TAX = val;
     // console.log(this.responseData);
    }
  }

  getProductLAST_TAX() {
    let val;
    for (var i = 0; i < this.DataProduct.length; i++) {
      val = this.DataProduct[i].LAST_TAX/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.DataProduct[i].LAST_TAX = val;
      //console.log(this.responseData);
    }
  }

  getProductEST() {
    let val;
    for (var i = 0; i < this.DataProduct.length; i++) {
      val = this.DataProduct[i].ESTIMATE/1000000
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.DataProduct[i].ESTIMATE = val;
      //console.log(this.responseData);
    }
  }

  REP02_GUAGE_REG(){
    this.webapi.getData('REP02_GUAGE_REG?area='+this.offcode).then((data)=>{
      this.DataGauge = data;
      console.log(this.DataGauge);
      this.getGaugeTAX();

    });
  }

  getGaugeTAX() {
    let tax_val;
    let taxly_val;
    let taxest_val;
    for (var i = 0; i < this.DataGauge.length; i++) {
      tax_val = this.DataGauge[i].TAX_PERCENT;
      taxly_val =  this.DataGauge[i].LAST_TAX_PERCENT;
      taxest_val = this.DataGauge[i].EST_PERCENT;
    }
    this.showgaugechartTax(tax_val,taxly_val,taxest_val);
  }

  showgaugechartTax(tax_val,taxly_val,taxest_val){
    let taxext_percent;
    let taxly_from;
    let taxly_to;
    if(taxest_val <= 100){
      taxext_percent = 100;
    }else{
      taxext_percent = taxest_val;
    }

    if(taxly_val < 0){
      taxly_from =  taxly_val;
      taxly_to = 0;
    }else{
      taxly_from = 0;
      taxly_to = taxly_val;
    }

    var data = google.visualization.arrayToDataTable([
      ['Label', 'Value'],
      ['ปีนี้', tax_val],
    ]);
    var options = {
           width: 200, height: 200,
          redFrom: taxly_from, redTo: taxly_to,
          minorTicks: 5,
          majorTicks: ['0', taxext_percent],
    };
  
    var chart = new google.visualization.Gauge(document.getElementById('chart_div'));
    chart.draw(data, options);
  }

  section1() {
    this.app.getRootNav().push(TaxCoutrySection1Page);
  }
  section2() {
    this.app.getRootNav().push(TaxCoutrySection2Page);
  }
  section3() {
    this.app.getRootNav().push(TaxCoutrySection3Page);
  }
  section4() {
    this.app.getRootNav().push(TaxCoutrySection4Page);
  }
  section5() {
    this.app.getRootNav().push(TaxCoutrySection5Page);
  }
  section6() {
    this.app.getRootNav().push(TaxCoutrySection6Page);
  }
  section7() {
    this.app.getRootNav().push(TaxCoutrySection7Page);
  }
  section8() {
    this.app.getRootNav().push(TaxCoutrySection8Page);
  }
  section9() {
    this.app.getRootNav().push(TaxCoutrySection9Page);
  }
  section10() {
    this.app.getRootNav().push(TaxCoutrySection10Page);
  }

}



/*export class CetegoryTaxPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public app:App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CetegoryTaxPage');
  }

  TaxThisyearTable(){
    this.app.getRootNav().push(TaxbudgetyearPage); 
  }

  TaxAllCountry(){
    this.app.getRootNav().push(TaxAllCountryPage); 
  }

  TaxMonthlyFreezone(){
    this.app.getRootNav().push(TaxMonthlyFreezonePage); 
  }

}
*/