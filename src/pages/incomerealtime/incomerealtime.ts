import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

declare var changeCurrency: any;
declare var dateDisplayNow: any;
declare var dateDisplayAll: any;
/* start for pinch */
const MAX_SCALE = 11.1;
const MIN_SCALE = 0.9;
const BASE_SCALE = 1.3;
/* end  */

@IonicPage()
@Component({
  selector: 'page-incomerealtime',
  templateUrl: 'incomerealtime.html',
})
export class IncomerealtimePage {

  respondData: any;
  respondSumData: any;
  responseRegion: any;
  ResponseProvince: any;

  offcode: any;
  offdesc:any;
  regiondesc:any;

  username:any;
  dateAsOff = "";
  dateDisplay = "";
  dateNow = "";
  unitType: any;
  Region: any;
  Province: any;
  time: any;

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
/* start for pinch */
public fontSize = `${BASE_SCALE}rem`;
private scale = BASE_SCALE;
private alreadyScaled = BASE_SCALE;
public isScaling = false;
/* end  */
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public webapi:RestProvider) {
      this.offcode = localStorage.offcode;
      this.regiondesc = localStorage.region_shot;
      this.offdesc = localStorage.offdesc;
      this.username = localStorage.userData;
      this.dateAsOff = dateDisplayAll;
      this.dateDisplay = localStorage.last_update_date;
      this.dateNow = dateDisplayNow;

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

      var d = new Date();
      this.time = d.getHours() + " : " +  d.getMinutes();
  }

  regionSelectType = "";
  ionViewDidLoad() {
    let Region;
    let Province;
    let typeCur = "M";

    this.selectionAreaAll();
    this.selectionProvinceAll();
    this.getData(Region, Province, typeCur);
  }
  selectionAreaAll(){
    this.webapi.getData('ddlMRegion?offcode=' + this.offcode).then((data) => {
      this.responseRegion = data;
    });
  }
  selectionProvinceAll(){ 
    let region;
    if(this.region != "00"){
      region = localStorage.region_desc;
    }
    this.webapi.getData('ddlMProvince?offcode=' + this.offcode + '&area='+region).then((data) => {
      this.ResponseProvince = data;
    });
  }

  selectRegion(Region,Province,typeCur){  
    Province =  'undefined';
    this.Province =  'undefined';
    this.selectionProvince(Region,Province,typeCur);
    //this.getData(Region,Province,typeCur);
  }


  selectionProvince(Region,Province,typeCur){

    if(this.region != "00"){
      Region = localStorage.region_desc;
    }
    this.webapi.getData('ddlMProvince?offcode=' + this.offcode + '&area='+Region).then((data) => {
      this.ResponseProvince = data;
    });
    //console.log(Region);
    this.getData(Region,Province,this.regionSelectType);
  }
   
  getData(Region,Province,typeCur){
    /*if (Region !== this.oldRegion || typeCur !== this.oldtypeCur) {
      Province = undefined;
    }*/

    if(typeCur == undefined){
      this.regionSelectType = "M";
    }else{
      this.regionSelectType =  typeCur;
    }

    if(this.region != "00"){
      Region = localStorage.region_desc;
    }else{
      Region = Region;
    }
  
    if(this.branch != "00" || this.province != "00"){
      Province = this.select_province;
    }else{
      Province = Province;
    }
    this.webapi.getData('SourceImcome?offcode='+this.offcode+'&region='+Region+'&province='+Province).then((data)=>{
          this.respondData = data;
          this.getTableTAX(this.regionSelectType);
    });
      this.oldRegion = Region;
      this.oldtypeCur = typeCur;
  }

  getTableTAX(typeCur) {
    let tax;
    for (var i = 0; i < this.respondData.length; i++) {
       tax = this.respondData[i].TAX;
       if (tax != null) { tax = changeCurrency(tax, typeCur); }
      this.respondData[i].TAX = tax;
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
