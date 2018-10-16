import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
declare var changeCurrency: any;
declare var dateDisplayAll: any;
declare var changeCurrencyNoUnit:any;
declare var convertMthBudYear:any;
declare var monthNowNumber:any;
/* start for pinch */
const MAX_SCALE = 11.1;
const MIN_SCALE = 0.9;
const BASE_SCALE = 1.3;
/* end  */
@IonicPage()
@Component({
  selector: 'page-inc-data-mth',
  templateUrl: 'inc-data-mth.html',
})
export class IncDataMthPage {

  offcode: any;
  responseData: any;
  responseArea: any;
  responseProvince: any;
  responseGroupName: any;
  repondProductSura: any;
  repondProductSica: any;
  responseTypeSura: any;
  responseTypeSica: any;
  responseTypeCard: any;
  repondProductCard: any;
  repondSumProductSura: any;
  repondSumProductSica: any;
  repondSumProductCard: any;
  responseSumArea: any;
  repondProduct: any;
  dateDisplay: any;
  dateAsOff: any;
  dateAsOffOverall:any;
  disoffcode: any;
  responseDateTitle:any;
  defaultSelectQuestion: any;
  defaultSelectProvinceSura: any;
  questionArray: any;
  username: any;

  region: any;
  province: any;
  branch: any;
  Province:any;

  select_region: any;
  select_all_value: any;
  select_all_prov_value: any;
  select_province: any;
  isEnable: any;
  isEnableProv: any;

  oldArea: any;
  oldtypeCur: any;
  curTG = "ล้านบาท";
  unitTG2 = "ล้านใบ";
  toggleTable2 = 0;
  toggleTable1 = 0;
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
    this.dateDisplay = localStorage.last_update_date;
    //this.dateAsOff = dateDisplayAll;
    this.mthNumber = monthNowNumber;
    this.username = localStorage.userData;

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

  mthNumber:any;
  select_mth_from1 = '';
  select_mth_to1 = '';

  ionViewDidLoad() {
    this.ddlMonthFrom();
    this.ddlMonthTo();

    let typeCur = 'M';
    let typeCur2 = 'M';
    let Region;
    let Province;
    let Mth_From = convertMthBudYear(this.mthNumber);
    let Mth_To = convertMthBudYear(this.mthNumber);

    this.select_mth_from1 = Mth_From;
    this.select_mth_to1 = Mth_To;

    this.loadDataAll(Region, Province,typeCur2)
    //this.loadData(Mth_From,Mth_To,typeCur2);
    this.IncProductAll(Region,Province,Mth_From,Mth_To,typeCur);
    this.selectionArea();
    this.selectionAllProvince();
    this.overallRegion();
    this.overallProvince();
  }

  toggleTable2Show() {
    if (this.toggleTable2 == 0) {
      this.toggleTable2 = 1;
    } else {
      this.toggleTable2 = 0;
    }
  }

  toggleTable1Show() {
    if (this.toggleTable1 == 0) {
      this.toggleTable1 = 1;
    } else {
      this.toggleTable1 = 0;
    }
  }

  loadDataAll(OverallRegion, OverallProvince,typeCur2) {
    if (this.region != "00") {
      OverallRegion = localStorage.region_desc;
    } else {
      OverallRegion = OverallRegion;
    }
    if (this.branch != "00" || this.province != "00") {
      OverallProvince = this.select_province;
    } else {
      OverallProvince = OverallProvince;
    }

    if(typeCur2 == undefined){
      this.regionSelectType = "M";
    }else{
      this.regionSelectType =  typeCur2;
    }

    this.webapi.getData('IncDataMonth?offcode=' + this.offcode+'&province='+OverallProvince+'&region='+OverallRegion).then((data) => {
      this.responseData = data;
      this.getAmtProduct(this.regionSelectType)
      this.getNumProduct(this.regionSelectType);
      //this.selectionSumArea(OverallRegion, OverallProvince,typeCur2);
    });
  }

  ResponseMthFrom:any;
  ddlMonthFrom(){
    this.webapi.getData('dllMMonth').then((data) => {
     this.ResponseMthFrom = data;
    });
  }

  ResponseMthTo:any;
  ddlMonthTo(){
    this.webapi.getData('dllMMonth').then((data) => {
     this.ResponseMthTo = data;
   });
  }

