import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Chart } from 'chart.js';
declare var dateDisplayAll: any;
declare var convertMthBudYear: any;
declare var monthNowNumber: any;
declare var GetYAxes: any;
declare var GetTooltips: any;


@IonicPage()
@Component({
  selector: 'page-compare-tax-alcohol',
  templateUrl: 'compare-tax-alcohol.html',
})
export class CompareTaxAlcoholPage {
  @ViewChild('LineCanvasTax') LineCanvasTax;
  @ViewChild('LineCanvasVol') LineCanvasVol;

  offcode: any;
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

  textDataNotValid: any;
  username: any;

  dateDisplay: any;
  dateAsOff: any;
  mthNumber: any;

  Province: any;
  region: any;
  province: any;
  branch: any;
  select_region: any;
  select_all_value: any;
  isEnable: any;
  select_province: any;
  select_all_prov_value: any;
  isEnableProv: any;

  responseDateTitle: any;
  responseRegion: any;
  responseProvince: any;
  responseMonth: any;
  changeCurrencyType = '';
  strVolUnit = '';
  strTaxUnit = '';
  dbtable = "MBL_PRODUCT_SURA_MONTH";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public webapi: RestProvider) {
    ///หา offcode เพื่อหา ภาค จังหวัด สาขา
    this.region = localStorage.offcode.substring(0, 2);
    this.province = localStorage.offcode.substring(2, 4);
    this.branch = localStorage.offcode.substring(4, 6);
    /// end  หา offcode เพื่อหา ภาค จังหวัด สาขา

    ///ตรวจสอบภาคเพื่อ default selection
    if (this.region != "00") {
      this.select_region = localStorage.region_desc;
      this.select_all_value = false;
      this.isEnable = true;
    } else {
      this.select_all_value = true;
      this.isEnable = false;
    }
    ///end ตรวจสอบภาคเพื่อ default selection

    /// ตรวจสอบสาขาเพื่อ default selection
    var res = "";
    if (this.branch != "00" || this.province != "00") {
      res = localStorage.offdesc.split(" ");
      this.select_province = res[0];
      this.select_all_prov_value = false;
      this.isEnableProv = true;
    } else {
      this.select_all_prov_value = true;
      this.isEnableProv = false;
    }
    ///end  ตรวจสอบสาขาเพื่อ default selection
  }

  select_mth_from = '';
  select_mth_to = '';

  ionViewDidLoad() {
    this.ddlMonthFrom();
    this.ddlMonthTo();

    this.dateAsOff = dateDisplayAll;
    this.username = localStorage.userData;
    this.dateDisplay = localStorage.last_update_date;
    this.mthNumber = monthNowNumber;
    // this.dateAsOff =  dateDisplayAll;

    this.dateAsOff = 'ข้อมูล ' + dateDisplayAll;
    this.offcode = localStorage.offcode;

    this.selectionAreaAll();
    this.selectionProvinceAll();
    this.selectionBudgetMonth();

    let Region;
    let Province;
    let typeCur = 'M';
    this.strVolUnit = 'ล้านลิตร';
    this.strTaxUnit = 'ล้านบาท';
    let month_from = convertMthBudYear(this.mthNumber);;
    let month_to = convertMthBudYear(this.mthNumber);;

    this.select_mth_from = month_from;
    this.select_mth_to = month_to;

    this.getLineTaxData(Region, Province, month_from, month_to);

  }

  ResponseMthFrom: any;
  ddlMonthFrom() {
    this.webapi.getData('dllMMonth').then((data) => {
      this.ResponseMthFrom = data;
    });
  }

  ResponseMthTo: any;
  ddlMonthTo() {
    this.webapi.getData('dllMMonth').then((data) => {
      this.ResponseMthTo = data;
    });
  }

  selectionAreaAll() {
    this.webapi.getData('ddlMRegion?offcode=' + this.offcode).then((data) => {
      this.responseRegion = data;
    });
  }

  selectionProvinceAll() {
    let region;
    if (this.region != "00") {
      region = localStorage.region_desc;
    }
    this.webapi.getData('ddlMProvince?offcode=' + this.offcode + '&area=' + region).then((data) => {
      this.responseProvince = data;
    });
  }

  selectRegion(Region, Province, month_from, month_to) {
    Province = 'undefined';
    this.Province = 'undefined';
    this.selectionProvince(Region, Province, month_from, month_to);
  }

  selectionProvince(Region, Province, month_from, month_to) {
    if (this.region != "00") {
      Region = localStorage.region_desc;
    }
    this.webapi.getData('ddlMProvince?offcode=' + this.offcode + '&area=' + Region).then((data) => {
      this.responseProvince = data;
    });


    this.getLineTaxData(Region, Province, month_from, month_to);
  }

  selectionBudgetMonth() {
    this.webapi.getData('dllMMonth').then((data) => {
      this.responseMonth = data;
    });
  }


  getLineTaxData(Region, Province, month_from, month_to) {

    if (this.region != "00") {
      Region = localStorage.region_desc;
    }

    if (this.branch != "00" || this.province != "00") {
      Province = this.select_province;
    }
    this.changeCurrencyType = "M";
    this.strVolUnit = 'ล้านลิตร';
    this.strTaxUnit = 'ล้านบาท';
  /*   if(typeCur == undefined){
      this.changeCurrencyType = "M";
      this.strVolUnit = 'ล้านลิตร';
      this.strTaxUnit = 'ล้านบาท';
    }else if(typeCur == 'M'){
      this.changeCurrencyType =  typeCur;
      this.strVolUnit = 'ล้านลิตร';
      this.strTaxUnit = 'ล้านบาท';
    }else{
      this.changeCurrencyType =  typeCur;
      this.strVolUnit = 'ลิตร';
      this.strTaxUnit = 'บาท';
    } */

    this.webapi.getData('CompareTaxVolProduct?offcode=' + this.offcode + '&region=' + Region + '&province=' + Province + '&month_from=' + month_from + '&month_to=' + month_to + '&dbtable=' + this.dbtable).then((data) => {
      /* this.webapi.getData('CompareTaxVolSura?offcode='+this.offcode+'&region='+Region+'&province='+Province).then((data) => { */
      this.TaxLineData = data;
      if (this.TaxLineData.length > 0) {
        this.textDataNotValid = 1;
        this.TaxgetTAX();
        if (this.TaxlineChart) {
          this.TaxlineChart.destroy();
        }
        setTimeout(() => {
          this.TaxCreateChart();
        }, 1000);

        this.VolgetTAX();
        if (this.VollineChart) {
          this.VollineChart.destroy();
        }
        setTimeout(() => {
          this.VolCreateChart();
        }, 1000);

      } else {
        this.textDataNotValid = 0;
      }
    });

    this.getDateTiTle(month_from, month_to);
  }
  getDateTiTle(monthFrom, monthTo) {

    let dateTitle;
    if (monthFrom != undefined && monthTo != undefined) {
      if (monthFrom != 'undefined' && monthTo != 'undefined') {
        this.webapi.getData('DateTitle?startMonth=' + (monthFrom == undefined ? monthTo : monthFrom) + '&endMonth=' + (monthTo == undefined ? monthFrom : monthTo)).then((data) => {
          this.responseDateTitle = data;
          dateTitle = this.responseDateTitle[0].DATE_TITLE;
          //  console.log("dateTitle"+dateTitle);
          if (dateTitle == "0") {
            this.dateAsOff = "โปรดตรวจสอบช่วงเดือนอีกครั้ง";
          } else {

            this.dateAsOff = dateTitle;
          }
          //  console.log("this.dateAsOff"+this.dateAsOff);
        });
      } else {
        this.dateAsOff = 'ข้อมูล ' + dateDisplayAll;
      }
    } else {
      this.dateAsOff = 'ข้อมูล ' + dateDisplayAll;
    }
  }
  //----------------------- Start Manage Data from API-------------------------//

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

  //----------------------- End Manage Data from API-------------------------//

  TaxCreateChart() {
    let curType = this.changeCurrencyType;
    let str = this.strTaxUnit;
    this.TaxlineChart = new Chart(this.LineCanvasTax.nativeElement, {
      type: 'line',
      data: {
        labels: this.tax_lebel,
        /*   labels: this.label, */
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
              let name = data.datasets[tooltipItem.datasetIndex].label;
              let val = tooltipItem.yLabel;
              let value = GetTooltips(val,name,curType,str);
              return value;
            }
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              userCallback: function (value, index, values) {
               /*  if(this.tax_TAX == undefined && this.tax_TAX_LY == undefined){
                  value = 0;
                }else{
                  value = GetYAxes(value,curType);
                } */
                value = GetYAxes(value,curType);
                return value;
              }
            },
            scaleLabel: {
              display: true,
              labelString: this.strTaxUnit
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
    this.vol_TAX_LY = [];
    for (var i = 0; i < this.TaxLineData.length; i++) {
      this.vol_TAX.push(this.TaxLineData[i].TOTAL_VOLUMN_CAPA);
      this.vol_TAX_LY.push(this.TaxLineData[i].LAST_TOTAL_VOLUMN_CAPA);
    }
    this.vol_TAX = JSON.parse(JSON.stringify(this.vol_TAX));
    this.vol_TAX_LY = JSON.parse(JSON.stringify(this.vol_TAX_LY));
  }


  //----------------------- End Manage Data from API-------------------------//
 

  VolCreateChart() {
    let curType = this.changeCurrencyType;
    let str = this.strVolUnit;
    this.VollineChart = new Chart(this.LineCanvasVol.nativeElement, {
      type: 'line',
      data: {
        labels: this.tax_lebel,
        /*  labels: this.label, */
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
              let name = data.datasets[tooltipItem.datasetIndex].label;
              let val = tooltipItem.yLabel;
              let value = GetTooltips(val,name,curType,str);
              return value;
            }
          } // end callbacks:
        }, //end tooltip
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              userCallback: function (value, index, values) {
              /*   if(this.tax_TAX == undefined && this.tax_TAX_LY == undefined){
                  value = 0;
                }else{
                  value = GetYAxes(value,curType);
                } */
                value = GetYAxes(value,curType);
                return value;

              }
            },
            scaleLabel: {
              display: true,
              labelString: this.strVolUnit
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