import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

declare var changeCurrency: any;
declare var dateDisplayNow: any;
declare var dateDisplayAll: any;

@IonicPage()
@Component({
  selector: 'page-dimension-time-03',
  templateUrl: 'dimension-time-03.html',
})
export class DimensionTime_03Page {
  responseRegion: any;
  ResponseProvince: any;
  respondData:any;

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public webapi:RestProvider) {
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
  }

  ionViewDidLoad() {
    this.selectionAreaAll();
    this.selectionProvinceAll();

    let Region = 'undefined';
    let Province = 'undefined';
    let typeCur = "B";
    let month = 'undefined';

    this.getAllData(Region,Province,month,typeCur);
    //var d = new Date(); 
   // var n = d.getMonth();
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

  selectRegion(Region,Province,month,typeCur){  
    Province = 'undefined';
    this.select_all_value = true;
    this.select_all_prov_value = false;

    if(this.region != "00"){
      Region = localStorage.region_desc;
    }
    this.selectionProvinceFill(Region);
    this.getAllData(Region,Province,month,typeCur);
  }

  selectionProvinceFill(Region){  

    this.webapi.getData('ddlMProvince?offcode='+this.offcode+'&area='+Region).then((data) => {
      this.ResponseProvince = data;
    }); 
  }

  selectionProvince(Region,Province,month,typeCur){
    this.getAllData(Region,Province,month,typeCur);
  }

  selectMonth(Region,Province,month,typeCur){
    this.getAllData(Region,Province,month,typeCur);
  }
   
  getAllData(Region,Province,month,typeCur){
    if(this.region != "00"){
      Region = localStorage.region_desc;
    }

    if(this.branch != "00"){    
      Province =  this.select_province;
    }

    this.webapi.getData('DimansionTime03?offcode='+this.offcode+'&region='+Region+'&province='+Province+'&month='+month).then((data)=>{
      this.respondData = data; 
      this.getTableTAX(typeCur);
    });
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

}
