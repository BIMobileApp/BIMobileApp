import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

declare var dateDisplayAll: any;
declare var changeCurrency: any;
declare var convertMthBudYear:any;
declare var monthNowNumber:any;
/* start for pinch */
const MAX_SCALE = 11.1;
const MIN_SCALE = 0.9;
const BASE_SCALE = 1.3;
/* end  */
@IonicPage()
@Component({
  selector: 'page-tax-budget-reg-by-mth',
  templateUrl: 'tax-budget-reg-by-mth.html',
})
export class TaxBudgetRegByMthPage {

  username:any;
  responseData: any;
  summaryDate: any;
  offcode: any;
  responseDateTitle:any;
  dateDisplay: any;
  dateAsOff: any;
  monthNowNumber:any;
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
    this.username = localStorage.userData;
    this.dateDisplay = localStorage.last_update_date;
    this.mthNumber = monthNowNumber;
    //this.dateAsOff = dateDisplayAll;
    
    this.dateAsOff = 'ข้อมูล '+dateDisplayAll;
  }


  region: any;
  province: any;
  branch: any;

  select_region: any;
  select_all_value: any;
  select_all_prov_value: any;
  select_province: any;
  isEnable: any;
  isEnableProv: any;
  
  select_mth_from = '';
  select_mth_to = '';
  ionViewDidLoad() {
    let datetime = new Date();
    let datenow = datetime.getMonth();
    // let datenow = datetime.getMonth();

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

    this.ddlMonthFrom();
    this.ddlMonthTo();
    this.selectRegionAll();
    this.selectionProvinceAll();

    let month_from = convertMthBudYear(this.mthNumber);
    let month_tor  = convertMthBudYear(this.mthNumber);
    let typeCur = "M";
    let Region = 'undefined';
    let Province =  'undefined';

    this.select_mth_from = month_from;
    this.select_mth_to = month_tor;

    this.selectDataAll(Region, Province, typeCur,month_from,month_tor);   
  }
  responseRegion:any;
  selectRegionAll() {
    this.webapi.getData('ddlMRegion?offcode=' + this.offcode).then((data) => {
      this.responseRegion = data;
    });
  }

  ResponseProvince:any;
  selectionProvinceAll() {
    let region;
    if (this.region != "00") {
      region = localStorage.region_desc;
    }
   
    this.webapi.getData('ddlMProvince?offcode=' + this.offcode + '&area=' + region).then((data) => {
      this.ResponseProvince = data;
    });
  }
  Province:any;
  selectRegion(Region, Province, typeCur,month_from,month_to) {
    Province = 'undefined';
    this.Province = "undefined";

    if (this.region != "00") {
      Region = localStorage.region_desc;
    }

   this.selectionProvince(Region, Province, typeCur,month_from,month_to)
  }

  selectionProvince(Region, Province, typeCur,month_from,month_to) {
    this.webapi.getData('ddlMProvince?offcode=' + this.offcode + '&area=' + Region).then((data) => {
      this.ResponseProvince = data;
    });
    this.selectDataAll(Region, Province, typeCur,month_from,month_to);
  }

  selectDataAll(Region, Province, typeCur,month_from,month_to){ 
    
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
    this.webapi.getData('TaxBudgetRegByMth?offcode=' + this.offcode + '&month_from=' + month_from+'&month_to='+month_to+
                                    '&region='+Region+'&province='+Province).then((data) => {
      this.responseData = data; 
      this.getTableTAX(this.regionSelectType);
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

  selectMonthFrom(Region, Province, typeCur,month_from,month_to){
    this.selectDate(Region, Province, typeCur,month_from,month_to);
  }

  selectMonthTo(Region, Province, typeCur,month_from,month_to){
    this.selectDate(Region, Province, typeCur,month_from,month_to); 
  }

  regionSelectType = "";
  selectDate(Region, Province, typeCur,month_from,month_to) {
      if(typeCur == undefined){
        this.regionSelectType = "M";
      }else{
        this.regionSelectType =  typeCur;
      }

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

      this.webapi.getData('TaxBudgetRegByMth?offcode=' + this.offcode + '&month_from=' + month_from+'&month_to='+month_to+
                                      '&region='+Region+'&province='+Province).then((data) => {
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
    //console.log(typeCur);
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
