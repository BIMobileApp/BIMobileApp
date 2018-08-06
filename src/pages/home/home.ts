import { Component } from '@angular/core';
import { NavController ,App} from 'ionic-angular';
import { ChartPage } from '../chart/chart';
import { RestProvider } from '../../providers/rest/rest';
import { FollowTaxMthPage } from '../follow-tax-mth/follow-tax-mth';
import { GaugechartPage } from '../gaugechart/gaugechart';
import { DashboardPage } from '../dashboard/dashboard';
import { MenuGroupPage } from '../menu-group/menu-group';

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

  login(){
    this.app.getRootNav().push(MenuGroupPage);  
  }
  /*GotoChart(){
    this.app.getRootNav().push(ChartPage);  
  }

  GotoFax(){
    this.app.getRootNav().push(FollowTaxMthPage);  
  }*/
  /*showPrice(){
    this.ShowPrice = this.ProductPrice;
  }*/

  /*GotoGaugeChart(){
    this.app.getRootNav().push(GaugechartPage);  
  }

  GotoDashboard(){
    this.app.getRootNav().push(DashboardPage);  
  }

  GotoMenuGroup(){
    this.app.getRootNav().push(MenuGroupPage);  
  }*/

}
