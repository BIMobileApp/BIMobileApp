import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
declare var changeCurrency: any;
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

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public webapi:RestProvider) {
      this.offcode = localStorage.offcode;
      this.username = localStorage.userData;
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
    var area="undefined";
    var Province="undefined"; 
    this.getDataAll(typeCur);
  }

  getDataAll(typeCur){
    this.webapi.getData('TaxProductGroupByMthAll?offcode='+this.offcode).then((data)=>{
       this.responseData = data;
       this.getTAX(typeCur);
     });
  }

  selectMonthFrom(area,Province,monthFrom,monthTo,typeCur){ 
   
    this.webapi.getData('TaxProductGroupByMth?area='+this.area+'&Province='+this.Province+'&offcode='+this.offcode+'&monthFrom='+monthFrom+'&monthTo='+monthTo).then((data)=>{
    //  this.selectMTFrom =monthFrom;
      this.responseData = data;
      this.getTAX(typeCur);
     // this.selectMonthTo(area,Province,monthFrom,monthTo);
    });
  }

  selectMonthTo(area,Province,monthFrom,monthTo,typeCur){ 
    this.getTableData(area,Province,monthFrom,monthTo,typeCur) ;
  }
  selectionArea(){
    this.webapi.getData('ddlMRegion?offcode='+this.offcode).then((data) => {
      this.responseArea = data;
    });
  }

  selectionRegion(area,Province,monthFrom,monthTo,typeCur){
    this.selectionProvince(area,Province,monthFrom,monthTo,typeCur);
  }

  selectionProvince(area,Province,monthFrom,monthTo,typeCur){   
    this.webapi.getData('ddlMProvince?offcode='+this.offcode+'&area='+area).then((data) => {
      this.responseProvince = data;
    });
    this.getTableData(area,Province,monthFrom,monthTo,typeCur);
  }


  getTableData(area,Province,monthFrom,monthTo,typeCur) {
    
    if (area !== this.oldArea || typeCur !== this.oldtypeCur) {
      Province = undefined;
    }
    this.webapi.getData('TaxProductGroupByMth?offcode='+this.offcode+'&area='+area+'&province='+Province+'&monthFrom='+ monthFrom +'&monthTo='+monthTo).then((data) => {
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

}
