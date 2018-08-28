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
  pak: any;

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
    this.pak = parseInt("01", 10);
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
    }
  }

  getLAST_TAX() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].LAST_TAX/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].LAST_TAX = val;
    }
  }

  getEST() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].ESTIMATE/1000000
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].ESTIMATE = val;
    }
  }

  TableProductGetData(){
    this.webapi.getData('TaxProductCurYear?offcode='+ this.offcode_full).then((data)=>{
      this.DataProduct = data;
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
    }
  }

  getProductLAST_TAX() {
    let val;
    for (var i = 0; i < this.DataProduct.length; i++) {
      val = this.DataProduct[i].LAST_TAX/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.DataProduct[i].LAST_TAX = val;
    }
  }

  getProductEST() {
    let val;
    for (var i = 0; i < this.DataProduct.length; i++) {
      val = this.DataProduct[i].ESTIMATE/1000000
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.DataProduct[i].ESTIMATE = val;
    }
  }

  REP02_GUAGE_REG(){
    this.webapi.getData('REP02_GUAGE_REG?area='+this.offcode).then((data)=>{
      this.DataGauge = data;
      this.getGaugeTAX();
      this.get_tax_amt();
      this.get_taly_amt();
      this.get_est_amt();
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

  get_tax_amt(){
    let val;
    for (var i = 0; i < this.DataGauge.length; i++) {
      val = this.DataGauge[i].TAX/1000000
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.DataGauge[i].TAX = val;
    }
  }

  get_taly_amt(){
    let val;
    for (var i = 0; i < this.DataGauge.length; i++) {
      val = this.DataGauge[i].TAX_LY/1000000
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.DataGauge[i].TAX_LY = val;
    }
  }

  get_est_amt(){
    let val;
    for (var i = 0; i < this.DataGauge.length; i++) {
      val = this.DataGauge[i].EST/1000000
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.DataGauge[i].EST = val;
    }
  }

  showgaugechartTax(tax_val,taxly_val,taxest_val){
    let taxext_percent;
    let green_taxly_from;
    let green_taxly_to;
    let yellow_taxly_from;
    let yellow_taxly_to;
    let red_taxly_from;
    let red_taxly_to;

   /* if(taxest_val <= 100){
      taxext_percent = 100;
    }else{
      taxext_percent = taxest_val;
    }*/

    if(taxly_val <= 40){
      green_taxly_from = 0;
      green_taxly_to = taxly_val;
      yellow_taxly_from  = 0;
      yellow_taxly_to = 0;
      red_taxly_from = 0;
      red_taxly_to = 0;
    }else if(taxly_val <= 75){
      green_taxly_from = 0;
      green_taxly_to = 0;
      yellow_taxly_from = 0;
      yellow_taxly_to = taxly_val;
      red_taxly_from = 0;
      red_taxly_to = 0;
    }else{
      green_taxly_from = 0;
      green_taxly_to = 0;
      yellow_taxly_from = 0;
      yellow_taxly_to = 0;
      red_taxly_from = 0;
      red_taxly_to = taxly_val;
    }

    /*if(taxly_val < 0){
      taxly_from =  taxly_val;
      taxly_to = 0;
    }else{
      taxly_from = 0;
      taxly_to = taxly_val;
    }*/

    var data = google.visualization.arrayToDataTable([
      ['Label', 'Value'],
      ['ปีนี้', tax_val],
    ]);
    var options = {
          width: 200, height: 200,
          greenFrom:green_taxly_from,greenTo:green_taxly_to,
          yellowFrom:yellow_taxly_from,yellowTo:yellow_taxly_to,
          redFrom: red_taxly_from, redTo: red_taxly_to,
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
