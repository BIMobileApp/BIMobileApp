import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App } from 'ionic-angular';
import { IncomerealtimePage } from '../incomerealtime/incomerealtime';
import { TaxbudgetyearPage } from '../taxbudgetyear/taxbudgetyear';
import { TaxBudgetProductPage } from '../tax-budget-product/tax-budget-product';
import { TaxBudgetRegPage } from '../tax-budget-reg/tax-budget-reg';
import { TaxBudgetRegByMthPage } from '../tax-budget-reg-by-mth/tax-budget-reg-by-mth';
import { CompareTaxAlcoholPage } from '../compare-tax-alcohol/compare-tax-alcohol';
import { CompareTaxBeerPage } from '../compare-tax-beer/compare-tax-beer';
import { CompareTaxCarPage } from '../compare-tax-car/compare-tax-car';
import { CompareTaxDrinkPage } from '../compare-tax-drink/compare-tax-drink';

@IonicPage()
@Component({
  selector: 'page-menu-group-new-report',
  templateUrl: 'menu-group-new-report.html',
})
export class MenuGroupNewReportPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public app:App) {
  }
   ionViewDidLoad() {
    console.log('ionViewDidLoad MenuGroupNewReportPage');
  }

  reportincome(){
    this.app.getRootNav().push(IncomerealtimePage);  
  }
  report2(){
    this.app.getRootNav().push(TaxbudgetyearPage);  
  }
  report15(){
    this.app.getRootNav().push(TaxBudgetProductPage);  
  }
  report19(){
    this.app.getRootNav().push(TaxBudgetRegPage);  
  }

  report20(){
    this.app.getRootNav().push(TaxBudgetRegByMthPage);  
  }

  report26(){
    this.app.getRootNav().push(CompareTaxAlcoholPage);  
  }

  report27(){
    this.app.getRootNav().push(CompareTaxCarPage);  
  }

  report28(){
    this.app.getRootNav().push(CompareTaxBeerPage);  
  }

  report29(){
    this.app.getRootNav().push(CompareTaxDrinkPage); 
  }

}
