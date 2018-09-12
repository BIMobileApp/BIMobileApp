import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

declare var dateDisplayAll:any;

@IonicPage()
@Component({
  selector: 'page-law-data-area',
  templateUrl: 'law-data-area.html',
})
export class LawDataAreaPage {

  responseData: any;
  responseArea: any;
  responseProvince: any;
  responseGroupName: any;
  repondProduct:any;
  offcode: any;
  username:any;

  dateDisplay:any;
  dateAsOff:any;
  str_offcode:any;
  str_head_offcode:any;

  repondProductSura:any;
  repondProductSica:any;
  repondProductCard:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public webapi: RestProvider) {
      this.offcode = localStorage.offcode;

      this.str_offcode = localStorage.offcode.toString().substring(0, 2);

      if( this.str_offcode == "00")
      {
        this.str_head_offcode = "ภาค";
      }else{
        this.str_head_offcode = "พื้นที่";
      }
      
      this.dateDisplay = localStorage.last_update_date;
      this.dateAsOff =  dateDisplayAll;
      this.username = localStorage.userData;
  }

  ionViewDidLoad() {
    this.getTableData();
    this.selectionAreaAll();
    this.selectionProvinceAll();
    this.getProductSuraAll();
    this.getProductSicaAll();
    this.getProductCardAll();
  }

   selectionAreaAll(){
    this.webapi.getData('ddlMRegion?offcode=' + this.offcode).then((data) => {
      this.responseArea = data;
    });
  }

  selectionProvinceAll(){
    this.webapi.getData('ddlMProvince?offcode=' + this.offcode + '&area=undefined').then((data) => {
      this.responseProvince = data;
    });
  }

  getitemsRegion(area,province){
    this.webapi.getData('ddlMRegion?offcode=' + this.offcode).then((data) => {
      this.responseArea = data;
    });
    this.getitemsProvince(area,province);
    this.getTableDataSura(area,province);

    
  }

  getitemsProvince(area,province){
    province = [];
    province = 'undefined';

    this.webapi.getData('ddlMProvince?offcode=' + this.offcode + '&area=' + area).then((data) => {
      this.responseProvince = data;
    });
    this.getTableDataSura(area,province);
    this.getTableDataSica(area,province);
    this.getTableDataCard(area,province);
  }

 getTableData() {
    this.webapi.getData('LawReportArea?offcode='+this.offcode).then((data) => {
        this.responseData = data;
       this.getTableLaw_qty();
        this.getTableTarget_qty();
        this.getTableLaw_amt();
        this.getTableTarget_amt();
        this.getTableTrea_money();
    });
}

///get product all//

///Sura
getProductSuraAll(){
  this.webapi.getData('LawProductAreaAll?offcode='+this.offcode+'&group_name=สุรา').then((data) => {
    this.repondProductSura = data;

    /*this.getlowqtySura();
    this.gettargetqtySura();
    this.getlowamtSura();
    this.gettargetamtSura();
    this.getmoneySura();*/
  });
}

//Sica
getProductSicaAll(){
  this.webapi.getData('LawProductAreaAll?offcode='+this.offcode+'&group_name=ยาสูบ').then((data) => {
    this.repondProductSica = data;

    /*this.getlowqtySura();
    this.gettargetqtySura();
    this.getlowamtSura();
    this.gettargetamtSura();
    this.getmoneySura();*/
  });
}

//Card
getProductCardAll(){
  this.webapi.getData('LawProductAreaAll?offcode='+this.offcode+'&group_name=ไพ่').then((data) => {
    this.repondProductCard = data;

    /*this.getlowqtySura();
    this.gettargetqtySura();
    this.getlowamtSura();
    this.gettargetamtSura();
    this.getmoneySura();*/
  });
}

///end get product all//

/// get product  fillter region and province//
getTableDataSura(area,province){
    this.webapi.getData('LawProductByArea?offcode='+this.offcode+'&region='+area+'&province='+province+'&group_desc=สุรา').then((data) => {
      this.repondProductSura = data;
    });
}

getTableDataSica(area,province){
  this.webapi.getData('LawProductByArea?offcode='+this.offcode+'&region='+area+'&province='+province+'&group_desc=ยาสูบ').then((data) => {
    this.repondProductSica = data;
  });
}

getTableDataCard(area,province){
  this.webapi.getData('LawProductByArea?offcode='+this.offcode+'&region='+area+'&province='+province+'&group_desc=ไพ่').then((data) => {
    this.repondProductCard = data;
  });
}

///end  get product  fillter region and province//

///conver number Sura///
/*getlowqtySura(){
  let val;
  for (var i = 0; i < this.repondProduct.length; i++) {
    val = this.repondProduct[i].LAW_QTY;
    //val = val.toFixed(2);
    val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    this.repondProduct[i].LAW_QTY = val;
  }
}

gettargetqtySura(){
  let val;
  for (var i = 0; i < this.repondProduct.length; i++) {
    val = this.repondProduct[i].TARGET_QTY;
    //val = val.toFixed(2);
    val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    this.repondProduct[i].TARGET_QTY = val;
  }
}

getlowamtSura(){
  let val;
  for (var i = 0; i < this.repondProduct.length; i++) {
    val = this.repondProduct[i].TARGET_AMT/1000000;
   // val = val.toFixed(2);
    val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    this.repondProduct[i].TARGET_AMT = val;
  }
}

gettargetamtSura(){
  let val;
  for (var i = 0; i < this.repondProduct.length; i++) {
    val = this.repondProduct[i].TARGET_AMT/1000000;
    //val = val.toFixed(2);
    val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    this.repondProduct[i].TARGET_AMT = val;
  }
}

getmoneySura(){
  let val;
  for (var i = 0; i < this.repondProduct.length; i++) {
    val = this.repondProduct[i].TREASURY_MONEY/1000000;
    val = val.toFixed(2);
    val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    this.repondProduct[i].TREASURY_MONEY = val;
  }
}*/

///end conver number Sura///

getTableLaw_qty() {
  let val;
  for (var i = 0; i < this.responseData.length; i++) {
    val = this.responseData[i].LAW_QTY
    val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    this.responseData[i].LAW_QTY = val;
  }
}

getTableTarget_qty() {
  let val;
  for (var i = 0; i < this.responseData.length; i++) {
    val = this.responseData[i].TARGET_QTY;
    val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    this.responseData[i].TARGET_QTY = val;
  }
}

getTableLaw_amt() {
  let val;
  for (var i = 0; i < this.responseData.length; i++) {
    val = this.responseData[i].LAW_AMT/1000000;
    val = val.toFixed(2);
    val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    this.responseData[i].LAW_AMT = val;
  }
}

getTableTarget_amt() {
  let val;
  for (var i = 0; i < this.responseData.length; i++) {
    val = this.responseData[i].TARGET_AMT/1000000;
    val = val.toFixed(2);
    val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    this.responseData[i].TARGET_AMT = val;
  }
}

getTableTrea_money() {
  let val;
  for (var i = 0; i < this.responseData.length; i++) {
    val = this.responseData[i].TREASURY_MONEY/1000000;
    val = val.toFixed(2);
    val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    this.responseData[i].TREASURY_MONEY = val;
  }
}

}
