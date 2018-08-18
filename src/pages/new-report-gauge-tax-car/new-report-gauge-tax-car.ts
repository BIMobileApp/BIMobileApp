import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, DateTime } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

declare var google;

@IonicPage()
@Component({
  selector: 'page-new-report-gauge-tax-car',
  templateUrl: 'new-report-gauge-tax-car.html',
})
export class NewReportGaugeTaxCarPage {

  respondData:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public webapi: RestProvider) {
  }

  ionViewDidLoad() {
    let tax_year = new Date();
    var tax_year_th = tax_year.getFullYear()+543;

    let grp_id = "0501";
    this.webapi.getData('taxPercentByProductGroup?year='+tax_year_th+'&grp_id='+grp_id).then((data) => {
      this.respondData = data;
    });  
    console.log(this.respondData);

   // this.taxDataList();  
  }

  taxDataList(){
   

  /*var range = [];
   let tax:any;
   let tax_ly:any;
   let tax_est:any;

   for(var i=0;i< this.respondData.legth;i++) {

     year_en = n-i;
     year_th = nt-i;
      range.push( {"key":year_th,"value": year_en});
    }*/
 }

  /*showgaugechart(){

    var data = google.visualization.arrayToDataTable([
      ['Label', 'Value'],
      ['Rank', 50 ]
    ]);
    var options = {
      width: 250,
      height: 250,
      redFrom: 0,
      redTo: 10,
      yellowFrom: 10,
      yellowTo: 15,
      greenFrom: 15,
      greenTo: 20,
      minorTicks: 20,
      majorTicks: ['0', '100']
    };
  
    var chart = new google.visualization.Gauge(document.getElementById('chart_div'));
    chart.draw(data, options);

    setInterval(function() {
      data.setValue(0, 1,  50);
      chart.draw(data, options);
    });
  }*/
}
