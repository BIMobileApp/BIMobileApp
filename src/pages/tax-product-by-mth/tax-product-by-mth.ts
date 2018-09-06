import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

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
  oldArea:any;
  username:any;
  area:any;
  Province:any;
  responseArea:any;
  responseProvince:any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public webapi:RestProvider) {
      this.offcode = localStorage.offcode;
      this.username = localStorage.userData;
  }

  ionViewDidLoad() {
    this.selectMTFrom ="";
   var d = new Date(); 
    var n = d.getFullYear();
    var nt = d.getFullYear()+543;
    console.log(nt);
    var range = [];
    for(var i=0;i<10;i++) {

     this.year_en = n-i;
     this.year_th = nt-i;

      range.push( {"key":this.year_th,"value": this.year_en});
    }
    this.summaryDate = range;
    console.log(this.summaryDate);
    this.selectionArea();
    var area="undefined";
    var Province="undefined"; 
    this.getDataAll();
  }

  getDataAll(){
    this.webapi.getData('TaxProductGroupByMthAll?offcode='+this.offcode).then((data)=>{
       this.responseData = data;
       this.getTAX();
       this.getTAX_Ly();
       this.getTAX_Est();
     });
  }

  selectMonthFrom(mthFrom){ 
    this.selectMTTo = mthFrom;
    this.webapi.getData('TaxProductGroupByMth?area='+this.area+'&Province='+this.Province+'&offcode='+this.offcode+'&monthFrom='+mthFrom+'&monthTo=').then((data)=>{
      this.selectMTFrom =mthFrom;
      this.responseData = data;
      this.getTAX();
      this.getTAX_Ly();
      this.getTAX_Est();
      this.selectMonthTo(mthFrom);
    });
  }

  selectMonthTo(mthTo){ 
    this.webapi.getData('TaxProductGroupByMth?area='+this.area+'&Province='+this.Province+'&offcode='+this.offcode+'&monthFrom='+ this.selectMTFrom+'&monthTo='+mthTo).then((data)=>{
      this.selectMTTo =mthTo;
      this.responseData = data;
      this.getTAX();
      this.getTAX_Ly(); 
      this.getTAX_Est();
    });
  }
  selectionArea(){
    this.webapi.getData('ddlMRegion?offcode='+this.offcode).then((data) => {
      this.responseArea = data;
    });
  }
   
   selectionProvince(area,Province){   
    console.log(area,Province);
    this.webapi.getData('ddlMProvince?offcode='+this.offcode+'&area='+area).then((data) => {
      this.responseProvince = data;

    });
    this.getTableData(area,Province);
  }
  getTableData(area,Province) {
    
    if(area != this.oldArea){
      Province = 'undefined';
    } 
    this.area=area;
    this.Province=Province;
    this.webapi.getData('TaxProductGroupByMth?area='+area+'&Province='+Province+'&offcode='+this.offcode+'&monthFrom='+ this.selectMTFrom+'&monthTo='+this.selectMTTo).then((data) => {
      this.responseData = data;
      this.getTAX();
      this.getTAX_Ly(); 
      this.getTAX_Est();
      
    });
   this.oldArea = area;
  }

  getTAX() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].TAX/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].TAX = val;

    }
  }

  getTAX_Ly() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].LAST_TAX/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].LAST_TAX = val;

    }
  }

  getTAX_Est() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].ESTIMATE/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].ESTIMATE = val;
    }
  }

}