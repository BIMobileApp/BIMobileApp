import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-taxbudgetyear',
  templateUrl: 'taxbudgetyear.html',
})
export class TaxbudgetyearPage {
 
  responseData: any;
  constructor(public navCtrl: NavController,
                      public navParams: NavParams,
                      public webapi:RestProvider) {
  }

  ionViewDidLoad() {
    /*this.webapi.getData('TaxBudgetYear').then((data)=>{
      this.responseData = data;
    });*/
  }
}
