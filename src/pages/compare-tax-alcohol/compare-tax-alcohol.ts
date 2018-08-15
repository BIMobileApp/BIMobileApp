import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Chart } from 'chart.js';


@IonicPage()
@Component({
  selector: 'page-compare-tax-alcohol',
  templateUrl: 'compare-tax-alcohol.html',
})
export class CompareTaxAlcoholPage {
  @ViewChild('LineCanvas') LineCanvas;
  responseData: any;
  lineChart: any;
  LineData: any;
  TAX = [];
  TAX_LY = [];
  EST = [];
  ComEst = [];
  lebel = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public webapi:RestProvider) {
  }

  ionViewDidLoad() {
    let grp_name = 'ภาษีสุรา';
    this.webapi.getData('CompareTax?grp_name='+grp_name).then((data)=>{
      this.responseData = data;
      console.log(this.responseData);
    });
    this.getLineData();
  }
  getLineData() {
    let grp_id = "7002";
    this.webapi.getData('CompareTaxLineGraph?id=' + grp_id).then((data) => {
      this.LineData = data;
      console.log(this.LineData);
      this.getTAX();
      this. getTAX_LY();
      this.getEST();
      this.getComEst();
      this.getLebel();
      this.createChart();
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

  getTAX_LY() {
    this.TAX_LY = [];
    for (var i = 0; i < this.LineData.length; i++) {
      this.TAX_LY.push(this.LineData[i].TAX_LY);
    }
    this.TAX_LY = JSON.parse(JSON.stringify(this.TAX_LY));
    console.log("lastyear" + this.TAX_LY);

  }

  getEST() {
    this.EST = [];
    for (var i = 0; i < this.LineData.length; i++) {
      this.EST.push(this.LineData[i].EST);
    }
    this.EST = JSON.parse(JSON.stringify(this.EST));
    console.log("est" + this.EST);
  }

  getComEst() {
    this.ComEst = [];
    for (var i = 0; i < this.LineData.length; i++) {
      this.ComEst.push(this.LineData[i].COMPARE_ESTIMATE_DIFF);
    }
    this.ComEst = JSON.parse(JSON.stringify(this.ComEst));
    console.log("com" + this.ComEst);
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
            label: "ปีก่อน",
            fill: false,
            lineTension: 0.1,
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
            data: this.TAX_LY,
            spanGaps: false,
          },
          {
            label: "ประมาณการ",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "#008744",
            borderColor: "#008744",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "#008744",
            pointBackgroundColor: "#008744",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#008744",
            pointHoverBorderColor: "#008744",
            pointHoverBorderWidth: 2,
            pointRadius: 3,
            pointHitRadius: 10,
            data: this.EST,
            spanGaps: false,
          },
          {
            label: "เปรียบเทียบประมาณการ",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "#f37735",
            borderColor: "#f37735",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "#f37735",
            pointBackgroundColor: "#f37735",   
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#f37735",
            pointHoverBorderColor: "#f37735",
            pointHoverBorderWidth: 2,
            pointRadius: 3,
            pointHitRadius: 10,
            data: this.ComEst,
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