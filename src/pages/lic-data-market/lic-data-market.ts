import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

declare var dateDisplayAll:any;

@IonicPage()
@Component({
  selector: 'page-lic-data-market',
  templateUrl: 'lic-data-market.html',
})
export class LicDataMarketPage {

  responseData:any;
  responseSumData:any;
  offcode:any;
  dateDisplay:any;
  dateAsOff:any;
  username:any;
  

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public webapi:RestProvider) {
      this.offcode = localStorage.offcode;
      this.dateDisplay = localStorage.last_update_date;
      this.dateAsOff =  dateDisplayAll;
      this.username = localStorage.userData;
  }

  ionViewDidLoad() {
    this.webapi.getData('IncDataMarketList?offcode='+this.offcode).then((data)=>{
      this.responseData = data;
      this.getRegCount();
      this.getLicSura();
      this.getLicTobbaco();
      this.getLicCard();
      this.getTotal();
      this.SumData();
    });
  }

  SumData(){
    this.webapi.getData('IncSumDataMarketList?offcode='+this.offcode).then((data)=>{
      this.responseSumData = data;
      this.getSumRegCount();
      this.getSumLicSura();
      this.getSumLicTobbaco();
      this.getSumLicCard();
      this.getSumTotal();
    });
  }

  getRegCount() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].COUNT_REG;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].COUNT_REG = val;
    }
  }

  getLicSura() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].NUM_OF_LIC_SURA;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].NUM_OF_LIC_SURA = val;
    }
  }

  getLicTobbaco() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].NUM_OF_LIC_TOBBACO;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].NUM_OF_LIC_TOBBACO = val;
    }
  }

  getLicCard() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].NUM_OF_LIC_CARD;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].NUM_OF_LIC_CARD = val;
    }
  }

  getTotal() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].TOTAL_LIC;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].TOTAL_LIC = val;
    }
  }

  //sum
  getSumRegCount() {
    let val;
    for (var i = 0; i < this.responseSumData.length; i++) {
      val = this.responseSumData[i].COUNT_REG;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseSumData[i].COUNT_REG = val;
    }
  }

  getSumLicSura() {
    let val;
    for (var i = 0; i < this.responseSumData.length; i++) {
      val = this.responseSumData[i].NUM_OF_LIC_SURA;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseSumData[i].NUM_OF_LIC_SURA = val;
    }
  }

  getSumLicTobbaco() {
    let val;
    for (var i = 0; i < this.responseSumData.length; i++) {
      val = this.responseSumData[i].NUM_OF_LIC_TOBBACO;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseSumData[i].NUM_OF_LIC_TOBBACO = val;
    }
  }

  getSumLicCard() {
    let val;
    for (var i = 0; i < this.responseSumData.length; i++) {
      val = this.responseSumData[i].NUM_OF_LIC_CARD;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseSumData[i].NUM_OF_LIC_CARD = val;
    }
  }

  getSumTotal() {
    let val;
    for (var i = 0; i < this.responseSumData.length; i++) {
      val = this.responseSumData[i].TOTAL_LIC;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseSumData[i].TOTAL_LIC = val;
    }
  }

}
