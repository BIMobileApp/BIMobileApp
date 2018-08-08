import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewChild } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { RestProvider } from '../../providers/rest/rest';
import { Chart } from 'chart.js';


/**
 * Generated class for the NewReportLineFollowProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-report-line-follow-product',
  templateUrl: 'new-report-line-follow-product.html',
})
export class NewReportLineFollowProductPage {
  @ViewChild('LineCanvas') LineCanvas;

  lineChart: any;
  respondData: any;
  other = [];
  TAX = [];
  EST = [];
  lebel = [];


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient,
    public webapi: RestProvider) {


  }

  ionViewDidLoad() {
    this.getData();
  }

  //----------------------- Start Connect API--------------------------------------//
  getData() {
    this.webapi.getData('OldBarAllTax').then((data) => {
      this.respondData = data;
      console.log(this.respondData);
      for (var i = 0; i < this.respondData.length; i++) {
        this.other.push(this.respondData[i]);
      }
      this.getTAX();
      this.getEST();
      this.getLebel();
      this.createChart();
    });

  }
  //----------------------- End Connect API--------------------------------------//
  //----------------------- Start Manage Data from API-------------------------//
  getTAX() {
    for (var i = 0; i < this.other.length; i++) {
      this.TAX.push(this.other[i].TAX);
    }
    this.TAX = JSON.parse(JSON.stringify(this.TAX));
    console.log(this.TAX);

  }

  getEST() {
    for (var i = 0; i < this.other.length; i++) {
      this.EST.push(this.other[i].EST);
    }
    this.EST = JSON.parse(JSON.stringify(this.EST));
    console.log(this.EST);
  }

  getLebel() {
    for (var i = 0; i < this.other.length; i++) {
      this.lebel.push(this.other[i].GRP_NAME);
    }
    this.lebel = JSON.parse(JSON.stringify(this.lebel));
    console.log(this.lebel);
  }
  //----------------------- End Manage Data from API-------------------------//

  createChart() {
    this.lineChart = new Chart(this.LineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.lebel,
        datasets: [
          {
            label: "ปีนี้",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.TAX,
            spanGaps: false,
          },
          {
            label: "ประมาณการ",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(70,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.EST,
            spanGaps: false,
          }
        ]
      }

    });
  }


}
