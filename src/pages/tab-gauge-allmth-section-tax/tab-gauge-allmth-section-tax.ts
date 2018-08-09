import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the TabGaugeAllmthSectionTaxPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;

@IonicPage()
@Component({
  selector: 'page-tab-gauge-allmth-section-tax',
  templateUrl: 'tab-gauge-allmth-section-tax.html',
})
export class TabGaugeAllmthSectionTaxPage {
  respondData: any;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http: HttpClient,
    public webapi:RestProvider) {

    
  }

  ionViewDidLoad() {
    this.googleChart();
    this.getData();
  }

  getData() {
    this.webapi.getData('GaugeMthSectionTax').then((data)=>{
      this.respondData = data;
      console.log(this.respondData);
    });
    }


    googleChart(){
    var data = google.visualization.arrayToDataTable([
      ['Label', 'Value'],
      ['ปีนี้',55 ],
      ['ปีก่อน', 55],
      ['ประมาณการ', 68]
    ]);
  
    var options = {
      redFrom: 0, redTo: 25,
      yellowFrom:26, yellowTo: 75,
      greenFrom:76, greenTo: 100,
      minorTicks: 5
    };
    var formatter = new google.visualization.NumberFormat({
      suffix: '%',
      fractionDigits: 0
    });
    formatter.format(data, 1);

    var chart = new google.visualization.Gauge(document.getElementById('gauge'));
  
    chart.draw(data, options);
  
  }

}
