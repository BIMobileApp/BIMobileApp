import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App } from 'ionic-angular';
import { TaxbudgetyearPage } from '../taxbudgetyear/taxbudgetyear';

@IonicPage()
@Component({
  selector: 'page-cetegory-tax',
  templateUrl: 'cetegory-tax.html',
})
export class CetegoryTaxPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public app:App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CetegoryTaxPage');
  }

  TaxThisyearTable(){
    this.app.getRootNav().push(TaxbudgetyearPage); 
  }

}
