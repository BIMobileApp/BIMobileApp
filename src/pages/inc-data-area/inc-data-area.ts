import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
declare var changeCurrency: any;
declare var dateDisplayAll: any;
declare var changeCurrencyNoUnit:any;
/* start for pinch */
const MAX_SCALE = 11.1;
const MIN_SCALE = 0.9;
const BASE_SCALE = 1.3;
/* end  */
@IonicPage()
@Component({
  selector: 'page-inc-data-area',
  templateUrl: 'inc-data-area.html',
})
export class IncDataAreaPage {

  offcode: any;
  dateDisplay: any;
  dateAsOff: any;
  responseData: any;
  responseArea: any;
  Area: any;
  SuraResponseProvince: any;
  CardResponseProvince: any;
  TobResponseProvince: any;
  responseGroupName: any;
  SuraRepondProduct: any;
  CardRepondProduct: any;
  TOBBACORepondProduct: any;
  repondProduct: any;
  defaultSelectProvince: any;

  Province: any;
  defaultSelectQuestion: any;
  questionArray: any;
  username: any;
  respondProduct: any;
  defaultSelectProduct: any;

  str_offcode: any;
  str_head_offcode = "หน่วยงาน";

  repondProductSura: any;
  repondProductSica: any;
  repondProductCard: any;
  responseProvince: any;

  region: any;
  province: any;
  branch: any;

  select_region: any;
  select_all_value: any;
  select_all_prov_value: any;
  select_province: any;
  isEnable: any;
  isEnableProv: any;

  oldArea: any;
  oldtypeCur: any;
  toggleTable2 = 0;
  toggleTable1 = 0;
  curTG2 = "ล้านบาท";
  unitTG2 = "ล้านใบ";
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

