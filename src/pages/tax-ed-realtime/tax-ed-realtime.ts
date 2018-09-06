import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

declare var dateDisplayAll:any;

@IonicPage()
@Component({
  selector: 'page-tax-ed-realtime',
  templateUrl: 'tax-ed-realtime.html',
})
export class TaxEdRealtimePage {

  responseData:any;
  responseSumData:any;
  responseRegion:any;
  responseProvince:any;
  month:any;
  textmsg: any;
  offcode:any;
  username:any;
  dateDisplay = "";
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public webapi:RestProvider,
    public alertCtrl: AlertController) {
    this.offcode = localStorage.offcode;
    this.username = localStorage.userData;
    this.dateDisplay = localStorage.last_update_date;
  }

  ionViewDidLoad() {
      let Region = 'undefined';
      let Province = 'undefined';

      this.getData(Region,Province);
      this.selectionAreaAll();
  }

  selectionAreaAll(){
    this.webapi.getData('selectionTaxDailyRegion?offcode='+this.offcode).then((data) => {
      this.responseRegion = data;
     this.selectionProvinceFill(data[0].REGION_NAME);
    });
  }

  selectionProvinceFill(area){
    this.webapi.getData('selectionTaxDailyProvince?offcode='+this.offcode+'&area='+area).then((data) => {
      this.responseProvince = data;
    });  
  }

  selectRegion(Region,Province){
    Province = [];

    this.selectionProvinceFill(Region);
   this.getData(Region,Province);
  }

  selectionProvince(Region,Province){
    this.getData(Region,Province);
  }

  getData(Region,Province){ 
     this.webapi.getData('FollowPayTaxRealtimeAll?offcode='+this. offcode+'&region='+Region+'&province='+Province).then((data)=>{
       this.responseData = data;

       this.getTableFZ_EXCISE();
       this.getTableIN_EXCISE();
       this.getTableEXCISE();
       this.getDateFormat();
       this.sumtax(Region,Province);
     });
   }  

   sumtax(Region,Province){
    this.webapi.getData('SumFollowPayTaxRealtime?offcode='+this. offcode+'&region='+Region+'&province='+Province).then((data)=>{
      this.responseSumData = data;
        
      this.getSumTableFZ_EXCISE();
      this.getSumTableIN_EXCISE();
      this.getSumTableEXCISE();
    });
  }

   getTableFZ_EXCISE() {
     let val;
     for (var i = 0; i < this.responseData.length; i++) {
       val = this.responseData[i].FZ_EXCISE_AMT/1000000;
       val = val.toFixed(2);
       val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
       this.responseData[i].FZ_EXCISE_AMT = val;
     }
   }

   getTableIN_EXCISE() {
     let val;
     for (var i = 0; i < this.responseData.length; i++) {
       val = this.responseData[i].IN_EXCISE_AMT/1000000;
       val = val.toFixed(2);
       val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
       this.responseData[i].IN_EXCISE_AMT = val;
     }
   }
   
   getTableEXCISE() {
     let val;
     for (var i = 0; i < this.responseData.length; i++) {
       val = this.responseData[i].EXCISE_AMT/1000000;
       val = val.toFixed(2);
       val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
       this.responseData[i].EXCISE_AMT = val;
     }
   }

   getDateFormat(){
     let val;
     let date;
     let month;
     let year;
     for (var i = 0; i < this.responseData.length; i++) {
       val = this.responseData[i].DIM_DATA_DATE_ID.toString();
       year = val.substring(0,4);
       month = val.substring(6,4);
       date = val.substring(6,8);
       val = date+'/'+month+'/'+year;
 
       this.responseData[i].DIM_DATA_DATE_ID = val;
     }
   }

   ///get sum

   getSumTableFZ_EXCISE() {
    let val;
    for (var i = 0; i < this.responseSumData.length; i++) {
      val = this.responseSumData[i].FZ_EXCISE_AMT/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseSumData[i].FZ_EXCISE_AMT = val;
    }
  }

  getSumTableIN_EXCISE() {
    let val;
    for (var i = 0; i < this.responseSumData.length; i++) {
      val = this.responseSumData[i].IN_EXCISE_AMT/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseSumData[i].IN_EXCISE_AMT = val;
    }
  }
  
  getSumTableEXCISE() {
    let val;
    for (var i = 0; i < this.responseSumData.length; i++) {
      val = this.responseSumData[i].EXCISE_AMT/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseSumData[i].EXCISE_AMT = val;
    }
  }

}
