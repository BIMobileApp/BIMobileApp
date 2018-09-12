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
  defaultSelectProvince:any;

  province:any;
  defaultSelectQuestion:any;
  questionArray:any;
  username:any;
  respondProduct:any;
  defaultSelectProduct:any;

  str_offcode:any;
  str_head_offcode:any;

  repondProductSura:any;
  repondProductSica:any;
  repondProductCard:any;
  responseProvince:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public webapi:RestProvider) {
      this.offcode = localStorage.offcode;
      this.str_offcode = localStorage.offcode.toString().substring(0, 2);

      if( this.str_offcode == "00")
      {
        this.str_head_offcode = "ภาค";
      }else{
        this.str_head_offcode = "พื้นที่";
      }

      /*if( this.province == "00"){
        this.defaultSelectQuestion = -1; 
      }else{
        this.defaultSelectQuestion = 0;
      }*/

      this.dateDisplay = localStorage.last_update_date;
      this.dateAsOff =  dateDisplayAll;
      this.username = localStorage.userData;
  }

  ionViewDidLoad() {
    this.loadData();
    this.selectionArea();
    this.selectionGeoupName();
    this.selectionProvinceAll();

    this.ProductSuraAll();
    this.ProductSicaAll();
    this.ProductCardAll();
  }

  selectionArea(){
    this.webapi.getData('SelectionArea?offcode='+this.offcode).then((data) => {
      this.responseArea = data;     
    });   
  }

  selectionProvinceAll(){
    this.webapi.getData('ddlMProvince?offcode=' + this.offcode + '&area=undefined').then((data) => {
      this.responseProvince = data;
    });
  }

 SuraSelectionProvince(){
    this.webapi.getData('SelectionProvince?offcode='+this.offcode+'&area='+this.Area).then((data) => {
      this.responseProvince = data;
    });
  }

  selectionGeoupName(){
    this.webapi.getData('SelectionGroupName?offcode='+this.offcode).then((data) => {
      this.responseGroupName = data;
    });
  }
  //---------------------------------------------------------SURA------------------------------------------------------------//
  Getitems(Area,Province,Month){
    Province = 'undefined';
    this.GetitembyProvince(Area,Province,Month);
   /* var sura = "สุรา";
    var old_area = Area;
    //this.selectionProvinceChange(area);
    //this.selectionGeoupName();
    if(Area != 'undefined' || Area != old_area){
      this.Area = Area
      this.SuraSelectionProvince();
      Province = 'undefined';
    }*/

    this.getProduct(Area,Province,Month);
  }

  GetitembyProvince(Area,Province,Month){
    
    Province = undefined;
    this.webapi.getData('ddlMProvince?offcode=' + this.offcode + '&area=' + Area).then((data) => {
      this.responseProvince = data;
    });

    this.getProduct(Area,Province,Month);
  }

  GetitemsMonth(Area,Province,Month){
    this.GetitembyProvince(Area,Province,Month);
    this.getProduct(Area,Province,Month);
  }

  getProduct(Area,Province,Month){
    this.webapi.getData('IncProductByArea?offcode='+this.offcode+'&region='+Area+"&province="+Province+"&group_desc=สุรา&month="+Month).then((data) => {
      this.repondProductSura = data;
      //this.getSuraAmt();
     // this.getSuraCount();
    });

    this.webapi.getData('IncProductByArea?offcode='+this.offcode+'&region='+Area+"&province="+Province+"&group_desc=ยาสูบ&month="+Month).then((data) => {
      this.repondProductSica = data;
    });

    this.webapi.getData('IncProductByArea?offcode='+this.offcode+'&region='+Area+"&province="+Province+"&group_desc=ไพ่&month="+Month).then((data) => {
      this.repondProductCard = data;
    });

  }

 /*  selectionProvinceChange(area){
    this.webapi.getData('SelectionProvinceChange?offcode='+this.offcode+'&region'+area).then((data) => {
      this.responseProvince = data;
    });
  } */

///get all product///
   ProductSuraAll(){
    this.webapi.getData('IncProductByAreaAll?offcode='+this.offcode+'&group_name=สุรา').then((data) => {
      this.repondProductSura = data;
    });

    this.webapi.getData('IncProductByAreaAll?offcode='+this.offcode+'&group_name=ยาสูบ').then((data) => {
      this.repondProductSica = data;
    });

    this.webapi.getData('IncProductByAreaAll?offcode='+this.offcode+'&group_name=ไพ่').then((data) => {
      this.repondProductCard = data;
    });
  }

  ProductSicaAll(){
   
  }

  ProductCardAll(){
    
  }

  ///end get all product///

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
