import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

declare var dateDisplayAll: any;
declare var changeCurrency: any;
declare var fillterMonthCd:any;
declare var convertMthBudYear:any;
declare var monthNowNumber:any;
/* start for pinch */
const MAX_SCALE = 11.1;
const MIN_SCALE = 0.9;
const BASE_SCALE = 1.3;
/* end  */
@IonicPage()
@Component({
  selector: 'page-tax-budget-reg',
  templateUrl: 'tax-budget-reg.html',
})
export class TaxBudgetRegPage {

  responseData: any;
  summaryDate: any;
  responseRegion: any;
  ResponseProvince: any;
  mthNumber:any;
  offcode: any;
  year: any;
  month_to:any;
  grp_id: any;
  dateAsOff = "";
  dateDisplay = "";
  str_product:any;
  Province: any;
  region: any;
  province: any;
  branch: any;
  responseDateTitle:any;
  select_region: any;
  select_all_value: any;
  select_all_prov_value: any;
  select_province: any;
  isEnable: any;
  isEnableProv: any;
  oldRegion: any;
  oldtypeCur: any;
  username: any;
  name: any;
  eecMarkShow:any;
  /* start for pinch */
  public fontSize = `${BASE_SCALE}rem`;
  private scale = BASE_SCALE;
  private alreadyScaled = BASE_SCALE;
  public isScaling = false;

  /* end  */
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public webapi: RestProvider) {

    this.username = localStorage.userData;
    this.name = localStorage.username;
    this.grp_id = this.navParams.get('group_id');
    this.str_product = this.grp_id;
    this.offcode = localStorage.offcode;
   // this.dateAsOff = dateDisplayAll;
   this.dateAsOff = 'ข้อมูล '+dateDisplayAll;
    this.dateDisplay = localStorage.last_update_date;
    this.mthNumber = monthNowNumber;
  }

  select_mth_from = '';
  select_mth_to = '';
  ionViewDidLoad() {    

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

      this.selectRegionAll();
      this.selectionProvinceAll();
      this.ddlMonthFrom();
      this.ddlMonthTo();

      let Region;
      let Province;
      let month_from = "1";//convertMthBudYear(this.mthNumber);
      let month_to = convertMthBudYear(this.mthNumber);
      let typeCur = 'M';

     this.select_mth_from = month_from;
     this.select_mth_to = month_to;

      this.selectDataAll(Region, Province, typeCur,month_from,month_to);
  }

  selectRegionAll() {
    this.webapi.getData('ddlMRegion?offcode=' + this.offcode).then((data) => {
      this.responseRegion = data;
    });
  }

  selectionProvinceAll() {
    let region;
    if (this.region != "00") {
      region = localStorage.region_desc;
    }
    //let  Region = 'undefined';
    this.webapi.getData('ddlMProvince?offcode=' + this.offcode + '&area=' + region).then((data) => {
      this.ResponseProvince = data;
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

  selectRegion(Region, Province, typeCur,month_from,month_to) {
    Province = 'undefined';
    this.Province = "undefined";

    if (this.region != "00") {
      Region = localStorage.region_desc;
    }
    if(Region == "EEC"){
      this.eecMarkShow=1;
    }else{
      this.eecMarkShow=0;
    }
    this.selectionProvinceFill(Region);
    this.selectData(Region, Province, typeCur,month_from,month_to);
  }

  selectionProvinceFill(Region) {
    this.webapi.getData('ddlMProvince?offcode=' + this.offcode + '&area=' + Region).then((data) => {
      this.ResponseProvince = data;
    });
  }

  selectionProvince(Region, Province, typeCur,month_from,month_to) {
    this.selectData(Region, Province, typeCur,month_from,month_to);
  }

  selectMonthFrom(Region, Province, typeCur,month_from,month_to){
   
   /* if(month_from ==  undefined){
      month_to = 'undefined';
      this.month_to = 'undefined';
    }  */

    this.selectData(Region, Province, typeCur,month_from,month_to);
  }

  selectMonthTo(Region, Province, typeCur,month_from,month_to){
    this.selectData(Region, Province, typeCur,month_from,month_to);
  }

  regionSelectType = "";
  selectDataAll(Region, Province, typeCur,month_from,month_to) {
    //this.dateAsOff = dateDisplayAll;
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

  //alert("offcode "+ this.offcode +" กลุ่มสินค้า "+  this.grp_id+" ภาค "+Region+" จังหวัด "+ Province + "จากเดือน " +month_from+ "ถ ึงเดือน "+ month_to);

    this.webapi.getData('Top10Profile?offcode=' + this.offcode + '&group_id=' + this.grp_id + '&region=' + Region + '&province=' + Province + '&month_from=' + month_from + '&month_to=' + month_to).then((data) => {
      this.responseData = data;
      this.getTableTAX(this.regionSelectType);
    });

  }

  selectData(Region, Province, typeCur,month_from,month_to){

    //alert("offcode "+ this.offcode +" กลุ่มสินค้า "+  this.grp_id+" ภาค "+Region+" จังหวัด "+ Province + "จากเดือน " +month_from+ "ถ ึงเดือน "+ month_to);
   
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
  
    this.webapi.getData('Top10Profile?offcode=' + this.offcode + '&group_id=' + this.grp_id + '&region=' + Region + '&province=' + Province + '&month_from=' + month_from + '&month_to=' + month_to).then((data) => {
      this.responseData = data; 
      this.getTableTAX(this.regionSelectType);
    });
    this.getDateTiTle(month_from,month_to);

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

  getTableTAX(typeCur) {
    let tax;
    for (var i = 0; i < this.responseData.length; i++) {

      tax = this.responseData[i].TAX;
      if (tax != null) { tax = changeCurrency(tax, typeCur); }
      this.responseData[i].TAX = tax;
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
