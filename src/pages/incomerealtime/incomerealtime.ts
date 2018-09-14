import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

declare var changeCurrency: any;
declare var dateDisplayNow: any;
declare var dateDisplayAll: any;

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
   if(this.branch != "00"){          
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

  ionViewDidLoad() {
    let Region = 'undefined';
    let Province = 'undefined';
    let typeCur = "B";
    this.getData(Region, Province, typeCur);
    this.selectionAreaAll();
    this.selectionProvinceAll();
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
    alert(Region+" -- "+Province+" -- "+typeCur);
    this.selectionProvince(Region,Province,typeCur);
    //this.getData(Region,Province,typeCur);
  }

  selectionProvince(Region,Province,typeCur){
    if(this.region != "00"){
      Region = localStorage.region_desc;
    }
    //console.log(Region);
    this.getData(Region,Province,typeCur);
  }
   
  getData(Region,Province,typeCur){
    alert(this.oldRegion + " -- " + Region);
    if (Region !== this.oldRegion) {
      Province = undefined;
    }
      this.webapi.getData('SourceImcome?offcode='+this.offcode+'&region='+Region+'&province='+Province).then((data)=>{
          this.respondData = data;
          this.getTableTAX(typeCur);
      });
      this.oldRegion = Region;
      alert(this.oldRegion + " -- " + Region);
  }

  getTableTAX(typeCur) {
    let tax;
    for (var i = 0; i < this.respondData.length; i++) {
       tax = this.respondData[i].TAX;
       if (tax != null) { tax = changeCurrency(tax, typeCur); }
      this.respondData[i].TAX = tax;
    }
  }




}
