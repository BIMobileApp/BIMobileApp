import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

declare var google;

@IonicPage()
@Component({
  selector: 'page-new-report-gauge-quantity-beer',
  templateUrl: 'new-report-gauge-quantity-beer.html',
})
export class NewReportGaugeQuantityBeerPage {

  respondData:any;

  TAX = [];
  TAX_LY = [];
  EST = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public webapi: RestProvider) {
  }

  ionViewDidLoad() {
    let grp_id = "7001";
    let tax_year = new Date();
    var tax_year_th = tax_year.getFullYear()+543;

    this.webapi.getData('taxQuantityByProductGroup?year='+tax_year_th+'&grp_id='+grp_id).then((data) => {
      this.respondData = data;
      this.getTAX();
      this.getTAX_LY(); 
      this.getEST(); 
    });
  }

  getTAX() {
    this.TAX = [];
    let val;
    for (var i = 0; i < this.respondData.length; i++) {
      val = this.respondData[i].TAX_PERCENT;
    }
    this.showgaugechartTax(val);
  }

  getTAX_LY() {
    this.TAX_LY = [];
    let val;
    for (var i = 0; i < this.respondData.length; i++) {
      val = this.respondData[i].TAX_LY_PERCENT;
    }
    this.showgaugechartTaxLy(val);
  }

  getEST() {
    this.EST = [];
    let val;
    for (var i = 0; i < this.respondData.length; i++) {
      val = this.respondData[i].TAX_ESTIMATE_PERCENT;
    }
    this.showgaugechartEstimate(val);
  }

  showgaugechartTax(tax_value){
    var data = google.visualization.arrayToDataTable([
      ['Label', 'Value'],
      ['ปีนี้', tax_value],
    ]);
    var options = {
           width: 200, height: 200,
          minorTicks: 5,
          majorTicks: ['0', '100'],
    };
  
    var chart = new google.visualization.Gauge(document.getElementById('chart_div'));
    chart.draw(data, options);

    setInterval(function() {
      data.setValue(0, 1, tax_value);
      chart.draw(data, options);
    });
  }

  showgaugechartTaxLy(tax_value){
    var data = google.visualization.arrayToDataTable([
      ['Label', 'Value'],
      ['ปีก่อน', tax_value],
    ]);
    var options = {
           width: 200, height: 200,
          minorTicks: 5,
          majorTicks: ['0', '100'],
    };
  
    var chart = new google.visualization.Gauge(document.getElementById('chart_div1'));
    chart.draw(data, options);

    setInterval(function() {
      data.setValue(0, 1, tax_value);
      chart.draw(data, options);
    });
  }

  showgaugechartEstimate(tax_value){
    var data = google.visualization.arrayToDataTable([
      ['Label', 'Value'],
      ['ปีประมาณการ', tax_value],
    ]);
    var options = {
           width: 200, height: 200,
          minorTicks: 5,
          majorTicks: ['0', '100'],
    };
  
    var chart = new google.visualization.Gauge(document.getElementById('chart_div2'));
    chart.draw(data, options);

    setInterval(function() {
      data.setValue(0, 1, tax_value);
      chart.draw(data, options);
    });
  }
}
