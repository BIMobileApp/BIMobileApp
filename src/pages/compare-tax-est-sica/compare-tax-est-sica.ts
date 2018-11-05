import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Chart } from 'chart.js';
declare var changeCurrency: any;
declare var dateDisplayAll: any;
declare var convertMthBudYear: any;
declare var monthNowNumber: any;
declare var GetYAxes: any;
declare var GetTooltips: any;
declare var dateDisplayMonthNow: any; 
/* start for pinch */
const MAX_SCALE = 11.1;
const MIN_SCALE = 0.9;
const BASE_SCALE = 1.3;
/* end  */

@IonicPage()
@Component({
  selector: 'page-compare-tax-est-sica',
  templateUrl: 'compare-tax-est-sica.html',
})
export class CompareTaxEstSicaPage {
  @ViewChild('LineCanvasTax') LineCanvasTax;
  //Table Pram
  responseData: any;
  ProductType: any;
  offcode: any;
  responseArea: any;
  responseProvince: any;
  display_region_top10 = "";
  display_province_top10 = "";
  responseDateTitle: any;
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

  typeCurLine: any;
  TYPE_DESC: any;
  changeCurrencyType = '';
  strTaxUnit = '';

  dateDisplay: any;
  dateAsOff: any;
  dateAsOffLine: any;
  subArea: any;

  oldArea: any;
  oldtypeCur: any;
  Province: any;
  toggleLine = 0;
  toggleTable = 0;

  //Table reg d
  responseRegData: any;
  grp_id: any;
  curTG = "ล้านบาท";
  region: any;
  province: any;
  branch: any;

  select_region: any;
  select_all_value: any;
  select_all_prov_value: any;
  select_province: any;
  isEnable: any;
  isEnableProv: any;
  eecMarkShow: any;
  mthNumber: any;
  month_from: any;
  month_to: any;

