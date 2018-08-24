import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-inc-data-mth',
  templateUrl: 'inc-data-mth.html',
})
export class IncDataMthPage {

  offcode: any;
  responseData: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public webapi:RestProvider) {
      this.offcode = localStorage.offcode;
  }

  ionViewDidLoad() {
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
