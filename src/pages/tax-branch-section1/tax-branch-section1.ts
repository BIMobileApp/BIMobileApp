import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

declare var dateDisplayAll: any;
declare var changeCurrency: any;
declare var getColorMap: any; 
/* start for pinch */
const MAX_SCALE = 11.1;
const MIN_SCALE = 0.9;
const BASE_SCALE = 1.3;
/* end  */

@IonicPage()
@Component({
  selector: 'page-tax-branch-section1',
  templateUrl: 'tax-branch-section1.html',
})
export class TaxBranchSection1Page {

  username:any;
  dateAsOff = "";
  offcode: any;

   //Table parm
   DataCurYear: any;
   DataProduct: any;
   DataGauge: any;
   DataProvince: any;
   DataOverallBranch:any
   Data = [];
   TAX = [];
   TAX_LY = [];
   EST = [];
 
   ProdTAX = [];
   ProdTAX_LY = [];
   ProdEST = [];
   responseProvince:any;
   oldArea:any;
   brance = 0;
   area = 'ภาค 01';
   curTG = "ล้านบาท";
   display_province_fillter = "";

  region:any;
  province:any;
  branch:any;
  resProvince:any;
  titleProvince:any;

  /* start for pinch */
  public fontSize = `${BASE_SCALE}rem`;
  private scale = BASE_SCALE;
  private alreadyScaled = BASE_SCALE;
  public isScaling = false;
  /* end  */

  responseData : any;   
  public Pchainat = `#DCDCDD`;
  public Psingburi = `#DCDCDD`;
  public Plopburi = `#DCDCDD`;
  public Psaraburi = `#DCDCDD`;
  public Payutthaya1 = `#DCDCDD`;
  public Pangthong = `#DCDCDD`;
  public Payutthaya2 = `#DCDCDD`;
  public Ppathum_thani1 = `#DCDCDD`;
  public Ppathum_thani2 = `#DCDCDD`;
  public Pnonthaburi = `#DCDCDD`;

  constructor(public navCtrl: NavController, public navParams: NavParams
    ,public app: App,
    public webapi: RestProvider) {
      this.username = localStorage.userData;
      this.dateAsOff = dateDisplayAll;
      this.offcode = localStorage.offcode;
        
        //หา offcode เพื่อหา ภาค จังหวัด สาขา
        this.region = localStorage.offcode.substring(0, 2);
        this.province = localStorage.offcode.substring(2, 4);
        this.branch =  localStorage.offcode.substring(4, 6);

        this.resProvince = this.navParams.get('province');
       
  }

  regionSelectType = "";
  ionViewDidLoad() {
    //console.log(this.resProvince);
    this.setData(this.resProvince);
    this.UserAthu();
    this.dateAsOff = dateDisplayAll;
    this.titleProvince =  this.resProvince;
    this.display_province_fillter = this.resProvince;
  }

  UserAthu() {
   
    //this.selectionProvince();
    //this.TableGetDataAll();
    let typeCurFirst = 'M';
    this.GetProvinceTable(typeCurFirst);
    var Province = undefined;

    let typeCur = 'M';
    this.TableGetData(Province,typeCur);
    this.brance = 0;

    this.OverallBranch(this.area, Province, typeCur);
  }

  /*selectionProvince(){
   this.webapi.getData('ddlMBranch?area='+this.area+'&province='+this.resProvince).then((data) => {
     this.responseProvince = data;
   });
 }*/

