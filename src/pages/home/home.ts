import { Component } from '@angular/core';
import { NavController ,App} from 'ionic-angular';
import { ChartPage } from '../chart/chart';
import { RestProvider } from '../../providers/rest/rest';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  itemCount:number = 10;
  ProductPrice:number;
  ShowPrice:number;

  constructor(public navCtrl: NavController,
    public app:App,
    public restProvider: RestProvider) {

  }

  ionViewDidLoad() {
  
  }

  GotoChart(){
    this.app.getRootNav().push(ChartPage);  
  }
  /*showPrice(){
    this.ShowPrice = this.ProductPrice;
  }*/
}
