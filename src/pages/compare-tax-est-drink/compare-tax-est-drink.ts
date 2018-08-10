import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Chart } from 'chart.js';

/**
 * Generated class for the CompareTaxEstDrinkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-compare-tax-est-drink',
  templateUrl: 'compare-tax-est-drink.html',
})
export class CompareTaxEstDrinkPage {
  @ViewChild('LineCanvas') LineCanvas;
  responseData: any;
  lineChart: any;

  LineData: any;
  TAX = [];
  TAX_LY = [];
  EST = [];
  ComEst = [];
  lebel = [];
  prod: any;
  product: any;
  id:any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public webapi: RestProvider) {
  }

  ionViewDidLoad() {
    this.getProduct();
    this.getLineData();
    
  }
  getLineData() {
    let grp_id = "0201";
    this.webapi.getData('CompareTaxLineGraph?id=' + grp_id).then((data) => {
      this.LineData = data;
      console.log(this.LineData);
      this.getTAX();
      this.getEST();
      this.getLebel();
      this.createChart();
    });


  }

  getProduct() {
    this.webapi.getData('getProduct').then((data) => {
      this.prod = data;
      console.log(this.prod);
     
    });
  }

  //----------------------- Start Manage Data from API-------------------------//

  getTAX() {
    this.TAX = [];
    for (var i = 0; i < this.LineData.length; i++) {
      this.TAX.push(this.LineData[i].TAX);
    }
    this.TAX = JSON.parse(JSON.stringify(this.TAX));
    console.log("tax" + this.TAX);

  }

  getEST() {
    this.EST = [];
    for (var i = 0; i < this.LineData.length; i++) {
      this.EST.push(this.LineData[i].EST);
    }
    this.EST = JSON.parse(JSON.stringify(this.EST));
    console.log("est" + this.EST);
  }

  getLebel() {
    this.lebel = [];
    for (var i = 0; i < this.LineData.length; i++) {
      this.lebel.push(this.LineData[i].BUDGET_MONTH_DESC);
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
            backgroundColor: "rgb(255, 122, 21)",
            borderColor: "rgb(255, 122, 21)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgb(255, 122, 21",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgb(255, 122, 21)",
            pointHoverBorderColor: "rgb(255, 122, 21)",
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
