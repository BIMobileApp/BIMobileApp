import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Chart } from 'chart.js';

@IonicPage()
@Component({
  selector: 'page-compare-tax-drink',
  templateUrl: 'compare-tax-drink.html',
})
export class CompareTaxDrinkPage {
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
    public webapi: RestProvider) {
  }

  ionViewDidLoad() {
    this.getTableData();
    this.getLineData();
  }
  getTableData() {
    let grp_name = 'ภาษีเครื่องดื่ม';
    this.webapi.getData('CompareTax?grp_name=' + grp_name).then((data) => {
      this.responseData = data;
      console.log(this.responseData);
      this.getTableTAX();
      this.getTableTAX_LY();
      this.getTableEST();
      this.getTableCOMPARE();
    });
  }
  getTableTAX() {
    this.TAX = [];
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].TAX / 1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].TAX = val;
    }
  }
  getTableTAX_LY() {
    this.TAX_LY = [];
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].TAX_LY / 1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].TAX_LY = val;
    }
  }

  getTableEST() {
    this.EST = [];
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].ESTIMATE / 1000000
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].ESTIMATE = val;
    }
  }

  getTableCOMPARE() {
    this.EST = [];
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].COMPARE_ESTIMATE_DIFF / 1000000
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].COMPARE_ESTIMATE_DIFF = val;
    }
  }
  getLineData() {
    let grp_id = "0201";
    this.webapi.getData('CompareTaxLineGraph?id=' + grp_id).then((data) => {
      this.LineData = data;
      console.log(this.LineData);
      this.getTAX();
      this.getTAX_LY();
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
            label: "ปีก่อน",
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
            data: this.TAX_LY,
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
          },
          {
            label: "เปรียบเทียบประมาณการ",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgb(255, 432, 12)",
            borderColor: "rgb(255, 432, 12)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgb(255, 432, 12)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgb(255, 432, 12)",
            pointHoverBorderColor: "rgb(255, 432, 12)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
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
