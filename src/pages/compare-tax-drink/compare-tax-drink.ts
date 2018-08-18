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
      this.lebel.push(this.LineData[i].MONTH_SHORT_DESC);
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
            backgroundColor: "#00818A",
            borderColor: "#00818A",
            borderWidth: 2,
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "#00818A",
            pointBackgroundColor: "#00818A",
            pointBorderWidth: 3,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#00818A",
            pointHoverBorderColor: "#00818A",
            pointHoverBorderWidth: 3,
            pointRadius: 2,
            pointHitRadius: 10,
            data: this.TAX,
            spanGaps: false,
          },
          {
            label: "ปีก่อน",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "#b8d00a",
            borderColor: "#b8d00a",
            borderWidth: 2,
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "#b8d00a",
            pointBackgroundColor: "#b8d00a",
            pointBorderWidth: 3,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#b8d00a",
            pointHoverBorderColor: "#b8d00a",
            pointHoverBorderWidth: 3,
            pointRadius: 2,
            pointHitRadius: 10,
            data: this.TAX_LY,
            spanGaps: false,
          },
          {
            label: "ประมาณการ",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "#F78D3F",
            borderColor: "#F78D3F",
            borderWidth: 2,
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
          },
          {
            label: "เปรียบเทียบประมาณการ",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "#D74B4B",
            borderColor: "#D74B4B",
            borderWidth: 2,
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "#D74B4B",
            pointBackgroundColor: "#D74B4B",
            pointBorderWidth: 3,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#D74B4B",
            pointHoverBorderColor: "#D74B4B",
            pointHoverBorderWidth: 3,
            pointRadius: 2,
            pointHitRadius: 10,
            data: this.ComEst,
            spanGaps: false,
          }
        ]
      },
      options: {
        legend: {
          display: true,
          labels: {
              boxWidth: 10,
          }
      },
      tooltips: {
        mode: 'index',
        label: 'myLabel',
        callbacks: {
          label: function (tooltipItem, data) {
            if (tooltipItem.yLabel > 999999) {
              var value = data.datasets[tooltipItem.datasetIndex].label + ': ' + (tooltipItem.yLabel / 1000000).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " ล้านบาท";
            } else {
              var value = data.datasets[tooltipItem.datasetIndex].label + ': ' + tooltipItem.yLabel.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " บาท";
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
