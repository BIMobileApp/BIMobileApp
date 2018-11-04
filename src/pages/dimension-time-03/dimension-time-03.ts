import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

declare var changeCurrency: any;
declare var dateDisplayNow: any;
declare var dateDisplayAll: any;
declare var convertMthBudYear:any;
declare var monthNowNumber:any;
declare var dateDisplayMonthNow: any; 
/* start for pinch */
const MAX_SCALE = 11.1;
const MIN_SCALE = 0.9;
const BASE_SCALE = 1.3;
/* end  */
@IonicPage()
@Component({
  selector: 'page-dimension-time-03',
  templateUrl: 'dimension-time-03.html',
})
export class DimensionTime_03Page {
  responseRegion: any;
  ResponseProvince: any;
  respondData: any;

  offcode: any;
  offdesc: any;
  regiondesc: any;

  username: any;
  dateAsOff = "";
  dateAsOffMonthNow = "";
  dateDisplay = "";
  dateNow = "";
  unitType: any;
  Region: any;
  Province: any;
  time: any;

  region: any;
  province: any;
  branch: any;
  select_region: any;
  select_all_value: any;
  select_all_prov_value: any;
  select_province: any;
  isEnable: any;
  isEnableProv: any;
  oldRegion: any;
  oldtypeCur: any;

  mthNumber:any;
  eecMarkShow:any;
  /* start for pinch */
  public fontSize = `${BASE_SCALE}rem`;
  private scale = BASE_SCALE;
  private alreadyScaled = BASE_SCALE;
  public isScaling = false;
  /* end  */

  constructor(public navCtrl: NavController, public navParams: NavParams, public webapi: RestProvider) {
    this.offcode = localStorage.offcode;
    this.regiondesc = localStorage.region_shot;
    this.offdesc = localStorage.offdesc;
    this.username = localStorage.userData;
    this.dateAsOff = "ข้อมูล "+dateDisplayAll;
    this.dateAsOffMonthNow = "ข้อมูล "+ dateDisplayMonthNow;
    this.dateDisplay = localStorage.last_update_date;
    this.dateNow = dateDisplayNow;
    this.mthNumber = monthNowNumber; 

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

  select_mth_from = '';
  select_mth_to = '';
  ionViewDidLoad() {
    this.selectionAreaAll();
    this.selectionProvinceAll();
    this.ddlMonthFrom();
    this.ddlMonthTo();

    let Region = 'undefined';
    let Province = 'undefined';
    let typeCur = "M";
      let month_from = convertMthBudYear(this.mthNumber);
    
    
    let month_to = convertMthBudYear(this.mthNumber);

    this.select_mth_from = month_from;
    this.select_mth_to = month_to;

    this.getAllData(Region, Province, typeCur,month_from,month_to);
    //var d = new Date(); 
    // var n = d.getMonth();
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

  selectionAreaAll() {
    this.webapi.getData('ddlMRegion?offcode=' + this.offcode).then((data) => {
      this.responseRegion = data;
    });
  }

  selectionProvinceAll() {
    let region;
    if (this.region != "00") {
      region = localStorage.region_desc;
    }

    this.webapi.getData('ddlMProvince?offcode=' + this.offcode + '&area=' + region).then((data) => {
      this.ResponseProvince = data;
    });
  }

  selectRegion(Region, Province, typeCur,month_from,month_to) {
    Province = 'undefined';
    this.Province = 'undefined';
    //this.select_all_value = true;
    //this.select_all_prov_value = false;

    if (this.region != "00") {
      Region = localStorage.region_desc;
    }
    if(Region == "EEC"){
      this.eecMarkShow=1;
    }else{
      this.eecMarkShow=0;
    }
    this.selectionProvinceFill(Region);
    this.getAllData(Region, Province, typeCur,month_from,month_to);
  }

  selectionProvinceFill(Region) {

    this.webapi.getData('ddlMProvince?offcode=' + this.offcode + '&area=' + Region).then((data) => {
      this.ResponseProvince = data;
    });
  }

  selectionProvince(Region, Province, typeCur,month_from,month_to) {
    this.getData(Region, Province, typeCur,month_from,month_to);
  }

  selectMonthFrom(Region, Province, typeCur,month_from,month_to) {
    this.getData(Region, Province, typeCur,month_from,month_to);
  }

  selectMonthTo(Region, Province, typeCur,month_from,month_to){
    this.getData(Region, Province, typeCur,month_from,month_to);
  }

  regionSelectType = "";
  getAllData(Region, Province, typeCur,month_from,month_to) {
    if (this.region != "00") {
      Region = localStorage.region_desc;
    }

    if (this.branch != "00" || this.province != "00") {
      Province = this.select_province;
    }

    if(typeCur == undefined){
      this.regionSelectType = "M";
    }else{
      this.regionSelectType =  typeCur;
    }
    
    this.webapi.getData('DimansionTime03?offcode=' + this.offcode + '&region=' + Region + '&province=' + Province + '&month_from=' + month_from+'&month_to='+month_to).then((data) => {
      this.respondData = data;
      this.getTableTAX(this.regionSelectType);
    });
  }

  getData(Region, Province, typeCur,month_from,month_to) {
    if (this.region != "00") {
      Region = localStorage.region_desc;
    }

    if (this.branch != "00" || this.province != "00") {
      Province = this.select_province;
    }

    if(typeCur == undefined){
      this.regionSelectType = "M";
    }else{
      this.regionSelectType =  typeCur;
    }
    
    this.webapi.getData('DimansionTime03?offcode=' + this.offcode + '&region=' + Region + '&province=' + Province + '&month_from=' + month_from+'&month_to='+month_to).then((data) => {
      this.respondData = data;
      this.getTableTAX(this.regionSelectType);
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
          this.dateAsOffMonthNow="โปรดตรวจสอบช่วงเดือนอีกครั้ง";
         }else{
    
          this.dateAsOffMonthNow =dateTitle;
         }
       //  console.log("this.dateAsOff"+this.dateAsOff);
       }); 
      }else{   
        this.dateAsOffMonthNow = 'ข้อมูล '+dateDisplayMonthNow;
      }
    }else{
      this.dateAsOffMonthNow = 'ข้อมูล '+dateDisplayMonthNow;
    }    
  }

  getTableTAX(typeCur) {
    let income;
    let imports;
    let sumtax;

    for (var i = 0; i < this.respondData.length; i++) {
      income = this.respondData[i].IN_TAX_AMT;
      imports = this.respondData[i].IMPORT_TAX_AMT;
      sumtax = this.respondData[i].TAX;
      if (income != null) { income = changeCurrency(income, typeCur); }
      if (imports != null) { imports = changeCurrency(imports, typeCur); }
      if (sumtax != null) { sumtax = changeCurrency(sumtax, typeCur); }
      this.respondData[i].IN_TAX_AMT = income;
      this.respondData[i].IMPORT_TAX_AMT = imports;
      this.respondData[i].TAX = sumtax;
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
