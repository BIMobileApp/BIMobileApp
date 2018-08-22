import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Chart } from 'chart.js';


@IonicPage()
@Component({
  selector: 'page-compare-tax-alcohol',
  templateUrl: 'compare-tax-alcohol.html',
})
export class CompareTaxAlcoholPage {
  @ViewChild('LineCanvasTax') LineCanvasTax;
  @ViewChild('LineCanvasVol') LineCanvasVol;
  //Table Pram
  responseData: any;

  ProductType: any;

  //Line Tax
  TaxlineChart: any;
  TaxLineData: any;
  TaxCode: any;
  tax_TAX = [];
  tax_TAX_LY = [];
  tax_lebel = [];
  


  //Line Vol
  VollineChart: any;
  VolLineData: any;
  VolCode: any;
  vol_TAX = [];
  vol_TAX_LY = [];
  vol_lebel = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public webapi: RestProvider) {
  }

  ionViewDidLoad() {
    this.getTableData();
    this.getProductType();
  }
  getTableData() {
      this.webapi.getData('CompareTaxSura').then((data) => {
      this.responseData = data;
      this.ProductType = data;
      console.log(this.responseData);
      console.log('ProductType'+this.ProductType);
      
      this.getTableTAX();
      this.getTableTAX_LY();
    });
  }

  getProductType() {
    this.webapi.getData('CompareTaxSuraLineGraph').then((data) => {
    this.ProductType = data;
    console.log(this.ProductType);
    
    
  });
}

  

  getTableTAX() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].TOTAL_TAX_AMT/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].TOTAL_TAX_AMT = val;
    }
  }

  getTableTAX_LY() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].LAST_TOTAL_TAX_AMT/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].LAST_TOTAL_TAX_AMT = val;
    }
  }

  /*
  getTableEST() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].ESTIMATE/1000000
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].ESTIMATE = val;
      //console.log(this.responseData);
    }
  }

  getTableCOMPARE() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].COMPARE_ESTIMATE_DIFF/1000000
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].COMPARE_ESTIMATE_DIFF = val;
    }
  }
  */


 getLineTaxData(TaxCode) {
    this.webapi.getData('CompareTaxSuraLineGraph?code='+TaxCode).then((data) => {
      this.TaxLineData = data;
      console.log(this.TaxLineData);
      this.TaxgetTAX();
      this.TaxgetTAX_LY();
      this.TaxgetLebel();
      this.TaxCreateChart();
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
/*
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
  }*/

  TaxgetLebel() {
    this.tax_lebel = [];
    for (var i = 0; i < this.TaxLineData.length; i++) {
      this.tax_lebel.push(this.TaxLineData[i].MONTH);
    }
    this.tax_lebel = JSON.parse(JSON.stringify(this.tax_lebel));
    console.log(this.tax_lebel);
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
          }/*,
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
          }*/
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

  getLineVolData(VolCode) {
    this.webapi.getData('CompareTaxSuraLineGraph?code='+VolCode).then((data) => {
      this.VolLineData = data;
      console.log(this.TaxLineData);
      this.VolgetTAX();
      this.VolgetTAX_LY();
      this.VolgetLebel();
      this.VolCreateChart();
    });


  }

  //----------------------- Start Manage Data from API-------------------------//

  VolgetTAX() {
    this.vol_TAX = [];
    for (var i = 0; i < this.VolLineData.length; i++) {
      this.vol_TAX.push(this.VolLineData[i].TOTAL_VOLUME_TAX_AMT);
    }
    this.vol_TAX = JSON.parse(JSON.stringify(this.vol_TAX));
  }

  VolgetTAX_LY() {
    this.vol_TAX_LY = [];
    for (var i = 0; i < this.VolLineData.length; i++) {
      this.vol_TAX_LY.push(this.VolLineData[i].LAST_TOTAL_VOLUME_TAX_AMT);
    }
    this.vol_TAX_LY = JSON.parse(JSON.stringify(this.vol_TAX_LY));

  }

  VolgetLebel() {
    this.vol_lebel = [];
    for (var i = 0; i < this.VolLineData.length; i++) {
      this.vol_lebel.push(this.VolLineData[i].MONTH);
    }
    this.vol_lebel = JSON.parse(JSON.stringify(this.vol_lebel));
    console.log(this.vol_lebel);
  }
  //----------------------- End Manage Data from API-------------------------//

  VolCreateChart() {
    this.VollineChart = new Chart(this.LineCanvasVol.nativeElement, {
      type: 'line',
      data: {
        labels: this.vol_lebel,
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