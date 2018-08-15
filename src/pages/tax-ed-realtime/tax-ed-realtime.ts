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
 
  }

  getDashboardItemsByDate(month){
    this.webapi.getData('TaxRealtimeFreezone?month='+month).then((data)=>{
      this.responseData = data;
    });
  }

  showfullmsg(textmsg){
    let alert = this.alertCtrl.create({
      title: textmsg
    });
    alert.present();
  }

}