  ionViewDidLoad() {
    let typeCur = 'M';
    let typeCur2 = 'M';
    this.loadData(typeCur2);
    this.selectionArea();
    this.selectionGeoupName();
    this.selectionProvinceAll();

    this.ProductAll(typeCur);
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

  selectionArea() {
    this.webapi.getData('SelectionArea?offcode=' + this.offcode).then((data) => {
      this.responseArea = data;
    });
  }

  selectionProvinceAll() {
    let region;
    if (this.region != "00") {
      region = localStorage.region_desc;
    }

    this.webapi.getData('ddlMProvince?offcode=' + this.offcode + '&area='+region).then((data) => {
      this.responseProvince = data;
    });
  }

  SuraSelectionProvince() {
    this.webapi.getData('SelectionProvince?offcode=' + this.offcode + '&area=' + this.Area).then((data) => {
      this.responseProvince = data;
    });
  }

  selectionGeoupName() {
    this.webapi.getData('SelectionGroupName?offcode=' + this.offcode).then((data) => {
      this.responseGroupName = data;
    });
  }
  //---------------------------------------------------------SURA------------------------------------------------------------//
  Getitems(Area, Province, Month, typeCur) {
    Province = 'undefined';
    this.Province = "undefined";
    if (this.region != "00") {
      Area = localStorage.region_desc;
    } else {
      Area = Area;
    }
    if (this.branch != "00" || this.province != "00") {
      Province = this.select_province;
    } else {
      Province = Province;
    }
    this.GetitembyProvince(Area, Province, Month, typeCur);
    /* var sura = "สุรา";
     var old_area = Area;
     //this.selectionProvinceChange(area);
     //this.selectionGeoupName();
     if(Area != 'undefined' || Area != old_area){
       this.Area = Area
       this.SuraSelectionProvince();
       Province = 'undefined';
     }*/
  }

  GetitembyProvince(Area, Province, Month, typeCur) {

    if (this.region != "00") {
      Area = localStorage.region_desc;
    }
    this.webapi.getData('ddlMProvince?offcode=' + this.offcode + '&area=' + Area).then((data) => {
      this.responseProvince = data;
    });

    this.getProduct(Area, Province, Month, typeCur);
  }

  GetitemsMonth(Area, Province, Month, typeCur) {

    if (this.region != "00") {
      Area = localStorage.region_desc;
    } else {
      Area = Area;
    }
    if (this.branch != "00" || this.province != "00") {
      Province = this.select_province;
    } else {
      Province = Province;
    }
    this.GetitembyProvince(Area, Province, Month, typeCur);
    this.getProduct(Area, Province, Month, typeCur);
  }

  regionSelectType = "";
  getProduct(Area, Province, Month, typeCur) {

    /*if (Area !== this.oldArea || typeCur !== this.oldtypeCur) {
      Province = undefined;
    }*/

    if (this.region != "00") {
      Area = localStorage.region_desc;
    } else {
      Area = Area;
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

    this.webapi.getData('IncProductByArea?offcode=' + this.offcode + '&region=' + Area + "&province=" + Province + "&group_desc=สุรา&month=" + Month).then((data) => {
      this.repondProductSura = data;
      this.getSuraAmt(this.regionSelectType);
    });

    this.webapi.getData('IncProductByArea?offcode=' + this.offcode + '&region=' + Area + "&province=" + Province + "&group_desc=ยาสูบ&month=" + Month).then((data) => {
      this.repondProductSica = data;
      this.getSicaAmt(this.regionSelectType);
    });

    this.webapi.getData('IncProductByArea?offcode=' + this.offcode + '&region=' + Area + "&province=" + Province + "&group_desc=ไพ่&month=" + Month).then((data) => {
      this.repondProductCard = data;
      this.getCardAmt(this.regionSelectType);
    });
  
    if (typeCur == "M") {
      this.curTG2 = "ล้านบาท";
      this.unitTG2 = "ล้านใบ";
    }else if(typeCur == undefined ){
      this.curTG2 = "ล้านบาท";
      this.unitTG2 = "ล้านใบ";
    } else {
      this.curTG2 = "บาท";
      this.unitTG2 = "ใบ";
    }

    this.oldArea = Area;
    this.oldtypeCur = typeCur;

  }

  /*  selectionProvinceChange(area){
     this.webapi.getData('SelectionProvinceChange?offcode='+this.offcode+'&region'+area).then((data) => {
       this.responseProvince = data;
     });
   } */

  ///get all product///
  ProductAll(typeCur) {
    this.webapi.getData('IncProductByAreaAll?offcode=' + this.offcode + '&group_name=สุรา').then((data) => {
      this.repondProductSura = data;
      this.getSuraAmt(typeCur);
    });

    this.webapi.getData('IncProductByAreaAll?offcode=' + this.offcode + '&group_name=ยาสูบ').then((data) => {
      this.repondProductSica = data;
      this.getSicaAmt(typeCur);
    });

    this.webapi.getData('IncProductByAreaAll?offcode=' + this.offcode + '&group_name=ไพ่').then((data) => {
      this.repondProductCard = data;
      this.getCardAmt(typeCur);
    });
  }


  ///end get all product///

  getSuraAmt(typeCur) {
    let AMT;
    let COUNT;
    for (var i = 0; i < this.repondProductSura.length; i++) {
      AMT = this.repondProductSura[i].AMT;
      if (AMT != null) { AMT = changeCurrency(AMT, typeCur); }
      this.repondProductSura[i].AMT = AMT;

      COUNT = this.repondProductSura[i].COUNT;
      if (COUNT != null) { COUNT = changeCurrencyNoUnit(COUNT, typeCur); }
      this.repondProductSura[i].COUNT = COUNT;
    }
  }


  getCardAmt(typeCur) {
    let AMT;
    let COUNT;
    for (var i = 0; i < this.repondProductCard.length; i++) {
      AMT = this.repondProductCard[i].AMT;
      if (AMT != null) { AMT = changeCurrency(AMT, typeCur); }
      this.repondProductCard[i].AMT = AMT;

      COUNT = this.repondProductCard[i].COUNT;
      if (COUNT != null) { COUNT = changeCurrencyNoUnit(COUNT, typeCur); }
      this.repondProductCard[i].COUNT = COUNT;
    }
  }

  getSicaAmt(typeCur) {
    let AMT;
    let COUNT;
    for (var i = 0; i < this.repondProductSica.length; i++) {
      AMT = this.repondProductSica[i].AMT;
      if (AMT != null) { AMT = changeCurrency(AMT, typeCur); }
      this.repondProductSica[i].AMT = AMT;

      COUNT = this.repondProductSica[i].COUNT;
      if (COUNT != null) { COUNT = changeCurrencyNoUnit(COUNT, typeCur); }
      this.repondProductSica[i].COUNT = COUNT;
    }
  }

  loadData(typeCur2) {
    this.webapi.getData('IncArea?offcode=' + this.offcode).then((data) => {
      this.responseData = data;
      this.getProductAmt(typeCur2);
      this.getProductNum(typeCur2);
    });
  }

  getProductAmt(typeCur2) {

    let suraAmt;
    let topAmt;
    let cardAmt;
    for (var i = 0; i < this.responseData.length; i++) {

      suraAmt = this.responseData[i].AMT_OF_LIC_SURA;
      if (suraAmt != null) { suraAmt = changeCurrency(suraAmt, typeCur2); }
      this.responseData[i].AMT_OF_LIC_SURA = suraAmt;

      topAmt = this.responseData[i].AMT_OF_LIC_TOBBACO;
      if (topAmt != null) { topAmt = changeCurrency(topAmt, typeCur2); }
      this.responseData[i].AMT_OF_LIC_TOBBACO = topAmt;

      cardAmt = this.responseData[i].AMT_OF_LIC_CARD;
      if (cardAmt != null) { cardAmt = changeCurrency(cardAmt, typeCur2); }
      this.responseData[i].AMT_OF_LIC_CARD = cardAmt;
    }
  }

  getProductNum(typeCur2) {
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
