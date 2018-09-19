import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
declare var changeCurrency: any;
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
  oldArea: any;
  oldtypeCur: any;
  Province: any;
  

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public webapi:RestProvider) {
      this.offcode = localStorage.offcode;
      this.dateDisplay = localStorage.last_update_date;
      this.dateAsOff =  dateDisplayAll;
      this.username = localStorage.userData;
      
  }

  ionViewDidLoad() {
    let typeCur = 'B';
    this.webapi.getData('IncDataMarketList?offcode='+this.offcode).then((data)=>{
      this.responseData = data;
      this.getDataAmt(typeCur);
      this.SumData(typeCur);
    });
  }

  SumData(typeCur){
    this.webapi.getData('IncSumDataMarketList?offcode='+this.offcode).then((data)=>{
      this.responseSumData = data;
      this.getSumDataAmt(typeCur);
    });
  }
  
  ChangeCurrency(typeCur){
    this.webapi.getData('IncDataMarketList?offcode='+this.offcode).then((data)=>{
      this.responseData = data;
      this.getDataAmt(typeCur);
      this.SumData(typeCur);
    });
  }

  getDataAmt(typeCur) {
    let sura;
    let top;
    let card;
    let total;
    let reg;
    for (var i = 0; i < this.responseData.length; i++) {
      sura = this.responseData[i].NUM_OF_LIC_SURA;
      if (sura != null) { sura = changeCurrency(sura, typeCur); }
      this.responseData[i].NUM_OF_LIC_SURA = sura;

      top = this.responseData[i].NUM_OF_LIC_TOBBACO;
      if (top != null) { top = changeCurrency(top, typeCur); }
      this.responseData[i].NUM_OF_LIC_TOBBACO = top;

      card = this.responseData[i].NUM_OF_LIC_CARD;
      if (card != null) { card = changeCurrency(card, typeCur); }
      this.responseData[i].NUM_OF_LIC_CARD = card;

      total = this.responseData[i].TOTAL_LIC;
      if (total != null) { total = changeCurrency(total, typeCur); }
      this.responseData[i].TOTAL_LIC = total;

      reg = this.responseData[i].COUNT_REG;
      if (reg != null) { reg = changeCurrency(reg, typeCur); }
      this.responseData[i].COUNT_REG = reg;
    }
  }

  //sum
  getSumDataAmt(typeCur) {
    let sura;
    let top;
    let card;
    let total;
    let reg;
    for (var i = 0; i < this.responseSumData.length; i++) {
      sura = this.responseSumData[i].NUM_OF_LIC_SURA;
      if (sura != null) { sura = changeCurrency(sura, typeCur); }
      this.responseSumData[i].NUM_OF_LIC_SURA = sura;

      top = this.responseSumData[i].NUM_OF_LIC_TOBBACO;
      if (top != null) { top = changeCurrency(top, typeCur); }
      this.responseSumData[i].NUM_OF_LIC_TOBBACO = top;

      card = this.responseSumData[i].NUM_OF_LIC_CARD;
      if (card != null) { card = changeCurrency(card, typeCur); }
      this.responseSumData[i].NUM_OF_LIC_CARD = card;

      total = this.responseSumData[i].TOTAL_LIC;
      if (total != null) { total = changeCurrency(total, typeCur); }
      this.responseSumData[i].TOTAL_LIC = total;

      reg = this.responseSumData[i].COUNT_REG;
      if (reg != null) { reg = changeCurrency(reg, typeCur); }
      this.responseSumData[i].COUNT_REG = reg;
    }
  }

}
