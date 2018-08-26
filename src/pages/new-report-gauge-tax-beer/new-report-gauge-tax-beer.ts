import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

declare var google;

@IonicPage()
@Component({
  selector: 'page-new-report-gauge-tax-beer',
  templateUrl: 'new-report-gauge-tax-beer.html',
})
export class NewReportGaugeTaxBeerPage {

  respondData:any;
  respondData2:any;
  offcode: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public webapi: RestProvider) {
      this.offcode = localStorage.offcode;
  }

  ionViewDidLoad() {
    this.webapi.getData('taxPercentBeer?offcode='+this.offcode).then((data) => {
      this.respondData = data;
      this.getTAX();
    });

    this.webapi.getData('QuantityBeer?offcode='+this.offcode).then((data) => {
      this.respondData2 = data;
      this.getTAX2();
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

}
