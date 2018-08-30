import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

declare var dateDisplayAll:any;

@IonicPage()
@Component({
  selector: 'page-inc-data-mth',
  templateUrl: 'inc-data-mth.html',
})
export class IncDataMthPage {

  offcode: any;
  responseData: any;
  responseArea: any;
  responseProvince: any;
  responseGroupName: any;
  repondProduct:any;
  dateDisplay:any;
  dateAsOff:any;

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
    this.selectionProvince();
    this.selectionGeoupName(); 
    this.IncProductAll();
  }

  loadData(){
    this.webapi.getData('IncDataMonth?offcode='+this.offcode).then((data)=>{
      this.responseData = data;
      this.getNumSURA();
      this.getNumTOBBACO();
      this.getNumCARD();
      this.getAmtSURA();
      this.getAmtTOBBACO();
      this.getAmtCARD();
    });
  }

  selectionArea(){
    this.webapi.getData('SelectionMthArea?offcode='+this.offcode).then((data) => {
      this.responseArea = data;
    });
  }

 selectionProvince(){
    this.webapi.getData('SelectionMthProvince?offcode='+this.offcode).then((data) => {
      this.responseProvince = data;
    });
  }

  selectionGeoupName(){
    this.webapi.getData('SelectionMthGroupName?offcode='+this.offcode).then((data) => {
      this.responseGroupName = data;
    });
  }

  IncProductAll(){
    this.webapi.getData('IncProductByMthAll?offcode='+this.offcode).then((data) => {
      this.repondProduct = data;
      this.loadData();
      this.getAmt();
      this.getCount();
    });
  }

  getitemsGroupName(area,province,group_name,month){
      this.webapi.getData('IncProductByMth?offcode='+this.offcode+'&region='+area+'&province='+province+'&group_desc='+group_name+'&mth='+month ).then((data) => {
      this.repondProduct = data;
      this.loadData();
      this.getAmt();
      this.getCount();
    });

  }

  getitemsRegion(area,province,group_name,month){
    this.webapi.getData('IncProductByMth?offcode='+this.offcode+'&region='+area+'&province='+province+'&group_desc='+group_name+'&mth='+month ).then((data) => {
      this.repondProduct = data;
      this.loadData();
      this.getAmt();
      this.getCount();
    });
  }

  getitemsProvince(area,province,group_name,month){
    this.webapi.getData('IncProductByMth?offcode='+this.offcode+'&region='+area+'&province='+province+'&group_desc='+group_name+'&mth='+month ).then((data) => {
      this.repondProduct = data;
      this.loadData();
      this.getAmt();
      this.getCount();
    });
  }

  getitemMonth(area,province,group_name,month){
    this.webapi.getData('IncProductByMth?offcode='+this.offcode+'&region='+area+'&province='+province+'&group_desc='+group_name+'&mth='+month ).then((data) => {
      this.repondProduct = data;
      this.loadData();
      this.getAmt();
      this.getCount();
    });
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
