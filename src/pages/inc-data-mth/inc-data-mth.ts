import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
declare var changeCurrency: any;
declare var dateDisplayAll: any;

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
  disoffcode: any;

  stroffcode: any;
  Province: any;
  branch: any;

  defaultSelectQuestion: any;
  defaultSelectProvinceSura: any;
  questionArray: any;
  username: any;

  oldArea: any;
  oldtypeCur: any;
  curTG = "บาท";
  unitTG2 = "ใบ";
  toggleTable2 = 0;
  toggleTable1 = 0;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public webapi: RestProvider) {
    this.offcode = localStorage.offcode;

    // this.province = this.offcode.substring(0, 2);
    // this.branch = this.offcode.substring(4, 2);

    //this.disoffcode = this.stroffcode;

    this.dateDisplay = localStorage.last_update_date;
    this.dateAsOff = dateDisplayAll;
    this.username = localStorage.userData;
  }


  ionViewDidLoad() {
    let typeCur = 'B';
    let typeCur2 = 'B';
    this.loadData(typeCur2);
    let Region = 'undefined';
    let Province = 'undefined';
    let Month = 'undefined';
    this.IncProductAll(Region, Province, Month, typeCur);
    this.selectionArea();
    this.selectionAllProvince();
  }
  toggleTable2Show(){
    if (this.toggleTable2 == 0) {
      this.toggleTable2 = 1;
    } else {
      this.toggleTable2 = 0;
    }
  }

  toggleTable1Show(){
    if (this.toggleTable1 == 0) {
      this.toggleTable1 = 1;
    } else {
      this.toggleTable1 = 0;
    }
  }
  loadData(typeCur2) {
    this.webapi.getData('IncDataMonth?offcode=' + this.offcode).then((data) => {
      this.responseData = data;
      this.getAmtProduct(typeCur2)
      this.getNumProduct(typeCur2);
      this.selectionSumArea(typeCur2);
    });
  }

  ///select all///
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

  selectRegion(Region, Province, Month, typeCur) {
    Province =  'undefined';
    this.webapi.getData('ddlMProvince?offcode=' + this.offcode + '&area=' + Region).then((data) => {
      this.responseProvince = data;
    });
    this.IncProductAll(Region, Province, Month, typeCur);
  }

  selectionProvince(Region, Province, Month, typeCur) {
    this.webapi.getData('SelectionMthProvince?offcode=' + this.offcode + '&region=' + Region).then((data) => {
      this.responseProvince = data;
    });
    this.IncProductAll(Region, Province, Month, typeCur);
  }

  
  ChangeCur(Region,Province,Month,typeCur) {
    this.IncProductAll(Region,Province,Month,typeCur);
    this.loadData(typeCur);
  }

  selectionAllProvince() {
    this.webapi.getData('SelectionAllProvince?offcode=' + this.offcode).then((data) => {
      this.responseProvince = data;
    });
  }

  selectionSumArea(typeCur2) {
    this.webapi.getData('IncSumDataByMonth?offcode=' + this.offcode).then((data) => {
      this.responseSumArea = data;
      this.getSumNumProduct(typeCur2);
      this.getSumAmtAreaProduct(typeCur2);
    });
  }

  ///end select all///

  IncProductAll(Region, Province, Month, typeCur) {
    if (Region !== this.oldArea || typeCur !== this.oldtypeCur) {
      this.Province = undefined;
      Province = undefined;
    }
    this.webapi.getData('IncProductByMth?offcode=' + this.offcode + '&region=' + Region + '&province=' + Province + '&month=' + Month + '&group_name=สุรา').then((data) => {
      this.repondProductSura = data;
      this.getCountAmtProdSura(typeCur);
    });
    this.webapi.getData('IncProductByMth?offcode=' + this.offcode + '&region=' + Region + '&province=' + Province + '&month=' + Month + '&group_name=ยาสูบ').then((data) => {
      this.repondProductSica = data;
      this.getCountAmtSica(typeCur);
    });
    this.webapi.getData('IncProductByMth?offcode=' + this.offcode + '&region=' + Region + '&province=' + Province + '&month=' + Month + '&group_name=ไพ่').then((data) => {
      this.repondProductCard = data;
      this.getCountAmtCard(typeCur);
    });
    this.oldArea = Region;
    this.oldtypeCur = typeCur;
    if(typeCur == "M"){
      this.curTG = "ล้านบาท";
      this.unitTG2 = "ล้านใบ";
    }else{
      this.curTG = "บาท";
      this.unitTG2 = "ใบ";
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
      if (count != null) { count = changeCurrency(count, typeCur); }
      this.repondProductSura[i].COUNT = count;
    }
  }

  getCountAmtSica(typeCur){
    let amt;
    let count;
    for (var i = 0; i < this.repondProductSica.length; i++) {
      amt = this.repondProductSica[i].AMT;
      if (amt != null) { amt = changeCurrency(amt, typeCur); }
      this.repondProductSica[i].AMT = amt;

      count = this.repondProductSica[i].COUNT;
      if (count != null) { count = changeCurrency(count, typeCur); }
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
      if (count != null) { count = changeCurrency(count, typeCur); }
      this.repondProductCard[i].COUNT = count;
    }
  }

  getNumProduct(typeCur2) {
    let sura;
    let top;
    let card;
    for (var i = 0; i < this.responseData.length; i++) {
      sura = this.responseData[i].NUM_OF_LIC_SURA;
      if (sura != null) { sura = changeCurrency(sura, typeCur2); }
      this.responseData[i].NUM_OF_LIC_SURA = sura;

      top = this.responseData[i].NUM_OF_LIC_TOBBACO;
      if (top != null) { top = changeCurrency(top, typeCur2); }
      this.responseData[i].NUM_OF_LIC_TOBBACO = top;

      card = this.responseData[i].NUM_OF_LIC_CARD;
      if (card != null) { card = changeCurrency(card, typeCur2); }
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
      if (sura != null) { sura = changeCurrency(sura, typeCur2); }
      this.responseSumArea[i].NUM_OF_LIC_SURA = sura;

      top = this.responseSumArea[i].NUM_OF_LIC_TOBBACO;
      if (top != null) { top = changeCurrency(top, typeCur2); }
      this.responseSumArea[i].NUM_OF_LIC_TOBBACO = top;

      card = this.responseSumArea[i].NUM_OF_LIC_CARD;
      if (card != null) { card = changeCurrency(card, typeCur2); }
      this.responseSumArea[i].NUM_OF_LIC_CARD = card;
    }
  }

  getSumAmtAreaProduct(typeCur2) {
    let sura;
    let top;
    let card;
    for (var i = 0; i < this.responseSumArea.length; i++) {
      sura = this.responseSumArea[i].AMT_OF_LIC_SURA;
      if (sura != null) { sura = changeCurrency(sura, typeCur2); }
      this.responseSumArea[i].AMT_OF_LIC_SURA = sura;

      top = this.responseSumArea[i].AMT_OF_LIC_TOBBACO;
      if (top != null) { top = changeCurrency(top, typeCur2); }
      this.responseSumArea[i].AMT_OF_LIC_TOBBACO = top;

      card = this.responseSumArea[i].AMT_OF_LIC_CARD;
      if (card != null) { sura = changeCurrency(card, typeCur2); }
      this.responseSumArea[i].AMT_OF_LIC_CARD = card;

    }

  }


}
