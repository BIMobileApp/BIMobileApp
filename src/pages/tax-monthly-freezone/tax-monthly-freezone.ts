import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

declare var google;

@IonicPage()
@Component({
  selector: 'page-tax-monthly-freezone',
  templateUrl: 'tax-monthly-freezone.html',
})
export class TaxMonthlyFreezonePage {
  respondData:any;
  TAX = [];
  TAX_LY = [];
  EST = [];

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public webapi: RestProvider) {
    }

  ionViewDidLoad() {
  }

  zone:any;
  getTaxCharge(zone){
    zone = '1';
    this.webapi.getData('taxQuantityByProductGroup?zone='+zone).then((data) => {
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
    this.showgaugechartTax(val);
  }

  getEST() {
    this.EST = [];
    let val;
    for (var i = 0; i < this.respondData.length; i++) {
      val = this.respondData[i].TAX_ESTIMATE_PERCENT;
    }
    this.showgaugechartTax(val);
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

}