  loadData(OverallRegion, OverallProvince,typeCur2) {
    if (this.region != "00") {
      OverallRegion = localStorage.region_desc;
    } else {
      OverallRegion = OverallRegion;
    }
    if (this.branch != "00" || this.province != "00") {
      OverallProvince = this.select_province;
    } else {
      OverallProvince = OverallProvince;
    }

    this.webapi.getData('IncDataMonth?offcode=' + this.offcode+'&province='+OverallProvince+'&region='+OverallRegion).then((data) => {
      this.responseData = data;
      this.getAmtProduct(typeCur2)
      this.getNumProduct(typeCur2);
     // this.selectionSumArea(typeCur2,OverallProvince,typeCur2);
    });
  }


  ///select all///
  responseOverallRegion:any;
  overallRegion(){
    this.webapi.getData('ddlMRegion?offcode=' + this.offcode).then((data) => {
      this.responseOverallRegion = data;
    });
  }

  ResponseOverAllProvince:any;
  overallProvince(){
    let Region
    if (this.region != "00") {
      Region = localStorage.region_desc;
    }
 
    this.webapi.getData('ddlMProvince?offcode=' + this.offcode + '&area='+Region).then((data) => {
      this.ResponseOverAllProvince = data;
    });
  }

  selectionArea() {
    this.webapi.getData('SelectionMthArea?offcode=' + this.offcode).then((data) => {
      this.responseArea = data;
    });
  }

  selectionProvinceFill(Region) {
    
    this.webapi.getData('ddlMProvince?offcode=' + this.offcode + '&area=' + Region).then((data) => {
      this.responseProvince = data;
    });
  }

  selectRegion(Region,Province,Mth_From,Mth_To,typeCur) {
    Province = 'undefined';
    this.Province = "undefined";
    this.webapi.getData('ddlMProvince?offcode=' + this.offcode + '&area=' + Region).then((data) => {
      this.responseProvince = data;
    });
    this.IncProductAll(Region,Province,Mth_From,Mth_To,typeCur);
  }

  selectionProvince(Region,Province,Mth_From,Mth_To,typeCur) {

    if (this.region != "00") {
      Region = localStorage.region_desc;
    }

    this.webapi.getData('SelectionMthProvince?offcode=' + this.offcode + '&region=' + Region).then((data) => {
      this.responseProvince = data;
    });
    this.IncProductAll(Region,Province,Mth_From,Mth_To,typeCur);
  }


  ChangeCur(Region,Province,Mth_From,Mth_To,typeCur) {
    this.IncProductAll(Region,Province,Mth_From,Mth_To,typeCur);
    this.loadData(Region, Province,typeCur);
  }

  selectionAllProvince() {
    let region;
    if (this.region != "00") {
      region = localStorage.region_desc;
    }
    //let  Region = 'undefined';
    this.webapi.getData('ddlMProvince?offcode=' + this.offcode + '&area=' + region).then((data) => {
      this.responseProvince = data;
    });
  }

  selectionSumArea(OverallRegion, OverallProvince,typeCur2) {
    this.webapi.getData('IncSumDataByMonth?offcode=' + this.offcode).then((data) => {
      this.responseSumArea = data;
      this.getSumNumProduct(typeCur2);
      this.getSumAmtAreaProduct(typeCur2);
    });
  }

  ///end select all///

  /// fillter ภาพรวม///
  OverallProvince:any;
  overAllSelectRegion(OverallRegion, OverallProvince, typeCur2){
    OverallProvince = 'undefined';
    this.OverallProvince = "undefined";

    if (this.region != "00") {
      OverallRegion = localStorage.region_desc;
    }
    this.overallSelectionProvince(OverallRegion, OverallProvince,typeCur2);
  }

  overallSelectionProvince(OverallRegion, OverallProvince, typeCur2){
    this.webapi.getData('ddlMProvince?offcode=' + this.offcode + '&area=' + OverallRegion).then((data) => {
      this.ResponseOverAllProvince = data;
    });
    this.loadData(OverallRegion, OverallProvince,typeCur2);
  }

  ///end fillter ภาพรวม///

