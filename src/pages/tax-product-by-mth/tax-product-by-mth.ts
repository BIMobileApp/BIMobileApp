import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
declare var changeCurrency: any;
/* start for pinch */
const MAX_SCALE = 11.1;
const MIN_SCALE = 0.9;
const BASE_SCALE = 1.3;
/* end  */
@IonicPage()
@Component({
  selector: 'page-tax-product-by-mth',
  templateUrl: 'tax-product-by-mth.html',
})
export class TaxProductByMthPage {

  responseData: any;
  summaryDate:any;
  offcode: any;
  criteRia:any;
  year_en:any;
  year_th:any;
  selectMTFrom:any;
  selectMTTo:any;
  username:any;
  area:any;
  Province:any;
  responseArea:any;
  responseProvince:any;
  oldArea: any;
  oldtypeCur : any;
  /* start for pinch */
public fontSize = `${BASE_SCALE}rem`;
private scale = BASE_SCALE;
private alreadyScaled = BASE_SCALE;
public isScaling = false;
/* end  */

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

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public webapi:RestProvider) {
      this.offcode = localStorage.offcode;
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
  if(this.branch != "00" || this.province != "00"){          
     res =  localStorage.offdesc.split(" ");
     this.select_province  = res[0];
     this.select_all_prov_value = false;
     this.isEnableProv = true;
   }else{
     this.select_all_prov_value = true;
     this.isEnableProv = false;
   }
  ///end  ตรวจสอบสาขาเพื่อ default selection
  }

  ionViewDidLoad() {
    let typeCur = 'B';
    this.selectMTFrom ="";
   var d = new Date(); 
    var n = d.getFullYear();
    var nt = d.getFullYear()+543;
    
    var range = [];
    for(var i=0;i<10;i++) {

     this.year_en = n-i;
     this.year_th = nt-i;

      range.push( {"key":this.year_th,"value": this.year_en});
    }
    this.summaryDate = range;
    
    this.selectionArea();
    this.selectionProvinceAll();
    var area;
    var Province;
    var monthFrom = "undefined";
    var monthTo ="undefined";
    this.getTableData(area,Province,monthFrom,monthTo,typeCur);
    //this.getDataAll(typeCur);
  }

  getDataAll(typeCur){
    this.webapi.getData('TaxProductGroupByMthAll?offcode='+this.offcode).then((data)=>{
       this.responseData = data;
       this.getTAX(typeCur);
     });
  }

  selectMonthFrom(area,Province,monthFrom,monthTo,typeCur){ 
    
    let Region;
    let province;

    if(this.region != "00"){
      Region = localStorage.region_desc;
    }else{
      Region =area;
    }
    if(this.branch != "00" || this.province != "00"){    
      province =  this.select_province;
    }else{
      province = Province;
    }  

    this.getTableData(Region,province,monthFrom,monthTo,typeCur) ;
  }

  selectMonthTo(area,Province,monthFrom,monthTo,typeCur){ 
    let Region;
    let province;

    if(this.region != "00"){
      Region = localStorage.region_desc;
    }else{
      Region =area;
    }
    if(this.branch != "00" || this.province != "00"){    
      province =  this.select_province;
    }else{
      province = Province;
    }  

    this.getTableData(Region,province,monthFrom,monthTo,typeCur) ;
  }
  selectionArea(){
    this.webapi.getData('ddlMRegion?offcode='+this.offcode).then((data) => {
      this.responseArea = data;
    });
  }

  selectionProvinceAll(){
    let region;
    if(this.region != "00"){
      region = localStorage.region_desc;
    }
    //let  Region = 'undefined';
    this.webapi.getData('ddlMProvince?offcode='+this.offcode+'&area='+region).then((data) => {
      this.responseProvince = data;
    }); 
  }

  selectionRegion(area,Province,monthFrom,monthTo,typeCur){
    
    /*if(this.region != "00"){
      area = localStorage.region_desc;
    }*/

    Province =  'undefined';
    this.Province = 'undefined';
    
    this.selectionProvince(area,Province,monthFrom,monthTo,typeCur);
  }

  selectionProvince(area,Province,monthFrom,monthTo,typeCur){ 

    if(this.region != "00"){
      area = localStorage.region_desc;
    }
    this.webapi.getData('ddlMProvince?offcode='+this.offcode+'&area='+area).then((data) => {
      this.responseProvince = data;
    });
    this.getTableData(area,Province,monthFrom,monthTo,typeCur);

  }


  getTableData(area,Province,monthFrom,monthTo,typeCur) {
    
    /*if (area !== this.oldArea || typeCur !== this.oldtypeCur) {
      Province = undefined;
    }*/
    let Region;
    let province;

    if(this.region != "00"){
      Region = localStorage.region_desc;
    }else{
      Region =area;
    }
    if(this.branch != "00" || this.province != "00"){    
      province =  this.select_province;
    }else{
      province = Province;
    }  

    alert("ภาค="+Region+" จังหวัด="+ Province+" หน่วย="+ typeCur);
    this.webapi.getData('TaxProductGroupByMth?offcode='+this.offcode+'&area='+Region+'&province='+province+'&monthFrom='+ monthFrom +'&monthTo='+monthTo).then((data) => {
      this.responseData = data;
      this.getTAX(typeCur);
      
    });
    this.oldArea = area;
    this.oldtypeCur = typeCur;
  }

  getTAX(typeCur) {
    let tax;
    let last_tax;
    let est;
    for (var i = 0; i < this.responseData.length; i++) {
      tax = this.responseData[i].TAX;
      if (tax != null) { tax = changeCurrency(tax, typeCur); }
      this.responseData[i].TAX = tax;

      last_tax = this.responseData[i].LAST_TAX;
      if (last_tax != null) { last_tax = changeCurrency(last_tax, typeCur); }
      this.responseData[i].LAST_TAX = last_tax;

      est = this.responseData[i].ESTIMATE;
      if (est != null) { est = changeCurrency(est, typeCur); }
      this.responseData[i].ESTIMATE = est;
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
