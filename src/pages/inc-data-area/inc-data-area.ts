import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

declare var dateDisplayAll:any;

@IonicPage()
@Component({
  selector: 'page-inc-data-area',
  templateUrl: 'inc-data-area.html',
})
export class IncDataAreaPage {

  offcode: any;
  dateDisplay:any;
  dateAsOff:any;
  responseData: any;
  responseArea: any;
  Area: any;
  SuraResponseProvince: any;
  CardResponseProvince: any;
  TobResponseProvince: any;
  responseGroupName: any;
  SuraRepondProduct:any;
  CardRepondProduct:any;
  TOBBACORepondProduct:any;
  repondProduct:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public webapi:RestProvider) {
      this.offcode = localStorage.offcode;
      this.dateDisplay = localStorage.last_update_date;
      this.dateAsOff =  dateDisplayAll;
  }


  ionViewDidLoad() {
    this.loadData();
    this.selectionArea();
    this.selectionGeoupName();
   /*  this.IncProductAll(); */
  }

  selectionArea(){
    this.webapi.getData('SelectionArea?offcode='+this.offcode).then((data) => {
      this.responseArea = data;
     
    });
    
  }

 SuraSelectionProvince(){
    this.webapi.getData('SelectionProvince?offcode='+this.offcode+'&area='+this.Area).then((data) => {
      this.SuraResponseProvince = data;
    });
  }

  selectionGeoupName(){
    this.webapi.getData('SelectionGroupName?offcode='+this.offcode).then((data) => {
      this.responseGroupName = data;
    });
  }


  //---------------------------------------------------------SURA------------------------------------------------------------//
  SuraGetitems(SuraArea,SuraProvince,SuraMonth){
    var group_name = "สุรา";
    var old_area = SuraArea;
    //this.selectionProvinceChange(area);
    //this.selectionGeoupName();
    if(SuraArea != 'undefined' || SuraArea != old_area){
      this.Area = SuraArea
      this.SuraSelectionProvince();
      SuraProvince = 'undefined';
    }
    console.log(SuraProvince);
    this.webapi.getData('IncProductByArea?offcode='+this.offcode+'&region='+SuraArea+"&province="+SuraProvince+"&group_desc="+group_name +"&month="+SuraMonth).then((data) => {
      this.SuraRepondProduct = data;

      this.getSuraAmt();
      this.getSuraCount();
    });
  }
 //---------------------------------------------------------Card------------------------------------------------------------//
 TOBBACOGetitems(TOBBACOArea,TOBBACOProvince,TOBBACOMonth){
  console.log(TOBBACOArea);
  console.log(TOBBACOProvince);
  console.log(TOBBACOMonth);
  var group_name = "ยาสูบ";
  //this.selectionProvinceChange(area);
  //this.selectionGeoupName();

  this.webapi.getData('IncProductByArea?offcode='+this.offcode+'&region='+TOBBACOArea+"&province="+TOBBACOProvince+"&group_desc="+group_name +"&month="+TOBBACOMonth).then((data) => {
    this.TOBBACORepondProduct = data;

    this.getTobAmt();
    this.getTobCount();
  });
}

  //---------------------------------------------------------Card------------------------------------------------------------//
  CardGetitems(CardArea,CardProvince,CardMonth){
    console.log(CardArea);
    console.log(CardProvince);
    console.log(CardMonth);
    var group_name = "ไพ่";
    //this.selectionProvinceChange(area);
    //this.selectionGeoupName();

    this.webapi.getData('IncProductByArea?offcode='+this.offcode+'&region='+CardArea+"&province="+CardProvince+"&group_desc="+group_name +"&month="+CardMonth).then((data) => {
      this.CardRepondProduct = data;

      this.getCardAmt();
      this.getCardCount();
    });
  }


 /*  selectionProvinceChange(area){
    this.webapi.getData('SelectionProvinceChange?offcode='+this.offcode+'&region'+area).then((data) => {
      this.responseProvince = data;
    });
  } */

  IncProductAll(){
    this.webapi.getData('IncProductByAreaAll?offcode='+this.offcode).then((data) => {
      this.repondProduct = data;
      this.getAmt();
      this.getCount();
    });
  }

  getSuraAmt(){
    let val;
    for (var i = 0; i < this.SuraRepondProduct.length; i++) {
      val = this.SuraRepondProduct[i].AMT;
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.SuraRepondProduct[i].AMT = val;
    }
  }

  getSuraCount(){
    let val;
    for (var i = 0; i < this.SuraRepondProduct.length; i++) {
      val = this.SuraRepondProduct[i].COUNT;
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.SuraRepondProduct[i].COUNT = val;
    }
  }

  getCardAmt(){
    let val;
    for (var i = 0; i < this.CardRepondProduct.length; i++) {
      val = this.CardRepondProduct[i].AMT;
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.CardRepondProduct[i].AMT = val;
    }
  }

  getCardCount(){
    let val;
    for (var i = 0; i < this.CardRepondProduct.length; i++) {
      val = this.CardRepondProduct[i].COUNT;
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.CardRepondProduct[i].COUNT = val;
    }
  }

  getTobAmt(){
    let val;
    for (var i = 0; i < this.TOBBACORepondProduct.length; i++) {
      val = this.TOBBACORepondProduct[i].AMT;
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.TOBBACORepondProduct[i].AMT = val;
    }
  }

  getTobCount(){
    let val;
    for (var i = 0; i < this.TOBBACORepondProduct.length; i++) {
      val = this.TOBBACORepondProduct[i].COUNT;
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.TOBBACORepondProduct[i].COUNT = val;
    }
  }

  getAmt(){
    let val;
    for (var i = 0; i < this.repondProduct.length; i++) {
      val = this.repondProduct[i].AMT;
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.repondProduct[i].AMT = val;
    }
  }

  getCount(){
    let val;
    for (var i = 0; i < this.repondProduct.length; i++) {
      val = this.repondProduct[i].COUNT;
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.repondProduct[i].COUNT = val;
    }
  }

  loadData(){
    this.webapi.getData('IncArea?offcode='+this.offcode).then((data)=>{
      this.responseData = data;
      this.getNumSURA();
      this.getNumTOBBACO();
      this.getNumCARD();
      this.getAmtSURA();
      this.getAmtTOBBACO();
      this.getAmtCARD();   
    });
  }

  getNumSURA() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].NUM_OF_LIC_SURA;
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].NUM_OF_LIC_SURA = val;
    }
  }

  getNumTOBBACO() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].NUM_OF_LIC_TOBBACO;
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].NUM_OF_LIC_TOBBACO = val;
    }
  }

  getNumCARD() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].NUM_OF_LIC_CARD;
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].NUM_OF_LIC_CARD = val;
    }
  }

  getAmtSURA() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].AMT_OF_LIC_SURA/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].AMT_OF_LIC_SURA = val;
    }
  }

  getAmtTOBBACO() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].AMT_OF_LIC_TOBBACO/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].AMT_OF_LIC_TOBBACO = val;
    }
  }

  getAmtCARD() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].AMT_OF_LIC_CARD/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].AMT_OF_LIC_CARD = val;
    }
  }
  
}