  selectMonthFrom(Region,Province,Mth_From,Mth_To,typeCur){
    this.IncProductAll(Region,Province,Mth_From,Mth_To,typeCur);
  }

  selectMonthTo(Region,Province,Mth_From,Mth_To,typeCur){
    this.IncProductAll(Region,Province,Mth_From,Mth_To,typeCur);
  }

  regionSelectType = "";
  IncProductAll(Region,Province,Mth_From,Mth_To,typeCur) {
   /* if (Region !== this.oldArea || typeCur !== this.oldtypeCur) {
      this.Province = undefined;
      Province = undefined;
    }*/

    if (this.region != "00") {
      Region = localStorage.region_desc;
    } else {
      Region = Region;
    }
    if (this.branch != "00" || this.province != "00") {
      Province = this.select_province;
    } else {
      Province = Province;
    }

    if(typeCur == undefined){
      this.regionSelectType = "M";
    }else{
      this.regionSelectType =  typeCur;
    }
   
    this.webapi.getData('IncProductByMth?offcode=' + this.offcode + '&region=' + Region + '&province=' + Province + '&month_from=' + Mth_From +'&month_to='+Mth_To+ '&group_name=สุรา').then((data) => {
      this.repondProductSura = data;
      this.getCountAmtProdSura(this.regionSelectType );
    });
    this.webapi.getData('IncProductByMth?offcode=' + this.offcode + '&region=' + Region + '&province=' + Province + '&month_from=' + Mth_From +'&month_to='+Mth_To+ '&group_name=ยาสูบ').then((data) => {
      this.repondProductSica = data;
      this.getCountAmtSica(this.regionSelectType );
    });
    this.webapi.getData('IncProductByMth?offcode=' + this.offcode + '&region=' + Region + '&province=' + Province + '&month_from=' + Mth_From +'&month_to='+Mth_To+ '&group_name=ไพ่').then((data) => {
      this.repondProductCard = data;
      this.getCountAmtCard(this.regionSelectType );
    });
  
    if (typeCur == "M") {
      this.curTG = "ล้านบาท";
      this.unitTG2 = "ล้านใบ";
    }else if(typeCur == undefined ){
      this.curTG = "ล้านบาท";
      this.unitTG2 = "ล้านใบ";
    }  else {
      this.curTG = "บาท";
      this.unitTG2 = "ใบ";
    }

    this.oldArea = Region;
    this.oldtypeCur = typeCur;
    
    this.getDateTiTle(Mth_From,Mth_To);
  }

  getDateTiTle(monthFrom,monthTo){  
 
    let dateTitle;
    if(monthFrom != undefined  && monthTo != undefined){
      if( monthFrom != 'undefined'  && monthTo != 'undefined'){
      this.webapi.getData('DateTitle?startMonth='+(monthFrom == undefined  ? monthTo : monthFrom) +'&endMonth='+(monthTo == undefined ? monthFrom :monthTo)).then((data) => {
        this.responseDateTitle = data;       
        dateTitle= this.responseDateTitle[0].DATE_TITLE;
      //  console.log("dateTitle"+dateTitle);
        if (dateTitle == "0"){
          this.dateAsOff="โปรดตรวจสอบช่วงเดือนอีกครั้ง";
         }else{
    
          this.dateAsOff =dateTitle;
         }
       //  console.log("this.dateAsOff"+this.dateAsOff);
       }); 
      }else{   
        this.dateAsOff = 'ข้อมูล '+dateDisplayAll;
      }
    }else{
      this.dateAsOff = 'ข้อมูล '+dateDisplayAll;
    }    
  }

  getCountAmtProdSura(typeCur) {
    let amt;
    let count;
    for (var i = 0; i < this.repondProductSura.length; i++) {
      amt = this.repondProductSura[i].AMT;
      if (amt != null) { amt = changeCurrency(amt, typeCur); }
      this.repondProductSura[i].AMT = amt;

      count = this.repondProductSura[i].COUNT;
      if (count != null) { count = changeCurrencyNoUnit(count, typeCur); }
      this.repondProductSura[i].COUNT = count;
    }
  }

