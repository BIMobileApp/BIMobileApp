import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

declare var google;

@IonicPage()
@Component({
  selector: 'page-new-report-gauge-tax-beer',
  templateUrl: 'new-report-gauge-tax-beer.html',
})
export class NewReportGaugeTaxBeerPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.showgaugechart();  
  }

  showgaugechart(){
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
      majorTicks: ['0', '100'],
    };
  
    var chart = new google.visualization.Gauge(document.getElementById('chart_div'));
    chart.draw(data, options);

    setInterval(function() {
      data.setValue(0, 1,  50);
      chart.draw(data, options);
    });
  }

}
