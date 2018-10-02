import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-data-status',
  templateUrl: 'data-status.html',
})
export class DataStatusPage {
  responseData: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public webapi: RestProvider) {
  }

  ionViewDidLoad() {
    this.getTableData();
  }
  getTableData() {
    this.webapi.getData('DataStatus').then((data) => {
      this.responseData = data;
    });

  }
}
