import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

declare var dateDisplayAll:any;
declare var changeCurrency: any;

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

  region:any;
  province:any;
  branch:any;

  select_region:any;
  select_all_value:any;
  select_all_prov_value:any;
  select_province:any;
  isEnable:any;
  isEnableProv:any;
  oldRegion:any;
  oldtypeCur:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public webapi: RestProvider) {
      this.offcode = localStorage.offcode;            
      this.dateDisplay = localStorage.last_update_date;
      this.dateAsOff =  dateDisplayAll;
      this.username = localStorage.userData;

      ///หา offcode เพื่อหา ภาค จังหวัด สาขา
     this.region = localStorage.offcode.substring(0, 2);
     this.province = localStorage.offcode.substring(2, 4);
     this.branch =  localStorage.offcode.substring(4, 6);
   /// end  หา offcode เพื่อหา ภาค จังหวัด สาขา

    ///ตรวจสอบภาคเพื่อ default selection
    if(this.region != "00"){
      this.select_region = localStorage.region_desc;
      this.select_all_value = false;    
      this.isEnable  = true;        
    }else{
      this.select_all_value = true;
      this.isEnable  = false;
    }
  ///end ตรวจสอบภาคเพื่อ default selection

  /// ตรวจสอบสาขาเพื่อ default selection
  var res = "";
  if(this.branch != "00"){          
    res =  localStorage.offdesc.split(" ");
    this.select_province  = res[0];
    this.select_all_prov_value = false;
    this.isEnableProv = true;
  }else{
    this.select_all_prov_value = true;
    this.isEnableProv = false;
  }
  console.log(this.select_all_prov_value);
  ///end  ตรวจสอบสาขาเพื่อ default selection
  }

  ionViewDidLoad() {
    let typeCur = "B";
    let typeCurFirst ='B';

    this.getTableData(typeCurFirst);
    this.selectionAreaAll();
    this.selectionProvinceAll();

    let SRegion;
    let SProvince; 
    
    if(this.region != "00"){
      SRegion = localStorage.region_desc;
    }else{
      SRegion = 'undefined';
    }

    if(this.branch != "00"){
      SProvince = this.select_province;
    }else{
      SProvince = 'undefined';
    }

    this.getProductAll(SRegion,SProvince,typeCur);
  }

   selectionAreaAll(){
    this.webapi.getData('ddlMRegion?offcode='+this.offcode).then((data) => {
      this.responseArea = data;
    });
  }

  selectionProvinceAll(){

    let area;
    if(this.region != "00"){
      area = localStorage.region_desc;
    }

    this.webapi.getData('ddlMProvince?offcode='+this.offcode+'&area='+area).then((data) => {
      this.responseProvince = data;
    });
  }

  getitemsRegion(SRegion,SProvince,typeCur){

    SProvince =  'undefined';
    this.webapi.getData('ddlMRegion?offcode=' + this.offcode).then((data) => {
      this.responseArea = data;
    });

    this.getitemsProvince(SRegion,SProvince,typeCur);
  }

  getitemsProvince(SRegion,SProvince,typeCur){
    if(this.region != "00"){
      SRegion = localStorage.region_desc;
    }

    this.webapi.getData('ddlMProvince?offcode=' + this.offcode + '&area=' + SRegion).then((data) => {
      this.responseProvince = data; 
    });
    
    this.getProductAll(SRegion,SProvince,typeCur);
  }

  getProductAll(SRegion,SProvince,typeCur){
   
    if(this.region != "00"){
      SRegion = localStorage.region_desc;
    }else{
      SRegion = SRegion;
    }

    if(this.branch != "00"){
      SProvince = this.select_province;
    }else{
      SProvince = SProvince;
    }

    this.webapi.getData('LawProductArea?offcode='+this.offcode+'&region='+SRegion+'&province='+SProvince).then((data) => {
      this.repondProductSura = data;
      this.getTableTAX(typeCur);
    });
  }

  getProductUnit(SRegion,SProvince,typeCur){

    if(this.region != "00"){
      SRegion = localStorage.region_desc;
    }else{
      SRegion = SRegion;
    }

    if(this.branch != "00"){
      SProvince = this.select_province;
    }else{
      SProvince = SProvince;
    }

    this.webapi.getData('LawProductArea?offcode='+this.offcode+'&region='+SRegion+'&province='+SProvince).then((data) => {
      this.repondProductSura = data; 
      this.getTableTAX(typeCur);
    });
  }

  getTableTAX(typeCur){

    let law_tax;
    let tar_qty;
    let law_amt;
    let tar_amt;
    let money;

    for (var i = 0; i < this.repondProductSura.length; i++) {

        law_tax = this.repondProductSura[i].LAW_QTY;
        tar_qty = this.repondProductSura[i].LAW_AMT;
        law_amt = this.repondProductSura[i].TARGET_QTY;
        tar_amt = this.repondProductSura[i].TARGET_AMT;
        money = this.repondProductSura[i].TREASURY_MONEY;
    
       if (law_tax != null) { law_tax = changeCurrency(law_tax, typeCur); }
       if (tar_qty != null) { tar_qty = changeCurrency(tar_qty, typeCur); }
       if (law_amt != null) { law_amt = changeCurrency(law_amt, typeCur); }
       if (tar_amt != null) { tar_amt = changeCurrency(tar_amt, typeCur); }
       if (money != null) { money = changeCurrency(money, typeCur); }

      this.repondProductSura[i].LAW_QTY = law_tax;
      this.repondProductSura[i].LAW_AMT = tar_qty;
      this.repondProductSura[i].TARGET_QTY = law_amt;
      this.repondProductSura[i].TARGET_AMT = tar_amt;
      this.repondProductSura[i].TREASURY_MONEY = money;
    }
  }

  getTableData(typeCurFirst){
    this.webapi.getData('LawReportArea?offcode='+this.offcode).then((data) => {
      this.responseData = data; 
      this.getTaxData(typeCurFirst);
     });
  }

  getTaxData(typeCurFirst){
    let law_qty;
    let tar_qty;
    let tar_amt;
    let money;

    for (var i = 0; i < this.responseData.length; i++) {
      law_qty = this.responseData[i].LAW_QTY;
      tar_qty = this.responseData[i].LAW_AMT;
      tar_amt = this.responseData[i].TARGET_AMT;
      money = this.responseData[i].TREASURY_MONEY;

      if (law_qty != null) { law_qty = changeCurrency(law_qty, typeCurFirst); }
      if (tar_qty != null) { tar_qty = changeCurrency(tar_qty, typeCurFirst); }
      if (tar_amt != null) { tar_amt = changeCurrency(tar_amt, typeCurFirst); }
      if (money != null) { money = changeCurrency(money, typeCurFirst); }

      this.responseData[i].LAW_QTY = law_qty;
      this.responseData[i].LAW_AMT = tar_qty;
      this.responseData[i].TARGET_AMT = tar_amt;
      this.responseData[i].TREASURY_MONEY = money;

    }
  }

}
