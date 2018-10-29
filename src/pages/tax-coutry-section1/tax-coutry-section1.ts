import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';


declare var notRound: any;
declare var dateDisplayAll: any;
declare var changeCurrency: any;
declare var getColorMap: any; 
declare var budgetyear : any;
declare var addCommaPercent: any;
/* start for pinch */
const MAX_SCALE = 11.1;
const MIN_SCALE = 0.9;
const BASE_SCALE = 1.3;
/* end  */

@IonicPage()
@Component({
  selector: 'page-tax-coutry-section1',
  templateUrl: 'tax-coutry-section1.html',
})
export class TaxCoutrySection1Page {
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
  show_branch:any;

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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public app: App,
    public webapi: RestProvider) {
      this.username = localStorage.userData;
      this.dateAsOff = dateDisplayAll;
      this.offcode = localStorage.offcode;

      //หา offcode เพื่อหา ภาค จังหวัด สาขา
      this.region = localStorage.offcode.substring(0, 2);
      this.province = localStorage.offcode.substring(2, 4);
      this.branch =  localStorage.offcode.substring(4, 6);
  }

  regionSelectType = "";
  ionViewDidLoad() {
    this.setData();
    this.UserAthu();
    this.dateAsOff = dateDisplayAll;
  }
  
  UserAthu() {
   
     this.selectionProvince();
     //this.TableGetDataAll();
     let typeCurFirst = 'M';
     this.GetProvinceTable(typeCurFirst);
     var Province = undefined;

     let typeCur = 'M';
     this.TableGetData(Province,typeCur);
     this.show_branch = 0;

     this.OverallBranch(this.area, Province, typeCur);
   }

   selectionProvince(){

    this.webapi.getData('ddlMProvince?offcode=' + this.offcode + '&area=' + this.area).then((data) => {
      this.responseProvince = data;
    });
    /*this.webapi.getData('getAreaProvinceTaxCurYear?offcode='+this.offcode+'&area='+this.area).then((data) => {
      this.responseProvince = data;
    });*/

  }

  TableGetDataAll(typeCur){
    
    this.webapi.getData('TaxCurYearbyYear?offcode=' + this.offcode).then((data) => {
      this.DataCurYear = data;
      this.getDataTAX(typeCur);
    });
    this.webapi.getData('TaxProductCurYearbyYear?offcode=' + this.offcode).then((data) => {
      this.DataProduct = data;
     
     this.getProductTAX(typeCur);
    });
  }

GetProvinceTable(typeCurFirst){
  this.webapi.getData('TaxProvinceCurYear?area=' + this.area +'&offcode='+this.offcode).then((data) => {
    this.DataProvince = data;
    this.getProvinceTAX(typeCurFirst);
  });
}

TableGetData(Province,typeCur) {
  this.show_branch = 1;

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

  if(Province != "undefined"){
   this.display_province_fillter = Province;
  }else{
    this.display_province_fillter = "";
  }

 // this.brance = 1;
  this.webapi.getData('TaxCurYearbyYear?offcode=' + this.offcode+'&area='+this.area+'&province='+Province).then((data) => {
    this.DataCurYear = data;
    this.getDataTAX(this.regionSelectType);
  });
  this.webapi.getData('TaxProductCurYear?offcode=' + this.offcode+'&area='+this.area+'&province='+Province).then((data) => {
    this.DataProduct = data;
  
    this.getProductTAX(this.regionSelectType);
  });

  this.OverallBranch(this.area, Province, this.regionSelectType);
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
  let percent;
  for (var i = 0; i < this.DataOverallBranch.length; i++) {
    tax_branch = this.DataOverallBranch[i].TAX;
    if (tax_branch != null) { tax_branch = changeCurrency(tax_branch, typeCur); }
    this.DataOverallBranch[i].TAX = tax_branch;

    last_tax_branch = this.DataOverallBranch[i].LAST_TAX;
    if (last_tax_branch != null) { last_tax_branch = changeCurrency(last_tax_branch, typeCur); }
    this.DataOverallBranch[i].LAST_TAX = last_tax_branch;

    if(this.DataOverallBranch[i].PERCENT_TAX != null){
      percent = notRound(this.DataOverallBranch[i].PERCENT_TAX);
      this.DataOverallBranch[i].PERCENT_NOCOMMA = percent;
      this.DataOverallBranch[i].PERCENT_TAX = addCommaPercent(percent);
      /* this.DataOverallBranch[i].PERCENT_TAX = notRound(this.DataOverallBranch[i].PERCENT_TAX); */
    }
  }
 }

 

