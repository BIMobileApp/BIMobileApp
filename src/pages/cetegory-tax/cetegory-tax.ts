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

/* declare var google; */
declare var dateDisplayAll: any;

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
  responseArea:any;
  responseProvince:any;
  oldArea:any;
  brance = 0;

  //dateDisplay = localStorage.getItem("last_update_date");
  dateDisplay = "";
  dateAsOff = "";
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public app: App,
    public webapi: RestProvider) {
  }

  ionViewDidLoad() {
    this.UserAthu();
    this.dateDisplay = localStorage.last_update_date;
    this.dateAsOff = dateDisplayAll;
    this.username = localStorage.userData;
    this.offdesc = localStorage.offdesc;
    this.name = localStorage.username;

  }

  toggleBarShow(){
  if(this.toggleBar == 0){
    this.BarGetData();
    this.toggleBar =1; 
  }else{
    this.toggleBar =0; 
  }
  }

  toggleMapShow(){
    if(this.toggleMap== 0){
      this.toggleMap =1; 
    }else{
      this.toggleMap =0; 
    }
  }

  toggleTableShow(){
    if(this.toggleTable== 0){
      this.toggleTable =1; 
    }else{
      this.toggleTable =0; 
    }
  }

  UserAthu() {
   this.offcode = localStorage.offcode;
    this.off = this.offcode.substring(0, 2);
    this.pak = parseInt(this.offcode, 10);
    //this.TableProductGetData();
    this.selectionArea();
    var area = undefined;
    var Province = undefined;
    this.TableGetData(area,Province);
    this.brance = 0;
    this.selectionProviceFirst();
  }

  /* selectionArea(){
    this.webapi.getData('getAreaProvinceTaxCurYear?offcode='+this.offcode).then((data) => {
      this.responseArea = data;
    });
  }

  selectionProvince(area,Province){   
    
    this.webapi.getData('getAreaProvinceTaxCurYear?offcode='+this.offcode+'&area='+area).then((data) => {
      this.responseProvince = data;
    });
    this.TableGetData(area,Province);
    this.GetProvinceTable(area);
    this.brance = 2;
  } */

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
    this.TableGetData(area,Province);
    this.GetProvinceTable(area);
    this.brance = 2;
  }


GetProvinceTable(area){
  this.webapi.getData('TaxProvinceCurYear?area=' + area).then((data) => {
    this.DataProvince = data;
    this.getProvinceTAX();
    this.getProvinceLAST_TAX();
    this.getProvinceEST();
    this.getProvincePERCENT_TAX();
  });
}

  BarGetData() {
    this.webapi.getData('GaugeOverviewRegion?offcode=' + this.offcode).then((data) => {
      this.responseData = data;
      if(this.responseData[0].TAX != null){
        this.createBarChart();
      }else{
        this.barIsNull = 0;
      }
    });
  }

  createBarChart() {
   this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'horizontalBar',
      data: {
        labels: ["ปีนี้","ปีก่อน","ประมาณการ"],
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
          yAxes: [{
            barThickness : 15,
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

 /* GaugeGetData() {
    this.webapi.getData('GaugeOverviewRegion?offcode=' + this.offcode).then((data) => {
      this.responseData = data;
    });
  } */

  TableGetData(area,Province) {
    this.brance = 1;
    if(area != this.oldArea){
      Province = 'undefined';
    }
    this.webapi.getData('TaxCurYearbyYear?offcode=' + this.offcode+'&area='+area+'&province='+Province).then((data) => {
      this.DataCurYear = data;
      this.getTAX();
      this.getLAST_TAX();
      this.getEST();
      this.getPercent();
    });
    
    this.webapi.getData('TaxProductCurYear?offcode=' + this.offcode+'&area='+area+'&province='+Province).then((data) => {
      this.DataProduct = data;
      this.getProductTAX();
      this.getProductLAST_TAX();
      this.getProductEST();
      this.getProductPERCENT_TAX();
    });
    this.oldArea = area
  }

  getPercent(){
    for (var i = 0; i < this.DataCurYear.length; i++) {
      if(this.DataCurYear[i].PERCENT_TAX != null){
        this.DataCurYear[i].PERCENT_TAX = this.DataCurYear[i].PERCENT_TAX.toFixed(2);
      }
    }
  }

  getTAX() {
    let val;
    for (var i = 0; i < this.DataCurYear.length; i++) {
      val = this.DataCurYear[i].TAX / 1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.DataCurYear[i].TAX = val;
    }
  }

  getLAST_TAX() {
    let val;
    for (var i = 0; i < this.DataCurYear.length; i++) {
      val = this.DataCurYear[i].LAST_TAX / 1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.DataCurYear[i].LAST_TAX = val;
    }
  }

  getEST() {
    let val;
    for (var i = 0; i < this.DataCurYear.length; i++) {
      val = this.DataCurYear[i].ESTIMATE / 1000000
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.DataCurYear[i].ESTIMATE = val;
    }
  }

  TableProductGetData(area,Province) {
    if(area != this.oldArea){
      Province = 'undefined';
    }
    this.webapi.getData('TaxProductCurYear?offcode=' + this.offcode+'&area='+area+'&province='+Province).then((data) => {
      this.DataProduct = data;
      this.getProductTAX();
      this.getProductLAST_TAX();
      this.getProductEST();
      this.getProductPERCENT_TAX();
    });
  }

  getProductTAX() {
    let val;
    for (var i = 0; i < this.DataProduct.length; i++) {
      val = this.DataProduct[i].TAX / 1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.DataProduct[i].TAX = val;
    }
  }

  getProductLAST_TAX() {
    let val;
    for (var i = 0; i < this.DataProduct.length; i++) {
      val = this.DataProduct[i].LAST_TAX / 1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.DataProduct[i].LAST_TAX = val;
    }
  }

  getProductEST() {
    let val;
    for (var i = 0; i < this.DataProduct.length; i++) {
      val = this.DataProduct[i].ESTIMATE / 1000000
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.DataProduct[i].ESTIMATE = val;
    }
  }

  getProductPERCENT_TAX(){
    for (var i = 0; i < this.DataProduct.length; i++) {
      if(this.DataProduct[i].PERCENT_TAX != null){
        this.DataProduct[i].PERCENT_TAX = this.DataProduct[i].PERCENT_TAX.toFixed(2);
      }
    }
  }

  getProvinceTAX(){
    let val;
    for (var i = 0; i < this.DataProvince.length; i++) {
      val = this.DataProvince[i].TAX / 1000000
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.DataProvince[i].TAX = val;
    }
  }
  getProvinceLAST_TAX(){
    let val;
    for (var i = 0; i < this.DataProvince.length; i++) {
      val = this.DataProvince[i].LAST_TAX / 1000000
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.DataProvince[i].LAST_TAX = val;
    }
  }
  getProvinceEST(){
    let val;
    for (var i = 0; i < this.DataProvince.length; i++) {
      val = this.DataProvince[i].ESTIMATE / 1000000
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.DataProvince[i].ESTIMATE = val;
    }
  }
  getProvincePERCENT_TAX(){
    for (var i = 0; i < this.DataProvince.length; i++) {
      if(this.DataProvince[i].PERCENT_TAX != null){
        this.DataProvince[i].PERCENT_TAX = this.DataProvince[i].PERCENT_TAX.toFixed(2);
      }
    }
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


}
