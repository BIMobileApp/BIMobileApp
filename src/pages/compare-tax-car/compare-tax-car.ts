import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Chart } from 'chart.js';

@IonicPage()
@Component({
  selector: 'page-compare-tax-car',
  templateUrl: 'compare-tax-car.html',
})
export class CompareTaxCarPage {
  @ViewChild('LineCanvasTax') LineCanvasTax;
  @ViewChild('LineCanvasVol') LineCanvasVol;
 
  offcode:any;
  //Line Tax
  TaxlineChart: any;
  TaxLineData: any;
  tax_TAX = [];
  tax_TAX_LY = [];
  tax_lebel = [];
  
  //Line Vol
  VollineChart: any;
  vol_TAX = [];
  vol_TAX_LY = [];

  textDataNotValid : any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public webapi: RestProvider) {
  }

  ionViewDidLoad() {
    this.UserAthu();
  }

  UserAthu() {
    this.offcode = localStorage.offcode;
    this.getLineTaxData();
  }

 getLineTaxData() {
    this.webapi.getData('CompareTaxVolCar?offcode='+this.offcode).then((data) => {
      this.TaxLineData = data;
      if(this.TaxLineData.length > 0){
        this.TaxgetTAX();
        this.TaxgetTAX_LY();
        this.TaxgetLebel();
        this.TaxCreateChart();
        this.VolgetTAX();
        this.VolgetTAX_LY();
        this.VolCreateChart();
      }else{
        this.textDataNotValid = 0;
      }
     
    });
  }

  //----------------------- Start Manage Data from API-------------------------//

  TaxgetTAX() {
    this.tax_TAX = [];
    for (var i = 0; i < this.TaxLineData.length; i++) {
      this.tax_TAX.push(this.TaxLineData[i].TOTAL_TAX_AMT);
    }
    this.tax_TAX = JSON.parse(JSON.stringify(this.tax_TAX));
  }

  TaxgetTAX_LY() {
    this.tax_TAX_LY = [];
    for (var i = 0; i < this.TaxLineData.length; i++) {
      this.tax_TAX_LY.push(this.TaxLineData[i].LAST_TOTAL_TAX_AMT);
    }
    this.tax_TAX_LY = JSON.parse(JSON.stringify(this.tax_TAX_LY));
  }

  TaxgetLebel() {
    this.tax_lebel = [];
    for (var i = 0; i < this.TaxLineData.length; i++) {
      this.tax_lebel.push(this.TaxLineData[i].MONTH);
    }
    this.tax_lebel = JSON.parse(JSON.stringify(this.tax_lebel));
  }
  //----------------------- End Manage Data from API-------------------------//

  TaxCreateChart() {
    this.TaxlineChart = new Chart(this.LineCanvasTax.nativeElement, {
      type: 'line',
      data: {
        labels: this.tax_lebel,
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
            data: this.tax_TAX,
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
            data: this.tax_TAX_LY,
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
            var value;
            if (tooltipItem.yLabel > 999999) {
               value = data.datasets[tooltipItem.datasetIndex].label + ': ' + (tooltipItem.yLabel / 1000000).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " ล้านบาท";
            } else {
               value = data.datasets[tooltipItem.datasetIndex].label + ': ' + tooltipItem.yLabel.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " บาท";
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
                if(value >= 1000000){
                  value = (value / 1000000);
                  value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  return value;
                }else{
                  return value;
                }
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

  
  //----------------------- Start Manage Data from API-------------------------//

  VolgetTAX() {
    this.vol_TAX = [];
    for (var i = 0; i < this.TaxLineData.length; i++) {
      this.vol_TAX.push(this.TaxLineData[i].TOTAL_VOLUMN_CAPA);
    }
    this.vol_TAX = JSON.parse(JSON.stringify(this.vol_TAX));
  }

  VolgetTAX_LY() {
    this.vol_TAX_LY = [];
    for (var i = 0; i < this.TaxLineData.length; i++) {
      this.vol_TAX_LY.push(this.TaxLineData[i].LAST_TOTAL_VOLUMN_CAPA);
    }
    this.vol_TAX_LY = JSON.parse(JSON.stringify(this.vol_TAX_LY));
  }

  //----------------------- End Manage Data from API-------------------------//

  VolCreateChart() {
    this.VollineChart = new Chart(this.LineCanvasVol.nativeElement, {
      type: 'line',
      data: {
        labels: this.tax_lebel,
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
            data: this.vol_TAX,
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
            data: this.vol_TAX_LY,
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
              var value = data.datasets[tooltipItem.datasetIndex].label + ': ' + (tooltipItem.yLabel / 1000000).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " ล้านบาท";
            } else {
              var value = data.datasets[tooltipItem.datasetIndex].label + ': ' + tooltipItem.yLabel.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " บาท";
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