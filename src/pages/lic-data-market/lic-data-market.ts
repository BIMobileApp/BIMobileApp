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
  selector: 'page-lic-data-market',
  templateUrl: 'lic-data-market.html',
})
export class LicDataMarketPage {

  responseData: any;
  responseSumData: any;
  offcode: any;
  dateDisplay: any;
  dateAsOff: any;
  username: any;
  oldArea: any;
  oldtypeCur: any;
  Province: any;
  mthNumber:any;
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
    this.dateAsOff = dateDisplayAll;
    this.username = localStorage.userData;
    this.mthNumber = monthNowNumber;
  }

  select_mth_from = '';
  select_mth_to = '';

  ionViewDidLoad() {
   
    this.ddlMonthFrom();
    this.ddlMonthTo();

    let typeCur = 'M';
    let month_from = convertMthBudYear(this.mthNumber);
    let month_to = convertMthBudYear(this.mthNumber);

    this.select_mth_from = month_from;
    this.select_mth_to = month_to;

   this.loadAllData(typeCur,month_from,month_to);
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

  loadAllData(typeCur,month_from,month_to){
    this.webapi.getData('IncDataMarketList?offcode=' + this.offcode+'&month_from='+month_from+'&month_to='+month_to).then((data) => {
      this.responseData = data;
      this.getDataAmt(typeCur);
      this.SumData(typeCur,month_from,month_to);
    });
  }

  SumData(typeCur,month_from,month_to) {
    this.webapi.getData('IncSumDataMarketList?offcode=' + this.offcode+'&month_from='+month_from+'&month_to='+month_to).then((data) => {
      this.responseSumData = data;
      this.getSumDataAmt(typeCur);
    });
  }

  SelectMonthFrom(typeCur,month_from,month_to){
    //this. loadData(typeCur,month_from,month_to);
  }

  SelectMonthTo(typeCur,month_from,month_to){
    this. loadData(typeCur,month_from,month_to);
  }

  loadData(typeCur,month_from,month_to){
    this.webapi.getData('IncDataMarketList?offcode=' + this.offcode+'&month_from='+month_from+'&month_to='+month_to).then((data) => {
      this.responseData = data;
      this.getDataAmt(typeCur);
      this.SumData(typeCur,month_from,month_to);
    });

    this.getDateTiTle(month_from,month_to);
  }

  responseDateTitle:any;
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

  /*ChangeCurrency(typeCur) {
    this.webapi.getData('IncDataMarketList?offcode=' + this.offcode).then((data) => {
      this.responseData = data;
      this.getDataAmt(typeCur);
      this.SumData(typeCur);
    });
  }*/

  getDataAmt(typeCur) {
    let sura;
    let top;
    let card;
    let total;
    let reg;
    for (var i = 0; i < this.responseData.length; i++) {
      sura = this.responseData[i].NUM_OF_LIC_SURA;
      if (sura != null) { sura = changeCurrency(sura, typeCur); }
      this.responseData[i].NUM_OF_LIC_SURA = sura;

      top = this.responseData[i].NUM_OF_LIC_TOBBACO;
      if (top != null) { top = changeCurrency(top, typeCur); }
      this.responseData[i].NUM_OF_LIC_TOBBACO = top;

      card = this.responseData[i].NUM_OF_LIC_CARD;
      if (card != null) { card = changeCurrency(card, typeCur); }
      this.responseData[i].NUM_OF_LIC_CARD = card;

      total = this.responseData[i].TOTAL_LIC;
      if (total != null) { total = changeCurrency(total, typeCur); }
      this.responseData[i].TOTAL_LIC = total;

      reg = this.responseData[i].COUNT_REG;
      if (reg != null) { reg = changeCurrencyNoUnit(reg, typeCur); }
      this.responseData[i].COUNT_REG = reg;
    }
  }

  //sum
  getSumDataAmt(typeCur) {
    let sura;
    let top;
    let card;
    let total;
    let reg;
    for (var i = 0; i < this.responseSumData.length; i++) {
      sura = this.responseSumData[i].NUM_OF_LIC_SURA;
      if (sura != null) { sura = changeCurrency(sura, typeCur); }
      this.responseSumData[i].NUM_OF_LIC_SURA = sura;

      top = this.responseSumData[i].NUM_OF_LIC_TOBBACO;
      if (top != null) { top = changeCurrency(top, typeCur); }
      this.responseSumData[i].NUM_OF_LIC_TOBBACO = top;

      card = this.responseSumData[i].NUM_OF_LIC_CARD;
      if (card != null) { card = changeCurrency(card, typeCur); }
      this.responseSumData[i].NUM_OF_LIC_CARD = card;

      total = this.responseSumData[i].TOTAL_LIC;
      if (total != null) { total = changeCurrency(total, typeCur); }
      this.responseSumData[i].TOTAL_LIC = total;

      reg = this.responseSumData[i].COUNT_REG;
      if (reg != null) { reg = changeCurrencyNoUnit(reg, typeCur); }
      this.responseSumData[i].COUNT_REG = reg;
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
