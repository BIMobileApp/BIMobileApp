import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Chart } from 'chart.js';
declare var changeCurrency: any;
declare var dateDisplayAll: any;
/* start for pinch */
const MAX_SCALE = 11.1;
const MIN_SCALE = 0.9;
const BASE_SCALE = 1.3;
/* end  */
@IonicPage()
@Component({
  selector: 'page-compare-tax-est-beer',
  templateUrl: 'compare-tax-est-beer.html',
})
export class CompareTaxEstBeerPage {
  @ViewChild('LineCanvasTax') LineCanvasTax;
  //Table Pram
  responseData: any;
  ProductType: any;
  offcode: any;
  responseArea: any;
  responseProvince: any;
  curTG = "บาท";

  //Line Tax
  TaxlineChart: any;
  TaxLineData: any;
  TaxCode: any;
  tax_TAX = [];
  tax_TAX_LY = [];
  tax_lebel = [];
  yAxesticks = [];
  textDataInValid: any;
  username: any;

  dateDisplay: any;
  dateAsOff: any;
  subArea: any;
  oldArea: any;
  oldtypeCur: any;
  toggleLine = 0;
  toggleTable = 0;
  //Table reg
  responseRegData: any;
  grp_id: any;
  /* start for pinch */
  public fontSize = `${BASE_SCALE}rem`;
  private scale = BASE_SCALE;
  private alreadyScaled = BASE_SCALE;
  public isScaling = false;
  /* end  */
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public webapi: RestProvider) {

    this.offcode = localStorage.offcode;
    this.username = localStorage.userData;
    this.dateDisplay = localStorage.last_update_date;
    this.dateAsOff = dateDisplayAll;
    this.grp_id = 'ภาษีเบียร์';
    this.offcode = localStorage.offcode;

  }

  ionViewDidLoad() {
    this.getProductType();
    let area = undefined;
    let Province = undefined;
    let typeCur = 'B';
    this.selectionProviceFirst();
    this.selectionArea();
    this.getTableData(area, Province, typeCur);
    this.selectDataAll(area, Province, typeCur);

  }
  toggleLineShow() {
    if (this.toggleLine == 0) {
      this.getLineAll();
      this.toggleLine = 1;
    } else {
      this.toggleLine = 0;
    }
  }

  toggleTableShow() {
    if (this.toggleTable == 0) {
      this.toggleTable = 1;
    } else {
      this.toggleTable = 0;
    }
  }
  selectDataAll(area, Province, typeCur) {
    this.webapi.getData('TopRegSegment?offcode=' + this.offcode + '&group_id=' + this.grp_id + '&area=' + area + '&province=' + Province).then((data) => {
      this.responseRegData = data;
      if (!this.responseRegData) { } else { this.getTableRegTAX(typeCur); }
    });
  }
  getTableRegTAX(typeCur) {
    let val;
    for (var i = 0; i < this.responseRegData.length; i++) {
      val = this.responseRegData[i].TAX;
      if (val != null) { val = changeCurrency(val, typeCur); }
      this.responseRegData[i].TAX = val;
    }
  }
  selectionArea() {
    this.webapi.getData('ddlMRegion?offcode=' + this.offcode).then((data) => {
      this.responseArea = data;
    });
  }
  selectionProviceFirst() {
    this.webapi.getData('ddlMProvince?offcode=' + this.offcode + '&area=undefined').then((data) => {
      this.responseProvince = data;
    });
  }
  selectionProvince(area, Province, typeCur) {
    this.webapi.getData('ddlMProvince?offcode=' + this.offcode + '&area=' + area).then((data) => {
      this.responseProvince = data;

    });
    this.getTableData(area, Province, typeCur);
  }
  //-----------------------------------------------------------------------------------------------------------//
  getTableData(area, Province, typeCur) {

    if (area !== this.oldArea || typeCur !== this.oldtypeCur) {
      Province = undefined;
    }
    this.webapi.getData('CompareTaxBeer?area=' + area + '&Province=' + Province + '&offcode=' + this.offcode).then((data) => {
      this.responseData = data;
      this.getTableTAX(typeCur);

    });
    this.selectDataAll(area, Province, typeCur);
    this.oldArea = area;
    this.oldtypeCur = typeCur;
    if (typeCur == "M") {
      this.curTG = "ล้านบาท";
    } else {
      this.curTG = "บาท";
    }
  }


  //-----------------------------------------------------------------------------------------------------------//
  getTableTAX(typeCur) {
    let tax;
    let last_tax;
    for (var i = 0; i < this.responseData.length; i++) {
      tax = this.responseData[i].TOTAL_TAX_AMT;
      if (tax != null) { tax = changeCurrency(tax, typeCur); }
      this.responseData[i].TOTAL_TAX_AMT = tax;

      last_tax = this.responseData[i].LAST_TOTAL_TAX_AMT;
      if (last_tax != null) { last_tax = changeCurrency(last_tax, typeCur); }
      this.responseData[i].LAST_TOTAL_TAX_AMT = last_tax;
    }
  }


  getProductType() {
    this.webapi.getData('getTypeNameBeerMonth?offcode=' + this.offcode).then((data) => {
      this.ProductType = data;
    });
  }


  getLineTaxData(TYPE_DESC) {
    if (TYPE_DESC != "") {
      this.webapi.getData('CompareTaxBeerMonth?TYPE_DESC=' + TYPE_DESC + '&offcode=' + this.offcode).then((data) => {
        this.TaxLineData = data;
        if (this.TaxLineData.length > 0) {
          this.TaxgetTAX();
          this.TaxlineChart.destroy();
          this.TaxCreateChart();

        } else {
          this.textDataInValid = 0;
        }
      });
    } else {
      this.getLineAll();
    }


  }

  getLineAll() {
    this.webapi.getData('CompareTaxBeerMonthAll?offcode=' + this.offcode).then((data) => {
      this.TaxLineData = data;
      if (this.TaxLineData.length > 0) {
        this.TaxgetTAX();
        if(this.TaxlineChart){
          this.TaxlineChart.destroy();
        }
        this.TaxCreateChart();

      } else {
        this.textDataInValid = 0;
      }
    });
  }



  TaxgetTAX() {
    this.tax_TAX = [];
    this.tax_TAX_LY = [];
    this.tax_lebel = [];
    for (var i = 0; i < this.TaxLineData.length; i++) {
      this.tax_TAX.push(this.TaxLineData[i].TOTAL_TAX_AMT);
      this.tax_TAX_LY.push(this.TaxLineData[i].LAST_TOTAL_TAX_AMT);
      this.tax_lebel.push(this.TaxLineData[i].MONTH);
    }
    this.tax_TAX = JSON.parse(JSON.stringify(this.tax_TAX));
    this.tax_TAX_LY = JSON.parse(JSON.stringify(this.tax_TAX_LY));
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
              let value;
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
  /* start for pinch */
  public onPinchStart(e) {
    this.isScaling = true;
  }
  public onPinchEnd(e) {
    this.isScaling = false;
    this.alreadyScaled = this.scale * this.alreadyScaled;
  }
  public onPinchMove(e) {
    this.scale = e.scale;
    let totalScaled = this.alreadyScaled * e.scale;
    if (totalScaled >= MAX_SCALE) {
      this.scale = MAX_SCALE / this.alreadyScaled;
      totalScaled = MAX_SCALE;
    } else if (totalScaled <= MIN_SCALE) {
      this.scale = MIN_SCALE / this.alreadyScaled;
      totalScaled = MIN_SCALE;
    }

    let fontSize = Math.round(totalScaled * 10) / 10;
    if ((fontSize * 10) % 3 === 0) {
      this.fontSize = `${fontSize}rem`;
    }
  }
  /* end  */
}
