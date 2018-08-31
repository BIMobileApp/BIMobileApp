import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

declare var google;

declare var dateDisplayAll:any;

@IonicPage()
@Component({
  selector: 'page-new-report-gauge-tax-beer',
  templateUrl: 'new-report-gauge-tax-beer.html',
})
export class NewReportGaugeTaxBeerPage {

  respondData:any;
  respondData2:any;
  offcode: any;
  username:any;

  dateDisplay:any;
  dateAsOff:any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public webapi: RestProvider) {
      this.offcode = localStorage.offcode;
      this.username = localStorage.userData;
      this.dateDisplay = localStorage.last_update_date;
      this.dateAsOff =  dateDisplayAll;
  }

  ionViewDidLoad() {
    this.webapi.getData('taxPercentBeer?offcode='+this.offcode).then((data) => {
      this.respondData = data;
      this.getTAX();
      this.get_tax_amt();
      this.get_taly_amt();
      this.get_est_amt();
    });

    this.webapi.getData('QuantityBeer?offcode='+this.offcode).then((data) => {
      this.respondData2 = data;
      this.getTAX2();
      this.get_tax_quan();
      this.get_taxly_quan();
    });
  }

  getTAX() {

    let tax_val;
    let taxly_val;
    let taxest_val;
    for (var i = 0; i < this.respondData.length; i++) {
      tax_val = this.respondData[i].TAX_PERCENT;
      taxly_val =  this.respondData[i].LAST_TAX_PERCENT;
      taxest_val = this.respondData[i].EST_PERCENT;
    }
    this.showgaugechartTax(tax_val,taxly_val,taxest_val);
  }

  getTAX2(){
    let tax_val;
    for (var i = 0; i < this.respondData2.length; i++) {
      tax_val = this.respondData2[i].QUAN_PERCENT;
    }
    this.showgaugechartTax2(tax_val);
  }

  showgaugechartTax(tax_val,taxly_val,taxest_val){
    let taxext_percent;
    let taxly_from;
    let taxly_to;
    let green_taxly_from;
    let green_taxly_to;
    let yellow_taxly_from;
    let yellow_taxly_to;
    let red_taxly_from;
    let red_taxly_to;

    /*if(taxest_val <= 100){
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

  showgaugechartTax2(tax_val){
    var data = google.visualization.arrayToDataTable([
      ['Label', 'Value'],
      ['ปีนี้', tax_val],
    ]);
    var options = {
           width: 200, height: 200,
          minorTicks: 5,
          majorTicks: ['0', '100'],
    };
  
    var chart = new google.visualization.Gauge(document.getElementById('chart_quan_div'));
    chart.draw(data, options);
  }

  get_tax_amt(){
    let val;
    for (var i = 0; i < this.respondData.length; i++) {
      val = this.respondData[i].TAX/1000000
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.respondData[i].TAX = val;
    }
  }

  get_taly_amt(){
    let val;
    for (var i = 0; i < this.respondData.length; i++) {
      val = this.respondData[i].TAX_LY/1000000
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.respondData[i].TAX_LY = val;
    }
  }

  get_est_amt(){
    let val;
    for (var i = 0; i < this.respondData.length; i++) {
      val = this.respondData[i].EST/1000000
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.respondData[i].EST = val;
    }
  }

  get_tax_quan(){
    let val;
    for (var i = 0; i < this.respondData2.length; i++) {
      val = this.respondData2[i].TOTAL_VOLUMN_CAPA/1000000
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.respondData2[i].TOTAL_VOLUMN_CAPA = val;
    }
  }

  get_taxly_quan(){
    let val;
    for (var i = 0; i < this.respondData2.length; i++) {
      val = this.respondData2[i].LAST_TOTAL_VOLUMN_CAPA/1000000
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.respondData2[i].LAST_TOTAL_VOLUMN_CAPA = val;
    }
  }

}
