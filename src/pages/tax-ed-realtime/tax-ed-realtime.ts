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
  offcode:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public webapi:RestProvider,
    public alertCtrl: AlertController) {
      this.offcode = localStorage.offcode;
  }

  ionViewDidLoad() {
      this.geDataAll();
  }

  geDataAll(){
   
     this.webapi.getData('FollowPayTaxRealtimeAll?offcode='+this. offcode).then((data)=>{
       this.responseData = data;
       this.getTableFZ_EXCISE();
       this.getTableIN_EXCISE();
       this.getTableEXCISE();
       this.getDateFormat();
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

}
