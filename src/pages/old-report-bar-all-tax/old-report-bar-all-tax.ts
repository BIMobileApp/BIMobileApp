import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { RestProvider } from '../../providers/rest/rest';
import { Chart } from 'chart.js';

/**
 * Generated class for the OldReportBarAllTaxPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-old-report-bar-all-tax',
  templateUrl: 'old-report-bar-all-tax.html',

})
export class OldReportBarAllTaxPage {

  @ViewChild('barCanvas') barCanvas;
  respondData: any;
  other = [];
  TAX = [];
  TAX_LY = [];
  EST = [];
  lebel = [];
  barChart: any;


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
      for (var i = 0; i < this.respondData.length; i++) {
        this.other.push(this.respondData[i]);
      }
      this.createChart();
    });

  }
  //----------------------- End Connect API--------------------------------------//
  //----------------------- Start Manage Data from API-------------------------//
  getTAX() {
    let gettax = [];
    for (var i = 0; i < this.other.length; i++) {
      this.TAX.push(this.other[i].TAX);
    }
    this.TAX = JSON.parse(JSON.stringify(this.TAX));

  }

  getTAX_LY() {
    for (var i = 0; i < this.other.length; i++) {
      this.TAX_LY.push(this.other[i].TAX_LY);
    }
    this.TAX_LY = JSON.parse(JSON.stringify(this.TAX_LY));
  }

  getEST() {
    for (var i = 0; i < this.other.length; i++) {
      this.EST.push(this.other[i].EST);
    }
    this.EST = JSON.parse(JSON.stringify(this.EST));
  }

  getLebel() {
    for (var i = 0; i < this.other.length; i++) {
      this.lebel.push(this.other[i].GRP_NAME);
    }
    this.lebel = JSON.parse(JSON.stringify(this.lebel));
  }
  //----------------------- End Manage Data from API-------------------------//

  //----------------------- Start Create Bar Chart--------------------------------------//

  createChart() {
    this.getTAX();
    this.getTAX_LY();
    this.getEST();
    this.getLebel();
    this.barChart = new Chart(this.barCanvas.nativeElement, {

      type: 'bar',
      data: {
        labels: this.lebel,
        datasets: [{
          label: 'ปีนี้',
          data: this.TAX,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255,99,132)',
          borderWidth: 1
        },
        {
          label: 'ปีก่อน',
          data: this.TAX_LY,
          backgroundColor: 'rgb(54, 162, 235)',
          borderColor: 'rgb(54, 162, 235)',
          borderWidth: 1
        },
        {
          label: 'ประมาณการ',
          data: this.EST,
          backgroundColor: 'rgb(255, 206, 86)',
          borderColor: 'rgb(255, 206, 86)',
          borderWidth: 1
        }]
      },
      options: {
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              var value = data.datasets[0].data[tooltipItem.index];
              if (parseInt(value) >= 1000) {
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' บาท';
              } else {
                return value + ' บาท';
              }
            }
          } // end callbacks:

        }, //end toolti
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

  //----------------------- End Create Bar Chart--------------------------------------//
}