getDataTAX(typeCur){
  let tax;
  let last_tax;
  let est;
  let percent;

  for (var i = 0; i < this.DataCurYear.length; i++) {

    tax = this.DataCurYear[i].TAX;
    last_tax = this.DataCurYear[i].LAST_TAX;
    est = this.DataCurYear[i].ESTIMATE;

    if (tax != null) { tax = changeCurrency(tax, typeCur); }
    if (last_tax != null) { last_tax = changeCurrency(last_tax, typeCur); }
    if (est != null) { est = changeCurrency(est, typeCur); }
    if(this.DataCurYear[i].PERCENT_TAX != null){
      percent = notRound(this.DataCurYear[i].PERCENT_TAX);
      this.DataCurYear[i].PERCENT_NOCOMMA = percent;
      this.DataCurYear[i].PERCENT_TAX = addCommaPercent(percent);
     /*  this.DataCurYear[i].PERCENT_TAX = notRound(this.DataCurYear[i].PERCENT_TAX); */
    }
    this.DataCurYear[i].TAX = tax;
    this.DataCurYear[i].LAST_TAX = last_tax;
    this.DataCurYear[i].ESTIMATE = est;
  }
}

TableProductGetData(area,Province,typeCur) {
  if(area != this.oldArea){
    Province = 'undefined';
  }

  this.webapi.getData('TaxProductCurYear?offcode=' + this.offcode+'&area='+area+'&province='+Province).then((data) => {
    this.DataProduct = data;
    this.getProductTAX(typeCur);
  });
}

getProductTAX(typeCur) {
  let tax;
  let last_tax;
  let est;
  let percent;

  for (var i = 0; i < this.DataProduct.length; i++) {
    tax = this.DataProduct[i].TAX;
    last_tax = this.DataProduct[i].LAST_TAX;
    est = this.DataProduct[i].ESTIMATE;

    if (tax != null) { tax = changeCurrency(tax, typeCur); }
    if (last_tax != null) { last_tax = changeCurrency(last_tax, typeCur); }
    if (est != null) { est = changeCurrency(est, typeCur); }
    if(this.DataProduct[i].PERCENT_TAX != null){
      percent = notRound(this.DataProduct[i].PERCENT_TAX);
      this.DataProduct[i].PERCENT_NOCOMMA = percent;
      this.DataProduct[i].PERCENT_TAX = addCommaPercent(percent);
      /* this.DataProduct[i].PERCENT_TAX =  notRound(this.DataProduct[i].PERCENT_TAX); */
    }
    this.DataProduct[i].TAX = tax;
    this.DataProduct[i].LAST_TAX = last_tax;
    this.DataProduct[i].ESTIMATE = est;
  }

}



getProvinceTAX(typeCurFirst){
  let tax;
  let last_tax;
  let est;
  let percent;

  for (var i = 0; i < this.DataProvince.length; i++) {
    tax = this.DataProvince[i].TAX;
    last_tax = this.DataProvince[i].LAST_TAX;
    est = this.DataProvince[i].ESTIMATE;

    if (tax != null) { tax = changeCurrency(tax, typeCurFirst); }
    if (last_tax != null) { last_tax = changeCurrency(last_tax, typeCurFirst); }
    if (est != null) { est = changeCurrency(est, typeCurFirst); }
    if(this.DataProvince[i].PERCENT_TAX != null){
      percent = notRound(this.DataProvince[i].PERCENT_TAX);
      this.DataProvince[i].PERCENT_NOCOMMA = percent;
      this.DataProvince[i].PERCENT_TAX = addCommaPercent(percent);
      /* this.DataProvince[i].PERCENT_TAX =  notRound(this.DataProvince[i].PERCENT_TAX); */
    }

    this.DataProvince[i].TAX = tax;
    this.DataProvince[i].LAST_TAX = last_tax;
    this.DataProvince[i].ESTIMATE = est;
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


setData() {
  this.webapi.getData('MapColorRegion?budget_year='+budgetyear+'&region=01').then((data) => {
    this.responseData = data;
    for (var i = 0; i < this.responseData.length; i++) {
             
      let mapColor;
      let provinceName; 
      mapColor = this.responseData[i].MAP_COLOR;
      provinceName= this.responseData[i].PROVINCE_NAME_EN;

      if(provinceName=="P-chai_nat"){
        this.Pchainat =getColorMap(mapColor);
      }
      if(provinceName=="P-nonthaburi"){
        this.Pnonthaburi =getColorMap(mapColor);
      }
      if(provinceName=="P-pathum_thani1"){
        this.Ppathum_thani1 =getColorMap(mapColor);
      }
      if(provinceName=="P-pathum_thani2"){
        this.Ppathum_thani2 =getColorMap(mapColor);
      }
      if(provinceName=="P-lopburi"){
        this.Plopburi =getColorMap(mapColor);
      }
      if(provinceName=="P-saraburi"){
        this.Psaraburi =getColorMap(mapColor);
      }
      if(provinceName=="P-singburi"){
        this.Psingburi =getColorMap(mapColor);
      }
      if(provinceName=="P-ayutthaya1"){
        this.Payutthaya1 =getColorMap(mapColor);
      }
      if(provinceName=="P-ayutthaya2"){
        this.Payutthaya2 =getColorMap(mapColor);
      }
      if(provinceName=="P-ang_thong"){
        this.Pangthong =getColorMap(mapColor);
      } 
    }
     });    
  }

  GotoBranch(province){
    this.navCtrl.push('TaxBranchSection1Page',{province:province});
    /* this.app.getRootNav().push(TaxBranchSection1Page,{province:province});  */
  }
}
