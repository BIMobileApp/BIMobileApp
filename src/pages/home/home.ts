import { Component } from '@angular/core';
import { NavController ,App} from 'ionic-angular';
import { ChartPage } from '../chart/chart';
import { RestProvider } from '../../providers/rest/rest';
import { FollowTaxMthPage } from '../follow-tax-mth/follow-tax-mth';
import { Test2Page } from '../test2/test2';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  itemCount:number = 10; //number
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

  GotoFax(){
    this.app.getRootNav().push(FollowTaxMthPage);  
  }
  
 //Test2 ของดาว
  GotoTest2(){
     this.app.getRootNav().push(Test2Page);  
  }
  /*showPrice(){
    this.ShowPrice = this.ProductPrice;
  }*/
}
