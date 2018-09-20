import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { Chart } from 'chart.js';
import { RestProvider } from '../../providers/rest/rest';
import { TaxCoutrySection1Page } from '../tax-coutry-section1/tax-coutry-section1';
import { TaxCoutrySection2Page } from '../tax-coutry-section2/tax-coutry-section2';
import { TaxCoutrySection3Page } from '../tax-coutry-section3/tax-coutry-section3';
import { TaxCoutrySection4Page } from '../tax-coutry-section4/tax-coutry-section4';
import { TaxCoutrySection5Page } from '../tax-coutry-section5/tax-coutry-section5';
import { TaxCoutrySection6Page } from '../tax-coutry-section6/tax-coutry-section6';
import { TaxCoutrySection7Page } from '../tax-coutry-section7/tax-coutry-section7';
import { TaxCoutrySection8Page } from '../tax-coutry-section8/tax-coutry-section8';
import { TaxCoutrySection9Page } from '../tax-coutry-section9/tax-coutry-section9';
import { TaxCoutrySection10Page } from '../tax-coutry-section10/tax-coutry-section10';

declare var notRound: any;
declare var changeCurrency: any;
declare var dateDisplayAll: any; 
/* start for pinch */
const MAX_SCALE = 11.1;
const MIN_SCALE = 0.9;
const BASE_SCALE = 1.2;
/* end  */

@IonicPage()
@Component({
  selector: 'page-cetegory-tax',
  templateUrl: 'cetegory-tax.html',
})
export class CetegoryTaxPage {
  @ViewChild('barCanvas') barCanvas;
  //map parm
  offcode: any;
  off: any;
  pak: any;
  username: any;
  curTG = "บาท";
  //guage parm
  TaxGauge: any;
  TaxlyGauge: any;
  TaxEstGauge: any;
  responseData: any;
  offdesc: any;
  name: any;
  toggleBar = 0;
  toggleMap = 0;
  toggleTable = 0;

  barChart: any;
  bargetTax = [];
  bargetLAST_TAX = [];
  bargetESTIMATE = [];
  barIsNull = 1;

  //Table parm
  DataCurYear: any;
  DataProduct: any;
  DataGauge: any;
  DataProvince: any;
  Data = [];
  TAX = [];
  TAX_LY = [];
  EST = [];

  ProdTAX = [];
  ProdTAX_LY = [];
  ProdEST = [];
  responseArea: any;
  responseProvince: any;
  oldArea: any;
  oldtypeCur : any;
  hideTableBrance = 0;

  //dateDisplay = localStorage.getItem("last_update_date");
  dateDisplay = "";
  dateAsOff = "";

  region:any;
  province:any;
  branch:any;

  select_region:any;
  select_all_value:any;
  select_all_prov_value:any;
  select_province:any;
  isEnable:any;
  isEnableProv:any;
  oldRegion:any;


