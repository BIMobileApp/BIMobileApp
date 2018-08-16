import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Chart } from 'chart.js';

/**
 * Generated class for the CompareTaxEstAlcoholPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-compare-tax-est-alcohol',
  templateUrl: 'compare-tax-est-alcohol.html',
})
export class CompareTaxEstAlcoholPage {
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
  id: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public webapi: RestProvider) {
  }

  ionViewDidLoad() {
    this.getProduct();
    this.getLineData();

  }
  getLineData() {
    let grp_id = "7002";
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
            backgroundColor: "#2BBBD8",
            borderColor: "#2BBBD8",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "#2BBBD8",
            pointBackgroundColor: "#2BBBD8",
            pointBorderWidth: 3,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#2BBBD8",
            pointHoverBorderColor: "#2BBBD8",
            pointHoverBorderWidth: 3,
            pointRadius: 2,
            pointHitRadius: 10,
            data: this.TAX,
            spanGaps: false,
          },
          {
            label: "ประมาณการ",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "#F78D3F",
            borderColor: "#F78D3F",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "#F78D3F",
            pointBackgroundColor: "#F78D3F",
            pointBorderWidth: 3,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#F78D3F",
            pointHoverBorderColor: "#F78D3F",
            pointHoverBorderWidth: 3,
            pointRadius: 2,
            pointHitRadius: 10,
            data: this.EST,
            spanGaps: false,
          }
        ]
      },
      options: {
        
        tooltips: {
          mode: 'index',
          label: 'myLabel',
          callbacks: {
            label: function(tooltipItem, data) {
              if (tooltipItem.yLabel > 999999){
                var value = data.datasets[tooltipItem.datasetIndex].label + ': '+ (tooltipItem.yLabel/1000000).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " ล้านบาท";
              }else{
                var value = data.datasets[tooltipItem.datasetIndex].label + ': '+ tooltipItem.yLabel.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " บาท";
              }
              
              return value;
            }
          } // end callbacks:
        }, //end tooltip
      
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              userCallback: function (value, index, values) {
                value = (value / 1000000);
                value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                return value;
              }
            },
            scaleLabel: {
              display: true,
              labelString: 'ล้านบาท'
            },
           
          }
          ],
          xAxes: [{
            ticks: {
              autoSkip: false,
              maxRotation: 90,
              minRotation: 0
            }
          }],

        }
      }

    });
  }

}
