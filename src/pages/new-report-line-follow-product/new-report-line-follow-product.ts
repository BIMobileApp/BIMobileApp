import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewChild } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { RestProvider } from '../../providers/rest/rest';
import { Chart } from 'chart.js';

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
  id:any;

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
    this.webapi.getData('getProduct').then((data) => {
      this.prod = data;
     
    });
  }

  
  getData(id) {
    this.respondData = "";
    this.other = [];
    this.webapi.getData('newReportLineFollowProd?id='+id).then((data) => {
      this.respondData = data;
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
  getProd() {
    for (var i = 0; i < this.other.length; i++) {
      this.prod.push(this.other[i].GRP_NAME);
    }
    this.prod = JSON.parse(JSON.stringify(this.prod));
  }


  getTAX() {
    this.TAX=[];
    for (var i = 0; i < this.other.length; i++) {
      this.TAX.push(this.other[i].TAX);
    }
    this.TAX = JSON.parse(JSON.stringify(this.TAX));
  }

  getEST() {
    this.EST=[];
    for (var i = 0; i < this.other.length; i++) {
      this.EST.push(this.other[i].EST);
    }
    this.EST = JSON.parse(JSON.stringify(this.EST));
  }

  getLebel() {
    this.lebel=[];
    for (var i = 0; i < this.other.length; i++) {
      this.lebel.push(this.other[i].MONTH);
    }
    this.lebel = JSON.parse(JSON.stringify(this.lebel));
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
            lineTension: 0.0,
            backgroundColor: "#0392cf",
            borderColor: "#0392cf",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "#0392cf",
            pointBackgroundColor: "#0392cf",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#0392cf",
            pointHoverBorderColor: "#0392cf",
            pointHoverBorderWidth: 2,
            pointRadius: 3,
            pointHitRadius: 10,
            data: this.TAX,
            spanGaps: false,
          },
          {
            label: "ประมาณการ",
            fill: false,
            lineTension: 0.0,
            backgroundColor: "#f6cd61",
            borderColor: "#f6cd61",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "#f6cd61",
            pointBackgroundColor: "#f6cd61",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#f6cd61",
            pointHoverBorderColor: "#f6cd61",
            pointHoverBorderWidth: 2,
            pointRadius: 3,
            pointHitRadius: 10,
            data: this.EST,
            spanGaps: false,
          }
        ]
      },
      options: {
        
        chartArea: {
					backgroundColor: 'rgba(251, 85, 85, 0.4)'
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              userCallback: function (value, index, values) {
                  value = value/1000000;
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