    /* start for pinch */
    public fontSize = `${BASE_SCALE}rem`;
    private scale = BASE_SCALE;
    private alreadyScaled = BASE_SCALE;
    public isScaling = false;
    /* end  */
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public app: App,
    public webapi: RestProvider) {
    this.dateDisplay = localStorage.last_update_date;
    this.dateAsOff = dateDisplayAll;
    this.username = localStorage.userData;
    this.offdesc = localStorage.offdesc;
    this.name = localStorage.username;
    this.offcode = localStorage.offcode;
    this.off = this.offcode.substring(0, 2);
    this.pak = parseInt(this.offcode, 10);

    ///หา offcode เพื่อหา ภาค จังหวัด สาขา
    this.region = localStorage.offcode.substring(0, 2);
    this.province = localStorage.offcode.substring(2, 4);
    this.branch =  localStorage.offcode.substring(4, 6);
  /// end  หา offcode เพื่อหา ภาค จังหวัด สาขา

   ///ตรวจสอบภาคเพื่อ default selection
   if(this.region != "00"){
     this.select_region = localStorage.region_desc;
     this.select_all_value = false;    
     this.isEnable  = true;        
   }else{
     this.select_all_value = true;
     this.isEnable  = false;
   }
///end ตรวจสอบภาคเพื่อ default selection

 /// ตรวจสอบสาขาเพื่อ default selection
 var res = "";
 if(this.branch != "00"){          
    res =  localStorage.offdesc.split(" ");
    this.select_province  = res[0];
    this.select_all_prov_value = false;
    this.isEnableProv = true;
  }else{
    this.select_all_prov_value = true;
    this.isEnableProv = false;
  }
 ///end  ตรวจสอบสาขาเพื่อ default selection
    
  }

  ionViewDidLoad() {
    this.selectionArea();
    this.selectionProviceFirst();
    let area;
    let Province;
    let typeCur = 'B';
    this.TableGetData(area, Province, typeCur);
    this.hideTableBrance = 0;
  }

  toggleBarShow() {
    if (this.toggleBar == 0) {
      this.BarGetData();
      this.toggleBar = 1;
    } else {
      this.toggleBar = 0;
    }
  }

  toggleMapShow() {
    if (this.toggleMap == 0) {
      this.toggleMap = 1;
    } else {
      this.toggleMap = 0;
    }
  }

  toggleTableShow() {
    if (this.toggleTable == 0) {
      this.toggleTable = 1;
    } else {
      this.toggleTable = 0;
    }
  }


  selectionArea() {
    this.webapi.getData('ddlMRegion?offcode=' + this.offcode).then((data) => {
      this.responseArea = data;
    });
  }
  selectionProviceFirst() {
    let region;
    if(this.region != "00"){
      region = localStorage.region_desc;
    }

    this.webapi.getData('ddlMProvince?offcode=' + this.offcode + '&area='+region).then((data) => {
      this.responseProvince = data;
    });
  }

  selectionProvince(area, Province, typeCur) {
    Province = undefined;
    this.responseProvince = [];

    if(this.region != "00"){
      area = localStorage.region_desc;
    }

    this.webapi.getData('ddlMProvince?offcode=' + this.offcode + '&area=' + area).then((data) => {
      this.responseProvince = data;
    });
    if (area !== "undefined") {
      this.TableGetData(area, Province, typeCur);
      this.GetProvinceTable(area, typeCur);
      this.hideTableBrance = 2;
     
    }else{
      this.TableGetData(area, Province, typeCur);
      this.hideTableBrance = 0;
    }
  }

  GetProvinceTable(area, typeCur) {
    this.webapi.getData('TaxProvinceCurYear?area=' + area).then((data) => {
      this.DataProvince = data;
      this.getProvinceTAX(typeCur);
    });
  }

  TableGetData(area, Province, typeCur) {

   let Region;
   let province;
    if(this.region != "00"){
      Region = localStorage.region_desc;
    }else{
      Region =area;
    }
    if(this.branch != "00"){    
      province =  this.select_province;
    }else{
      province = Province;
    }  

   /* if (Region !== this.oldArea || typeCur !== this.oldtypeCur) {
      province = undefined;
    }*/
    this.webapi.getData('TaxCurYearbyYear?offcode=' + this.offcode + '&area=' + Region + '&province=' + province).then((data) => {
      this.DataCurYear = data;
      this.getTAX(typeCur);
    });
    this.webapi.getData('TaxProductCurYear?offcode=' + this.offcode + '&area=' + Region + '&province=' + province).then((data) => {
      this.DataProduct = data;
      this.getProductTAX(typeCur);
    });
    this.oldArea = Region;
    this.oldtypeCur = typeCur;
    if (Province !== undefined) {
      this.hideTableBrance = 1;
    }
    if(typeCur == "M"){
      this.curTG = "ล้านบาท";
    }else{
      this.curTG = "บาท";
    }
  }

  getTAX(typeCur) {
    let tax;
    let last_tax;
    let est;
    for (var i = 0; i < this.DataCurYear.length; i++) {
      tax = this.DataCurYear[i].TAX;
      if (tax != null) { tax = changeCurrency(tax, typeCur); }
      this.DataCurYear[i].TAX = tax;

      last_tax = this.DataCurYear[i].LAST_TAX;
      if (last_tax != null) { last_tax = changeCurrency(last_tax, typeCur); }
      this.DataCurYear[i].LAST_TAX = last_tax;

      est = this.DataCurYear[i].ESTIMATE;
      if (est != null) { est = changeCurrency(est, typeCur); }
      this.DataCurYear[i].ESTIMATE = est;

      if (this.DataCurYear[i].PERCENT_TAX != null) {
        this.DataCurYear[i].PERCENT_TAX = notRound(this.DataCurYear[i].PERCENT_TAX);
      }
    }
  }

  getProductTAX(typeCur) {
    let tax;
    let last_tax;
    let est;
    for (var i = 0; i < this.DataProduct.length; i++) {
      tax = this.DataProduct[i].TAX;
      if (tax != null) { tax = changeCurrency(tax, typeCur); }
      this.DataProduct[i].TAX = tax;

      last_tax = this.DataProduct[i].LAST_TAX;
      if (last_tax != null) { last_tax = changeCurrency(last_tax, typeCur); }
      this.DataProduct[i].LAST_TAX = last_tax;

      est = this.DataProduct[i].ESTIMATE;
      if (est != null) { est = changeCurrency(est, typeCur); }
      this.DataProduct[i].ESTIMATE = est;

      if (this.DataProduct[i].PERCENT_TAX != null) {
        this.DataProduct[i].PERCENT_TAX = notRound(this.DataProduct[i].PERCENT_TAX);
      }
    }
  }



  getProvinceTAX(typeCur) {
    let tax;
    let last_tax;
    let est;
    for (var i = 0; i < this.DataProvince.length; i++) {
      tax = this.DataProvince[i].TAX;
      if (tax != null) { tax = changeCurrency(tax, typeCur); }
      this.DataProvince[i].TAX = tax;

      last_tax = this.DataProvince[i].LAST_TAX;
      if (last_tax != null) { last_tax = changeCurrency(last_tax, typeCur); }
      this.DataProvince[i].LAST_TAX = last_tax;

      est = this.DataProvince[i].ESTIMATE;
      if (est != null) { est = changeCurrency(est, typeCur); }
      this.DataProvince[i].ESTIMATE = est;

      if (this.DataProvince[i].PERCENT_TAX != null) {
        this.DataProvince[i].PERCENT_TAX = notRound(this.DataProvince[i].PERCENT_TAX);
      }
    }
  }

  ChangeCur(area, Province, typeCur) {
    if (this.hideTableBrance == 0) {
      this.TableGetData(area, Province, typeCur);
    } else if (this.hideTableBrance == 1) {
      this.TableGetData(area, Province, typeCur);
    } else {
      Province = undefined;
      this.TableGetData(area, Province, typeCur);
      this.GetProvinceTable(area, typeCur);
    }
  }

  BarGetData() {
    this.webapi.getData('GaugeOverviewRegion?offcode=' + this.offcode).then((data) => {
      this.responseData = data;
      if (this.responseData[0].TAX != null) {
        this.createBarChart();
      } else {
        this.barIsNull = 0;
      }
    });
  }

  createBarChart() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'horizontalBar',
      data: {
        labels: ["ปีนี้", "ปีก่อน", "ประมาณการ"],
        datasets: [{

          data: [
            this.responseData[0].TAX,
            this.responseData[0].LAST_TAX,
            this.responseData[0].ESTIMATE
          ],
          backgroundColor: [
            '#00818A',
            '#b8d00a',
            'rgba(255, 159, 64, 1)',
          ],
          borderColor: [
            '#00818A',
            '#b8d00a',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        legend: {
          display: false,
          labels: {
            boxWidth: 5,
          }
        },
        tooltips: {
          mode: 'index',
          label: 'myLabel',
          callbacks: {
            label: function (tooltipItem, data) {
              var value;
              if (tooltipItem.xLabel > 999999) {
                value = tooltipItem.yLabel + ': ' + (tooltipItem.xLabel / 1000000).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " ล้านบาท";
              } else {
                value = tooltipItem.yLabel + ': ' + tooltipItem.xLabel.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " บาท";
              }

              return value;
            }
          }
        },
        scales: {
          xAxes: [{
            gridLines: {
              color: 'rgba(171,171,171,1)',
              lineWidth: 1
            },
            ticks: {
              beginAtZero: true,
              userCallback: function (value, index, values) {
                if (value >= 1000000) {
                  value = (value / 1000000);
                  value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  return value;
                } else {
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
          yAxes: [{
            barThickness: 15,
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

  section1() {
    this.app.getRootNav().push(TaxCoutrySection1Page);
  }
  section2() {
    this.app.getRootNav().push(TaxCoutrySection2Page);
  }
  section3() {
    this.app.getRootNav().push(TaxCoutrySection3Page);
  }
  section4() {
    this.app.getRootNav().push(TaxCoutrySection4Page);
  }
  section5() {
    this.app.getRootNav().push(TaxCoutrySection5Page);
  }
  section6() {
    this.app.getRootNav().push(TaxCoutrySection6Page);
  }
  section7() {
    this.app.getRootNav().push(TaxCoutrySection7Page);
  }
  section8() {
    this.app.getRootNav().push(TaxCoutrySection8Page);
  }
  section9() {
    this.app.getRootNav().push(TaxCoutrySection9Page);
  }
  section10() {
    this.app.getRootNav().push(TaxCoutrySection10Page);
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
