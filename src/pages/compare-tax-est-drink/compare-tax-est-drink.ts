import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Chart } from 'chart.js';
declare var dateDisplayAll: any;
@IonicPage()
@Component({
  selector: 'page-compare-tax-est-drink',
  templateUrl: 'compare-tax-est-drink.html',
})
export class CompareTaxEstDrinkPage {
  @ViewChild('LineCanvasTax') LineCanvasTax;
  //Table Pram
  responseData: any;
  ProductType: any;
  offcode: any;
  responseArea:any;
  responseProvince:any;

  //Line Tax
  TaxlineChart: any;
  TaxLineData: any;
  TaxCode: any;
  tax_TAX = [];
  tax_TAX_LY = [];
  tax_lebel = [];
  yAxesticks = [];
  textDataInValid: any;
  username:any;

  dateDisplay:any;
  dateAsOff:any;
  oldArea="";
  subArea:any;
    //Table reg
    responseRegData: any;
    grp_id: any;
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public webapi: RestProvider) {
      this.offcode = localStorage.offcode;
    this.username = localStorage.userData;
    this.dateDisplay = localStorage.last_update_date;
    this.dateAsOff = dateDisplayAll;
    this.grp_id = 'ภาษีเครื่องดื่ม';
    this.offcode = localStorage.offcode;
  }

  ionViewDidLoad() {
    this.getProductType();
    this.getLineAll();
    var area = undefined;
    var Province = undefined;
    this.selectionProviceFirst();
    this.selectionArea();
    this.getTableData(area, Province);
    this.selectDataAll(area, Province);
  }
  
  selectDataAll(area, Province) {
    this.webapi.getData('TopRegSegment?offcode=' + this.offcode + '&group_id=' + this.grp_id+'&area=' + area + '&province=' + Province ).then((data) => {
      this.responseRegData = data;
      if (!this.responseRegData) { } else { this.getTableRegTAX(); }
    });
  }
  getTableRegTAX() {
    let val;
    for (var i = 0; i < this.responseRegData.length; i++) {
      val = this.responseRegData[i].TAX;
      if(val != null){
        val = val/1000000;
        val = val.toFixed(2);
        val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }     
      this.responseRegData[i].TAX = val;
    }
  }

  selectionArea(){
    this.webapi.getData('ddlMRegion?offcode='+this.offcode).then((data) => {
      this.responseArea = data;
    });
  }
  selectionProviceFirst(){
    this.webapi.getData('ddlMProvince?offcode='+this.offcode+'&area=undefined').then((data) => {
      this.responseProvince = data;

    });
  }
  selectionProvince(area,Province){  
    this.webapi.getData('ddlMProvince?offcode='+this.offcode+'&area='+area).then((data) => {
      this.responseProvince = data;

    });
    this.getTableData(area,Province);
  }
  //-----------------------------------------------------------------------------------------------------------//
  getTableData(area, Province) {
    console.log("area: " + area);
    if (area != this.oldArea) {
      Province = undefined;
    }
    this.webapi.getData('CompareTaxDrink?area=' + area + '&Province=' + Province + '&offcode=' + this.offcode).then((data) => {
      this.responseData = data;
      this.getTableTAX();
      this.getTableTAX_LY();

    });
    this.selectDataAll(area, Province);
    this.oldArea = area;
  }

  //-----------------------------------------------------------------------------------------------------------//
  getTableTAX() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].TOTAL_TAX_AMT;
      if (val != null) {
        val = val / 1000000;
        val = val.toFixed(2);
        val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      this.responseData[i].TOTAL_TAX_AMT = val;
    }
  }

  getTableTAX_LY() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].LAST_TOTAL_TAX_AMT;
      if (val != null) {
        val = val / 1000000;
        val = val.toFixed(2);
        val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      this.responseData[i].LAST_TOTAL_TAX_AMT = val;
    }
  }

  getProductType() {
    this.webapi.getData('getTypeNameDrinkMonth?offcode=' + this.offcode).then((data) => {
      this.ProductType = data;
    });
  }

 
  getLineTaxData(TaxCode) {
    if (TaxCode != "") {
      this.webapi.getData('CompareTaxDrinkMonth?code=' + TaxCode + '&&offcode=' + this.offcode).then((data) => {
        this.TaxLineData = data;
        if (this.TaxLineData.length > 0) {
          this.TaxgetTAX();
          this.TaxgetTAX_LY();
          this.TaxgetLebel();
          this.TaxCreateChart();
    
        } else {
          this.textDataInValid = 0;
        }
      });
    } else {
     this.getLineAll();
    }


  }

  getLineAll(){
    this.webapi.getData('CompareTaxDrinkMonthAll?offcode=' + this.offcode).then((data) => {
      this.TaxLineData = data;
      if (this.TaxLineData.length > 0) {
        this.TaxgetTAX();
        this.TaxgetTAX_LY();
        this.TaxgetLebel();
        this.TaxCreateChart();
  
      } else {
        this.textDataInValid = 0;
      }
    });
  }


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
              labelString: "ล้านบาท",
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
