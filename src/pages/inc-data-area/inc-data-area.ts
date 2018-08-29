import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-inc-data-area',
  templateUrl: 'inc-data-area.html',
})
export class IncDataAreaPage {

  offcode: any;
  responseData: any;
  responseArea: any;
  responseProvince: any;
  responseGroupName: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public webapi:RestProvider) {
      this.offcode = localStorage.offcode;
  }

  ionViewDidLoad() {
    this.selectionArea();
    //this.selectionProvince();
   // this.selectionGeoupName();
  }

  selectionArea(){
    this.webapi.getData('SelectionArea?offcode='+this.offcode).then((data) => {
      this.responseArea = data;

      console.log( this.responseArea);
    });
  }

 /* selectionProvince(){
    this.webapi.getData('SelectionProvince?offcode='+this.offcode).then((data) => {
      this.responseProvince = data;
      console.log( this.responseProvince);
    });
  }

  selectionGeoupName(){
    this.webapi.getData('SelectionGroupName?offcode='+this.offcode).then((data) => {
      this.responseGroupName = data;
      console.log( this.responseGroupName);
      //this.loadData(area,province,group_name);
    });
  }*/

  getitemArea(area){

    this.webapi.getData('SelectionProvince?offcode='+this.offcode).then((data) => {
      this.responseProvince = data;
      console.log( this.responseProvince);
    });
  }

  getitemsProvince(province){
    this.webapi.getData('SelectionGroupName?offcode='+this.offcode).then((data) => {
      this.responseGroupName = data;
      console.log( this.responseGroupName);
    });
  }

  getitemsGroupName(group_name){

  }

  /*loadData(area,province,group_name){

    this.webapi.getData('LawReportArea?offcode='+this.offcode).then((data)=>{
      this.responseData = data;
      this.getNumSURA();
      this.getNumTOBBACO();
      this.getNumCARD();
      this.getAmtSURA();
      this.getAmtTOBBACO();
      this.getAmtCARD();   
    });

  }*/

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
