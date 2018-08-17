import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

declare var google;


@IonicPage()
@Component({
  selector: 'page-taxgroup-monthly-freezone',
  templateUrl: 'taxgroup-monthly-freezone.html'
})
export class TaxgroupMonthlyFreezonePage {


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.taxchart1();
    this.taxchart2();
    this.taxchart3();
  }

    taxchart1(){
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

    taxchart2(){
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
    
      var chart = new google.visualization.Gauge(document.getElementById('chart_div1'));
      chart.draw(data, options);

      setInterval(function() {
        data.setValue(0, 1,  50);
        chart.draw(data, options);
      });
    }

    taxchart3(){
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
    
      var chart = new google.visualization.Gauge(document.getElementById('chart_div2'));
      chart.draw(data, options);

      setInterval(function() {
        data.setValue(0, 1,  50);
        chart.draw(data, options);
      });
    }
}
   