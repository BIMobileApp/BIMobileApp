import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-tax-ed-realtime',
  templateUrl: 'tax-ed-realtime.html',
})
export class TaxEdRealtimePage {

  responseData:any;
  month:any;
  textmsg: any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public webapi:RestProvider,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.getdataAll();
  }

  getdataAll(){
    var d = new Date(); 
    var nt = d.getFullYear()+543;

    this.webapi.getData('TaxRealtimeFreezoneAll?year='+nt).then((data)=>{
      this.responseData = data;
      this.getTableCD_INCOME();
      this.getTableINCOME();
      this.getTableIMPORT();
    });
  }
  
  getDashboardItemsByDate(month){
    var d = new Date(); 
    var nt = d.getFullYear()+543;

    if(month == ""){
      this.getdataAll();
    }
    else{
        this.webapi.getData('TaxRealtimeFreezone?month='+month+'&year='+nt).then((data)=>{
          this.responseData = data;
          this.getTableCD_INCOME();
          this.getTableINCOME();
          this.getTableIMPORT();
        });
   }
  }

  getTableCD_INCOME() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].CD_INCOME/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].CD_INCOME = val;
    }
  }
  getTableINCOME() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].INCOME/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].INCOME = val;
   
    }
  }
  getTableIMPORT() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].IMPORT/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].IMPORT = val;

    }
  }

  showfullmsg(textmsg){
    let alert = this.alertCtrl.create({
      title: textmsg
    });
    alert.present();
  }

}
