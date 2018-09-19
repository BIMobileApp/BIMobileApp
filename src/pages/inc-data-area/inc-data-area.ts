import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
declare var changeCurrency: any;
declare var dateDisplayAll:any;

@IonicPage()
@Component({
  selector: 'page-inc-data-area',
  templateUrl: 'inc-data-area.html',
})
export class IncDataAreaPage {

  offcode: any;
  dateDisplay:any;
  dateAsOff:any;
  responseData: any;
  responseArea: any;
  Area: any;
  SuraResponseProvince: any;
  CardResponseProvince: any;
  TobResponseProvince: any;
  responseGroupName: any;
  SuraRepondProduct:any;
  CardRepondProduct:any;
  TOBBACORepondProduct:any;
  repondProduct:any;
  defaultSelectProvince:any;

  Province:any;
  defaultSelectQuestion:any;
  questionArray:any;
  username:any;
  respondProduct:any;
  defaultSelectProduct:any;

  str_offcode:any;
  str_head_offcode:any;

  repondProductSura:any;
  repondProductSica:any;
  repondProductCard:any;
  responseProvince:any;

  oldArea: any;
  oldtypeCur : any; 
  toggleTable2 = 0;
  toggleTable1 = 0;
  curTG2 = "บาท";
  unitTG2 = "ใบ";

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public webapi:RestProvider) {
      this.offcode = localStorage.offcode;
      this.str_offcode = localStorage.offcode.toString().substring(0, 2);

      if( this.str_offcode == "00")
      {
        this.str_head_offcode = "ภาค";
      }else{
        this.str_head_offcode = "พื้นที่";
      }

      /*if( this.province == "00"){
        this.defaultSelectQuestion = -1; 
      }else{
        this.defaultSelectQuestion = 0;
      }*/

      this.dateDisplay = localStorage.last_update_date;
      this.dateAsOff =  dateDisplayAll;
      this.username = localStorage.userData;
  }

  ionViewDidLoad() {
    let typeCur = 'B';
    let typeCur2 = 'B';
    this.loadData(typeCur2);
    this.selectionArea();
    this.selectionGeoupName();
    this.selectionProvinceAll();

    this.ProductAll(typeCur);
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

  selectionArea(){
    this.webapi.getData('SelectionArea?offcode='+this.offcode).then((data) => {
      this.responseArea = data;     
    });   
  }

  selectionProvinceAll(){
    this.webapi.getData('ddlMProvince?offcode=' + this.offcode + '&area=undefined').then((data) => {
      this.responseProvince = data;
    });
  }

 SuraSelectionProvince(){
    this.webapi.getData('SelectionProvince?offcode='+this.offcode+'&area='+this.Area).then((data) => {
      this.responseProvince = data;
    });
  }

  selectionGeoupName(){
    this.webapi.getData('SelectionGroupName?offcode='+this.offcode).then((data) => {
      this.responseGroupName = data;
    });
  }
  //---------------------------------------------------------SURA------------------------------------------------------------//
  Getitems(Area,Province,Month, typeCur){
    
    this.GetitembyProvince(Area,Province,Month,typeCur);
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

  GetitembyProvince(Area,Province,Month,typeCur){
    this.webapi.getData('ddlMProvince?offcode=' + this.offcode + '&area=' + Area).then((data) => {
      this.responseProvince = data;
    });

    this.getProduct(Area,Province,Month,typeCur);
  }

  GetitemsMonth(Area,Province,Month,typeCur){

    this.GetitembyProvince(Area,Province,Month,typeCur);
    this.getProduct(Area,Province,Month,typeCur);
  }

  getProduct(Area,Province,Month,typeCur){
   
    if (Area !== this.oldArea || typeCur !== this.oldtypeCur) {
      Province = undefined;
    }
    this.webapi.getData('IncProductByArea?offcode='+this.offcode+'&region='+Area+"&province="+Province+"&group_desc=สุรา&month="+Month).then((data) => {
      this.repondProductSura = data;
      this.getSuraAmt(typeCur);
    });

    this.webapi.getData('IncProductByArea?offcode='+this.offcode+'&region='+Area+"&province="+Province+"&group_desc=ยาสูบ&month="+Month).then((data) => {
      this.repondProductSica = data;
      this.getSicaAmt(typeCur);
    });

    this.webapi.getData('IncProductByArea?offcode='+this.offcode+'&region='+Area+"&province="+Province+"&group_desc=ไพ่&month="+Month).then((data) => {
      this.repondProductCard = data;
      this.getCardAmt(typeCur);
    });
    this.oldArea = Area;
    this.oldtypeCur = typeCur;
    if(typeCur == "M"){
      this.curTG2 = "ล้านบาท";
      this.unitTG2 = "ล้านใบ";
    }else{
      this.curTG2 = "บาท";
      this.unitTG2 = "ใบ";
    }

  }

 /*  selectionProvinceChange(area){
    this.webapi.getData('SelectionProvinceChange?offcode='+this.offcode+'&region'+area).then((data) => {
      this.responseProvince = data;
    });
  } */

///get all product///
   ProductAll(typeCur){
    this.webapi.getData('IncProductByAreaAll?offcode='+this.offcode+'&group_name=สุรา').then((data) => {
      this.repondProductSura = data;
      this.getSuraAmt(typeCur);
    });

    this.webapi.getData('IncProductByAreaAll?offcode='+this.offcode+'&group_name=ยาสูบ').then((data) => {
      this.repondProductSica = data;
      this.getSicaAmt(typeCur);
    });

    this.webapi.getData('IncProductByAreaAll?offcode='+this.offcode+'&group_name=ไพ่').then((data) => {
      this.repondProductCard = data;
      this.getCardAmt(typeCur);
    });
  }


  ///end get all product///

  getSuraAmt(typeCur){
    let AMT;
    let COUNT;
    for (var i = 0; i < this.repondProductSura.length; i++) {
      AMT = this.repondProductSura[i].AMT;
      if (AMT != null) { AMT = changeCurrency(AMT, typeCur); }
      this.repondProductSura[i].AMT = AMT;

      COUNT = this.repondProductSura[i].COUNT;
      if (COUNT != null) { COUNT = changeCurrency(COUNT, typeCur); }
      this.repondProductSura[i].COUNT = COUNT;
    }
  }


  getCardAmt(typeCur){
    let AMT;
    let COUNT;
    for (var i = 0; i < this.repondProductCard.length; i++) {
      AMT = this.repondProductCard[i].AMT;
      if (AMT != null) { AMT = changeCurrency(AMT, typeCur); }
      this.repondProductCard[i].AMT = AMT;

      COUNT = this.repondProductCard[i].COUNT;
      if (COUNT != null) { COUNT = changeCurrency(COUNT, typeCur); }
      this.repondProductCard[i].COUNT = COUNT;
    }
  }

  getSicaAmt(typeCur){
    let AMT;
    let COUNT;
    for (var i = 0; i < this.repondProductSica.length; i++) {
      AMT = this.repondProductSica[i].AMT;
      if (AMT != null) { AMT = changeCurrency(AMT, typeCur); }
      this.repondProductSica[i].AMT = AMT;

      COUNT = this.repondProductSica[i].COUNT;
      if (COUNT != null) { COUNT = changeCurrency(COUNT, typeCur); }
      this.repondProductSica[i].COUNT = COUNT;
    }
  }

  loadData(typeCur2){
    this.webapi.getData('IncArea?offcode='+this.offcode).then((data)=>{
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

  getProductNum(typeCur2){
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

}
