import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

declare var google;

@IonicPage()
@Component({
  selector: 'page-new-report-gauge-tax-alcohol',
  templateUrl: 'new-report-gauge-tax-alcohol.html',
})
export class NewReportGaugeTaxAlcoholPage {

  respondData:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public webapi: RestProvider) {
  }

  ionViewDidLoad() {
    let grp_id = "7002";
    let tax_year = new Date();
    var tax_year_th = tax_year.getFullYear()+543;

    this.webapi.getData('taxPercentByProductGroup?year='+tax_year_th+'&grp_id='+grp_id).then((data) => {
      this.respondData = data;
      this.getTAX();
    });
  }

  getTAX() {

    let tax_val;
    let taxly_val;
    let taxest_val;
    for (var i = 0; i < this.respondData.length; i++) {
      tax_val = this.respondData[i].TAX_PERCENT;
      taxly_val = this.respondData[i].TAX_LY_PERCENT;
      taxest_val = this.respondData[i].TAX_ESTIMATE_PERCENT;
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
}
