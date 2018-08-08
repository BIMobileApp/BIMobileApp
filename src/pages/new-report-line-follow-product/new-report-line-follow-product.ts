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
  prod: any;
  product: any;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient,
    public webapi: RestProvider) {


  }

  ionViewDidLoad() {
    this.getProduct();
  }

  //----------------------- Start Connect API--------------------------------------//
  getProduct() {
    this.webapi.getData('xxx').then((data) => {
      this.prod = data;
      console.log(this.prod);
      for (var i = 0; i < this.prod.length; i++) {
        this.other.push(this.prod[i]);
      }
    });
  }

  
  getData() {
    this.webapi.getData('newReportLineFollowProd').then((data) => {
      this.respondData = data;
      console.log(this.respondData);
      for (var i = 0; i < this.respondData.length; i++) {
        this.other.push(this.respondData[i]);
      }

    });

  }
  //----------------------- End Connect API--------------------------------------//
  //----------------------- Start Manage Data from API-------------------------//
  getProd() {
    for (var i = 0; i < this.other.length; i++) {
      this.prod.push(this.other[i].GRP_NAME);
    }
    this.prod = JSON.parse(JSON.stringify(this.prod));
    console.log(this.prod);
  }


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
      this.lebel.push(this.other[i].MONTH);
    }
    this.lebel = JSON.parse(JSON.stringify(this.lebel));
    console.log(this.lebel);
  }
  //----------------------- End Manage Data from API-------------------------//

  onChange() {
    this.getData();
    this.getTAX();
    this.getEST();
    this.getLebel();
    this.createChart();
  }

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
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgb(255, 99, 132)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgb(255, 99, 132)",
            pointHoverBorderColor: "rgb(255, 99, 132)",
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
            backgroundColor: "rgb(255, 206, 86)",
            borderColor: "rgb(255, 206, 86)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgb(255, 206, 86)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgb(255, 206, 86)",
            pointHoverBorderColor: "rgb(255, 206, 86)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.EST,
            spanGaps: false,
          }
        ]
      },
      options: {
        //end toolti
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              userCallback: function (value, index, values) {
                value = value.toString();
                value = value.split(/(?=(?:...)*$)/);
                value = value.join(',');
                return value;
              }
            },
            scaleLabel: {
              display: true,
              labelString: 'ล้านบาท'
            }
          }
          ],
          xAxes: [{
            ticks: {
              autoSkip: false,
              maxRotation: 90,
              minRotation: 0
            }
          }]
        }
      }

    });
  }


}