  getCountAmtSica(typeCur) {
    let amt;
    let count;
    for (var i = 0; i < this.repondProductSica.length; i++) {
      amt = this.repondProductSica[i].AMT;
      if (amt != null) { amt = changeCurrency(amt, typeCur); }
      this.repondProductSica[i].AMT = amt;

      count = this.repondProductSica[i].COUNT;
      if (count != null) { count = changeCurrencyNoUnit(count, typeCur); }
      this.repondProductSica[i].COUNT = count;
    }
  }

  getCountAmtCard(typeCur) {
    let amt;
    let count;
    for (var i = 0; i < this.repondProductCard.length; i++) {
      amt = this.repondProductCard[i].AMT;
      if (amt != null) { amt = changeCurrency(amt, typeCur); }
      this.repondProductCard[i].AMT = amt;

      count = this.repondProductCard[i].COUNT;
      if (count != null) { count = changeCurrencyNoUnit(count, typeCur); }
      this.repondProductCard[i].COUNT = count;
    }
  }

  getNumProduct(typeCur2) {
    let sura;
    let top;
    let card;
    for (var i = 0; i < this.responseData.length; i++) {
      sura = this.responseData[i].NUM_OF_LIC_SURA;
      if (sura != null) { sura = changeCurrencyNoUnit(sura, typeCur2); }
      this.responseData[i].NUM_OF_LIC_SURA = sura;

      top = this.responseData[i].NUM_OF_LIC_TOBBACO;
      if (top != null) { top = changeCurrencyNoUnit(top, typeCur2); }
      this.responseData[i].NUM_OF_LIC_TOBBACO = top;

      card = this.responseData[i].NUM_OF_LIC_CARD;
      if (card != null) { card = changeCurrencyNoUnit(card, typeCur2); }
      this.responseData[i].NUM_OF_LIC_CARD = card;
    }
  }

  getAmtProduct(typeCur2) {
    let sura;
    let top;
    let card;
    for (var i = 0; i < this.responseData.length; i++) {
      sura = this.responseData[i].AMT_OF_LIC_SURA;
      if (sura != null) { sura = changeCurrency(sura, typeCur2); }
      this.responseData[i].AMT_OF_LIC_SURA = sura;

      top = this.responseData[i].AMT_OF_LIC_TOBBACO;
      if (top != null) { top = changeCurrency(top, typeCur2); }
      this.responseData[i].AMT_OF_LIC_TOBBACO = top;

      card = this.responseData[i].AMT_OF_LIC_CARD;
      if (card != null) { card = changeCurrency(card, typeCur2); }
      this.responseData[i].AMT_OF_LIC_CARD = card;
    }
  }


  ///get sum area///
  getSumNumProduct(typeCur2) {
    let sura;
    let top;
    let card;
    for (var i = 0; i < this.responseSumArea.length; i++) {
      sura = this.responseSumArea[i].NUM_OF_LIC_SURA;
      if (sura != null) { sura = changeCurrencyNoUnit(sura, typeCur2); }
      this.responseSumArea[i].NUM_OF_LIC_SURA = sura;

      top = this.responseSumArea[i].NUM_OF_LIC_TOBBACO;
      if (top != null) { top = changeCurrencyNoUnit(top, typeCur2); }
      this.responseSumArea[i].NUM_OF_LIC_TOBBACO = top;

      card = this.responseSumArea[i].NUM_OF_LIC_CARD;
      if (card != null) { card = changeCurrencyNoUnit(card, typeCur2); }
      this.responseSumArea[i].NUM_OF_LIC_CARD = card;
    }
  }

  getSumAmtAreaProduct(typeCur2) {
    let sura;
    let top;
    let card;
    let summary;
    for (var i = 0; i < this.responseSumArea.length; i++) {
      sura = this.responseSumArea[i].AMT_OF_LIC_SURA;
      if (sura != null) { sura = changeCurrency(sura, typeCur2); }
      this.responseSumArea[i].AMT_OF_LIC_SURA = sura;

      top = this.responseSumArea[i].AMT_OF_LIC_TOBBACO;
      if (top != null) { top = changeCurrency(top, typeCur2); }
      this.responseSumArea[i].AMT_OF_LIC_TOBBACO = top;

      card = this.responseSumArea[i].AMT_OF_LIC_CARD;
      if (card != null) { card = changeCurrency(card, typeCur2); }
      this.responseSumArea[i].AMT_OF_LIC_CARD = card;

    }

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