 TableGetDataAll(typeCur){
   
   this.webapi.getData('TaxCurYearbyYear?offcode=' + this.offcode).then((data) => {
     this.DataCurYear = data;
     this.getTAX();
     this.getLAST_TAX();
     this.getEST();
     this.getPercent();
   });
   this.webapi.getData('TaxProductCurYearbyYear?offcode=' + this.offcode).then((data) => {
     this.DataProduct = data;
    this.getProductTAX(typeCur);
     /*this.getProductLAST_TAX();
     this.getProductEST();
     this.getProductPERCENT_TAX();*/
   });
 }

GetProvinceTable(typeCurFirst){
 this.webapi.getData('TaxBranch?area=' + this.area +'&offcode='+this.offcode+'&province='+this.resProvince).then((data) => {
   this.DataProvince = data;
   this.getProvinceTAX(typeCurFirst);
 });
}

TableGetData(Province,typeCur) {

 if(typeCur == undefined){
   this.regionSelectType = "M";
 }else{
   this.regionSelectType =  typeCur;
 }

 if(typeCur == "M"){
   this.curTG = "ล้านบาท";
 }else if(typeCur == undefined){
   this.curTG = "ล้านบาท";
 }else{
   this.curTG = "บาท";
 }


 this.brance = 1;
 this.webapi.getData('TaxCurMonthOfBranch?offcode=' + this.offcode+'&area='+this.area+'&province='+this.resProvince ).then((data) => {
   this.DataCurYear = data;
   this.getDataTAX(this.regionSelectType);
   /*this.getTAX();
   this.getLAST_TAX();
   this.getEST();
   this.getPercent();*/
 });
 this.webapi.getData('TaxCurProductOfBranch?offcode=' + this.offcode+'&area='+this.area+'&province='+this.resProvince ).then((data) => {
   this.DataProduct = data;
   this.getProductTAX(this.regionSelectType);
   /*this.getProductLAST_TAX();
   this.getProductEST();
   this.getProductPERCENT_TAX();*/
 });

 this.OverallBranch(this.area, this.resProvince , this.regionSelectType);
}

OverallBranch(area, Province, typeCur){
  
 if (this.branch != "00" || this.province != "00") {
   Province = localStorage.offcode.substring(2, 4);
 } else {
   Province = Province;
 }

 this.webapi.getData('TaxOverallBranch?&region='+this.area+'&province='+Province).then((data) => {
   this.DataOverallBranch = data;
   this.getTaxBranch(typeCur);
 });

}

getTaxBranch(typeCur){
 let tax_branch;
 let last_tax_branch;
 for (var i = 0; i < this.DataOverallBranch.length; i++) {
   tax_branch = this.DataOverallBranch[i].TAX;
   if (tax_branch != null) { tax_branch = changeCurrency(tax_branch, typeCur); }
   this.DataOverallBranch[i].TAX = tax_branch;

   last_tax_branch = this.DataOverallBranch[i].LAST_TAX;
   if (last_tax_branch != null) { last_tax_branch = changeCurrency(last_tax_branch, typeCur); }
   this.DataOverallBranch[i].LAST_TAX = last_tax_branch;
 }
}

getPercent(){
 for (var i = 0; i < this.DataCurYear.length; i++) {
   if(this.DataCurYear[i].PERCENT_TAX != null){
     this.DataCurYear[i].PERCENT_TAX = this.DataCurYear[i].PERCENT_TAX.toFixed(2);
   }
 }
}

getDataTAX(typeCur){
 let tax;
 let last_tax;
 let est;

 for (var i = 0; i < this.DataCurYear.length; i++) {

   tax = this.DataCurYear[i].TAX;
   last_tax = this.DataCurYear[i].LAST_TAX;
   est = this.DataCurYear[i].ESTIMATE;

   if (tax != null) { tax = changeCurrency(tax, typeCur); }
   if (last_tax != null) { last_tax = changeCurrency(last_tax, typeCur); }
   if (est != null) { est = changeCurrency(est, typeCur); }

   this.DataCurYear[i].TAX = tax;
   this.DataCurYear[i].LAST_TAX = last_tax;
   this.DataCurYear[i].ESTIMATE = est;
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

TableProductGetData(area,Province,typeCur) {
 if(area != this.oldArea){
   Province = 'undefined';
 }

 this.webapi.getData('TaxProductCurYear?offcode=' + this.offcode+'&area='+area+'&province='+Province).then((data) => {
   this.DataProduct = data;
   this.getProductTAX(typeCur);
   this.getProductLAST_TAX();
   this.getProductEST();
   this.getProductPERCENT_TAX();
 });
}

getProductTAX(typeCur) {
 let tax;
 let last_tax;
 let est;

 for (var i = 0; i < this.DataProduct.length; i++) {
   tax = this.DataProduct[i].TAX;
   last_tax = this.DataProduct[i].LAST_TAX;
   est = this.DataProduct[i].ESTIMATE;

   if (tax != null) { tax = changeCurrency(tax, typeCur); }
   if (last_tax != null) { last_tax = changeCurrency(last_tax, typeCur); }
   if (est != null) { est = changeCurrency(est, typeCur); }

   this.DataProduct[i].TAX = tax;
   this.DataProduct[i].LAST_TAX = last_tax;
   this.DataProduct[i].ESTIMATE = est;
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

getProvinceTAX(typeCurFirst){
 let tax;
 let last_tax;
 let est;

 for (var i = 0; i < this.DataProvince.length; i++) {
   tax = this.DataProvince[i].TAX;
   last_tax = this.DataProvince[i].LAST_TAX;
   est = this.DataProvince[i].ESTIMATE;

   if (tax != null) { tax = changeCurrency(tax, typeCurFirst); }
   if (last_tax != null) { last_tax = changeCurrency(last_tax, typeCurFirst); }
   if (est != null) { est = changeCurrency(est, typeCurFirst); }

   this.DataProvince[i].TAX = tax;
   this.DataProvince[i].LAST_TAX = last_tax;
   this.DataProvince[i].ESTIMATE = est;
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

ChangeUnit(Province, typeCur){
 this.TableGetData(Province,typeCur);
}

ChangeUnitFirst(typeCurFirst){
 this.GetProvinceTable(typeCurFirst);
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


setData(province_select) {
 this.webapi.getData('MapColorRegion?budget_year=2562&region=01').then((data) => {
   this.responseData = data;
   for (var i = 0; i < this.responseData.length; i++) {
    //console.log( this.responseData);
     let mapColor;
     let provinceName; 
     mapColor = this.responseData[i].MAP_COLOR;
     provinceName= this.responseData[i].PROVINCE_NAME;

     console.log(provinceName);
     if(provinceName == this.resProvince){
       this.Pchainat =   '#FDC07F';
     }else{
      this.Pchainat = '#E6E6E6';
     }
    if(provinceName== this.resProvince){
       this.Pnonthaburi =  '#FDC07F';
     }else{
      this.Pnonthaburi =  '#E6E6E6';
     }

     if(provinceName== this.resProvince){
       this.Ppathum_thani1 =  '#FDC07F';
     }else{
      this.Pchainat = '#E6E6E6';
     }
     if(provinceName== this.resProvince){
       this.Ppathum_thani2 =  '#FDC07F';
     }else{
      this.Pchainat = '#E6E6E6';
     }
     if(provinceName== this.resProvince){
       this.Plopburi =  '#FDC07F';
     }else{
      this.Pchainat = '#E6E6E6';
     }
     if(provinceName== this.resProvince){
       this.Psaraburi =  '#FDC07F';
     }else{
      this.Pchainat = '#E6E6E6';
     }
     if(provinceName==this.resProvince){
       this.Psingburi =  '#FDC07F';
     }else{
      this.Pchainat = '#E6E6E6';
     }
     if(provinceName==this.resProvince){
       this.Payutthaya1 =  '#FDC07F';
     }else{
      this.Pchainat = '#E6E6E6';
     }
     if(provinceName==this.resProvince){
       this.Payutthaya2 =  '#FDC07F';
     }else{
      this.Pchainat = '#E6E6E6';
     }
     if(provinceName==this.resProvince){
       this.Pangthong =  '#FDC07F';
     }else{
      this.Pchainat = '#E6E6E6';
     }
   }
    });    
 }

}