  /* start for pinch */
  public fontSize = `${BASE_SCALE}rem`;
  private scale = BASE_SCALE;
  private alreadyScaled = BASE_SCALE;
  public isScaling = false;
  /* end  */
  constructor(public navCtrl: NavController, public navParams: NavParams, public webapi: RestProvider) {
    this.offcode = localStorage.offcode;
    this.username = localStorage.userData;
    this.dateDisplay = localStorage.last_update_date;
    this.mthNumber = monthNowNumber;
    //this.dateAsOff = dateDisplayAll;
    this.dateAsOff = 'ข้อมูล ' + dateDisplayMonthNow;
    this.dateAsOffLine = 'ข้อมูล ' + dateDisplayAll;
    this.grp_id = 'ภาษียาสูบ';
    this.offcode = localStorage.offcode;

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
    this.getProductType();
    let area;
    let Province;
    let month_from = convertMthBudYear(this.mthNumber);
    let month_to = convertMthBudYear(this.mthNumber);
    this.month_from = convertMthBudYear(this.mthNumber);
    this.month_to = convertMthBudYear(this.mthNumber);
    let typeCur = 'M';
    this.strTaxUnit = 'ล้านบาท';
    this.selectionArea();
    this.selectionProviceFirst();

    this.select_mth_from = month_from;
    this.select_mth_to = month_to;
    this.getTableDataAll(area, Province, typeCur, month_from, month_to);
    /* this.getTableData(area, Province, typeCur,month_from,month_to);
    this.selectDataAll(area, Province, typeCur,month_from,month_to); */
  }
  toggleLineShow() {
    this.changeCurrencyType = "M";
    this.strTaxUnit = 'ล้านบาท';
    this.typeCurLine = "M";
    this.TYPE_DESC = "";
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

  selectDataAll(area, Province, typeCur, month_from, month_to) {
    this.webapi.getData('Top10Profile?offcode=' + this.offcode + '&group_id=' + this.grp_id + '&region=' + area + '&province=' + Province + '&month_from=' + month_from + '&month_to=' + month_to).then((data) => {
      /* this.webapi.getData('TopRegSegment?offcode=' + this.offcode + '&group_id=' + this.grp_id + '&area=' + area + '&province=' + Province).then((data) => { */
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
    let region;
    if (this.region != "00") {
      region = localStorage.region_desc;
    }
    this.webapi.getData('ddlMProvince?offcode=' + this.offcode + '&area=' + region).then((data) => {
      this.responseProvince = data;
    });
  }
  selectionProvince(area, Province, typeCur, month_from, month_to) {

    Province = 'undefined';
    this.Province = 'undefined';

    this.webapi.getData('ddlMProvince?offcode=' + this.offcode + '&area=' + area).then((data) => {
      this.responseProvince = data;

    });
    if (area == "EEC") {
      this.eecMarkShow = 1;
    } else {
      this.eecMarkShow = 0;
    }
    this.getTableData(area, Province, typeCur, month_from, month_to);
  }
  //-----------------------------------------------------------------------------------------------------------//
  getTableDataAll(area, Province, typeCur, month_from, month_to) {
    let table = "MBL_PRODUCT_TOBACCO";
    if (this.region != "00") {
      if (area != 'undefined') {
        this.display_region_top10 = localStorage.region_desc;
      } else {
        this.display_region_top10 = "";
      }
      area = localStorage.region_desc;
    } else {
      if (area != 'undefined') {
        this.display_region_top10 = area;
      } else {
        this.display_region_top10 = "";
      }
      area = area;
    }
    if (this.branch != "00" || this.province != "00") {
      if (Province != 'undefined') {
        this.display_province_top10 = this.select_province;
      }
      else {
        this.display_province_top10 = "";
      }
      Province = this.select_province;
    } else {
      if (Province != 'undefined') {
        this.display_province_top10 = Province;
      }
      else {
        this.display_province_top10 = "";
      }
      Province = Province;
    }

    this.regionSelectType = "M";
    this.webapi.getData('CompareTaxProduct?area=' + area + '&Province=' + Province + '&offcode=' + this.offcode + '&month_from=' + month_from + '&month_to=' + month_to + '&dbtable=' + table).then((data) => {
      /* this.webapi.getData('CompareTaxSica?area=' + area + '&Province=' + Province + '&offcode=' + this.offcode).then((data) => { */
      this.responseData = data;
      this.getTableTAX(this.regionSelectType);

    });
    this.selectDataAll(area, Province, this.regionSelectType, month_from, month_to);
    this.oldArea = area;
    this.oldtypeCur = typeCur;

  }
  regionSelectType = "";
  getTableData(area, Province, typeCur, month_from, month_to) {

    /* if (area !== this.oldArea || typeCur !== this.oldtypeCur) {
       this.Province = undefined;
       Province = undefined;
     }*/
    let table = "MBL_PRODUCT_TOBACCO";
    if (this.region != "00") {
      if (area != 'undefined') {
        this.display_region_top10 = localStorage.region_desc;
      } else {
        this.display_region_top10 = "";
      }
      area = localStorage.region_desc;
    } else {
      if (area != 'undefined') {
        this.display_region_top10 = area;
      } else {
        this.display_region_top10 = "";
      }
      area = area;
    }
    if (this.branch != "00" || this.province != "00") {
      if (Province != 'undefined') {
        this.display_province_top10 = this.select_province;
      }
      else {
        this.display_province_top10 = "";
      }
      Province = this.select_province;
    } else {
      if (Province != 'undefined') {
        this.display_province_top10 = Province;
      }
      else {
        this.display_province_top10 = "";
      }
      Province = Province;
    }

    if (typeCur == undefined) {
      this.regionSelectType = "M";
    } else {
      this.regionSelectType = typeCur;
    }
    this.webapi.getData('CompareTaxProduct?area=' + area + '&Province=' + Province + '&offcode=' + this.offcode + '&month_from=' + month_from + '&month_to=' + month_to + '&dbtable=' + table).then((data) => {
      /* this.webapi.getData('CompareTaxSica?area=' + area + '&Province=' + Province + '&offcode=' + this.offcode).then((data) => { */
      this.responseData = data;
      this.getTableTAX(this.regionSelectType);

    });
    this.selectDataAll(area, Province, this.regionSelectType, month_from, month_to);
    this.oldArea = area;
    this.oldtypeCur = typeCur;
    if (typeCur == "M") {
      this.curTG = "ล้านบาท";
    } else if (typeCur == undefined) {
      this.curTG = "ล้านบาท";
    } else {
      this.curTG = "บาท";
    }
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
    this.webapi.getData('getTypeNameSicaMonth?offcode=' + this.offcode).then((data) => {
      this.ProductType = data;
    });
  }

  getLineTaxData(TYPE_DESC) {
    this.changeCurrencyType = "M";
    this.strTaxUnit = 'ล้านบาท';
    /*  if (typeCurLine == undefined) {
       this.changeCurrencyType = "M";
       this.strTaxUnit = 'ล้านบาท';
     } else if (typeCurLine == 'M') {
       this.changeCurrencyType = typeCurLine;
       this.strTaxUnit = 'ล้านบาท';
     } else {
       this.changeCurrencyType = typeCurLine;
       this.strTaxUnit = 'บาท';
     }
     if( TYPE_DESC == undefined ){ TYPE_DESC = ""; } */
    if (TYPE_DESC != "") {
      this.webapi.getData('CompareTaxSicaMonth?TYPE_DESC=' + TYPE_DESC + '&offcode=' + this.offcode).then((data) => {
        this.TaxLineData = data;
        if (this.TaxLineData.length > 0) {
          this.textDataInValid = 1;
          this.TaxgetTAX();
          this.TaxgetTAX_LY();
          this.TaxgetLebel();
          if (this.TaxlineChart) {
            this.TaxlineChart.destroy();
          }
          setTimeout(() => {
            this.TaxCreateChart();
          }, 1000);

        } else {
          this.textDataInValid = 0;
        }
      });
    } else {
      this.getLineAll();
    }
  }

  getLineAll() {
    this.webapi.getData('CompareTaxSicaMonth?offcode=' + this.offcode).then((data) => {
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
    let curType = this.changeCurrencyType;
    let str = this.strTaxUnit;
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
              let name = data.datasets[tooltipItem.datasetIndex].label;
              let val = tooltipItem.yLabel;
              let value = GetTooltips(val, name, curType, str);
              return value;
            }
          } // end callbacks:
        }, //end tooltip
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
                value = GetYAxes(value, curType);
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
