import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-tax-year-by-product',
  templateUrl: 'tax-year-by-product.html',
})
export class TaxYearByProductPage {

  summaryDate: any;
  responseData: any;
  offcode: any;

  //Table parm
  DataCurYear: any;
  DataProduct: any;
  DataGauge: any;
  Data = [];
  TAX = [];
  TAX_LY = [];
  EST = [];

  ProdTAX = [];
  ProdTAX_LY = [];
  ProdEST = [];

  YearTax: any;
  YearProduct: any;
  dateDisplay: any;
  username:any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public webapi: RestProvider) {
    this.offcode = localStorage.offcode;
    this.username = localStorage.userData;
  }

  year_en: any;
  year_th: any;
  
  ionViewDidLoad() {
    this.TableGetData();
    this.TableProductGetData();
    this.getTaxCurYear();
    this.getTaxProdYear();
    this.dateDisplay = localStorage.last_update_date;
  }
  getTaxCurYear() {
    this.webapi.getData('TaxCurYear').then((data) => {
      this.YearTax = data;
    });
  }

  getItemTax(TaxYear) {
    if (TaxYear != "") {
      this.webapi.getData('TaxCurYearbyYear?offcode=' + this.offcode + '&year=' + TaxYear).then((data) => {
        this.DataCurYear = data;
        this.getTAX();
        this.getLAST_TAX();
        this.getEST();
      });
    } else {
      this.TableGetData();
    }
  }

  getitemsProd(prodYear) {
    if (prodYear != "") {
      this.webapi.getData('TaxProductCurYearbyYear?offcode=' + this.offcode + '&year=' + prodYear).then((data) => {
        this.DataProduct = data;
        this.getProductTAX();
        this.getProductLAST_TAX();
        this.getProductEST();
      });
    } else {
      this.TableProductGetData();
    }
  }

  getTaxProdYear() {
    this.webapi.getData('TaxProductCurYear').then((data) => {
      this.YearProduct = data;
    });
  }

  TableGetData() {
    this.webapi.getData('TaxCurYear?offcode=' + this.offcode).then((data) => {
      this.DataCurYear = data;
      this.getTAX();
      this.getLAST_TAX();
      this.getEST();
    });
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

  TableProductGetData() {
    this.webapi.getData('TaxProductCurYear?offcode=' + this.offcode).then((data) => {
      this.DataProduct = data;
      this.getProductTAX();
      this.getProductLAST_TAX();
      this.getProductEST();
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
}
  /*

  getDataAll(){
      this.webapi.getData('TaxProductGroupByYearAll?offcode='+this.offcode).then((data)=>{
         this.responseData = data;
         this.getTableOCT();
         this.getTableNOV();
         this.getTableDEC();
         this.getTableJAN();
         this.getTableFAB();
         this.getTableMAR();
         this.getTableAPL();
         this.getTableMAY();
         this.getTableJUN();
         this.getTableJUL();
         this.getTableAUG();
         this.getTableSEP();
       });
  }

  getitemsByDate(dataYear){
    if(dataYear == ""){
      this.getDataAll();
    }else{
    this.webapi.getData('TaxProductGroupByYear?offcode='+this.offcode+'&year='+dataYear).then((data)=>{
        this.responseData = data;

      this.getTableOCT();
      this.getTableNOV();
      this.getTableDEC();
      this.getTableJAN();
      this.getTableFAB();
      this.getTableMAR();
      this.getTableAPL();
      this.getTableMAY();
      this.getTableJUN();
      this.getTableJUL();
      this.getTableAUG();
      this.getTableSEP();

      });
   }
  }
 
  getTableOCT() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].OCT/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].OCT = val;
    }
  }

  getTableNOV() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].NOV/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].NOV = val;
    }
  }

  getTableDEC() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].DEC/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].DEC = val;
    }
  }

  getTableJAN() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].JAN/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].JAN = val;
    }
  }

  getTableFAB(){
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].FEB/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].FEB = val;
    }
  }
  getTableMAR() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].MAR/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].MAR = val;
    }
  }
  getTableAPL() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].APL/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].APL = val;
    }
  }
  getTableMAY() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].MAY/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].MAY = val;
    }
  }
  getTableJUN() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].JUN/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].JUN = val;
    }
  }
  
  getTableJUL() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].JUL/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].JUL = val;
    }
  }
  getTableAUG() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].AUG/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].AUG = val;
    }
  }

  getTableSEP() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].SEP/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].SEP = val;
    }
  }

}*/
