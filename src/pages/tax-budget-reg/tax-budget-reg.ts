import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

declare var dateDisplayAll: any;
declare var changeCurrency: any;
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
  offcode: any;
  year: any;
  grp_id: any;
  dateAsOff = "";
  dateDisplay = "";

  Province: any;
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
  /* start for pinch */
  public fontSize = `${BASE_SCALE}rem`;
  private scale = BASE_SCALE;
  private alreadyScaled = BASE_SCALE;
  public isScaling = false;
  /* end  */
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public webapi: RestProvider) {
    this.grp_id = this.navParams.get('group_id');
    this.offcode = localStorage.offcode;
    this.dateAsOff = dateDisplayAll;
    this.dateDisplay = localStorage.last_update_date;
  }

  ionViewDidLoad() {

    var d = new Date();
    var n = d.getFullYear();
    var nt = d.getFullYear() + 543;
    let year_en: any;
    let year_th: any;

    var range = [];
    for (var i = 0; i < 10; i++) {

      year_en = n - i;
      year_th = nt - i;

      range.push({ "key": year_th, "value": year_en });

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
    this.summaryDate = range;

    this.selectRegionAll();
    this.selectionProvinceAll();

    let Region;
    let Province;
    let month_from;
    let month_to;
    let Year = 'undefined';
    let typeCur = 'M';

    this.selectDataAll(Region, Province, typeCur,month_from,month_to);

  }

  selectRegionAll() {
    this.webapi.getData('ddlMRegion?offcode=' + this.offcode).then((data) => {
      this.responseRegion = data;
      //this.selectionProvinceFill(data[0].REGION_CD);
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

  selectRegion(Region, Province, typeCur,month_from,month_to) {
    Province = 'undefined';
    this.Province = "undefined";

    if (this.region != "00") {
      Region = localStorage.region_desc;
    }

    this.selectionProvinceFill(Region);
    this.selectDataAll(Region, Province, typeCur,month_from,month_to);
  }

  selectionProvinceFill(Region) {
    this.webapi.getData('ddlMProvince?offcode=' + this.offcode + '&area=' + Region).then((data) => {
      this.ResponseProvince = data;
    });
  }

  selectionProvince(Region, Province, typeCur,month_from,month_to) {
    //this.selectionProvinceFill(Region);
    this.selectDataAll(Region, Province, typeCur,month_from,month_to);
  }

  regionSelectType = "";
  selectDataAll(Region, Province, typeCur,month_from,month_to) {
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
