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
import { NewReportLineTaxEstProdPage } from '../new-report-line-tax-est-prod/new-report-line-tax-est-prod';
import { NewReportLineFollowProductPage } from '../new-report-line-follow-product/new-report-line-follow-product';
import { ChartPage } from '../chart/chart';
import { CompareTaxEstCarPage } from '../compare-tax-est-car/compare-tax-est-car';
import { CompareTaxEstBeerPage } from '../compare-tax-est-beer/compare-tax-est-beer';
import { CompareTaxEstDrinkPage } from '../compare-tax-est-drink/compare-tax-est-drink';
import { CompareTaxEstAlcoholPage } from '../compare-tax-est-alcohol/compare-tax-est-alcohol';

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
   }

  reportCar27_31(){
    this.app.getRootNav().push(CompareTaxCarPage);  
  }
  reportAlcohol26_30(){
    this.app.getRootNav().push(CompareTaxAlcoholPage);  
  }
  reportBeer28_32(){
    this.app.getRootNav().push(CompareTaxBeerPage);  
  }
  reportDrink29_33(){
    this.app.getRootNav().push(CompareTaxDrinkPage);  
  }

  reportCar24_3(){
    this.app.getRootNav().push(CompareTaxEstCarPage);  
  }
  reportBeer3(){
    this.app.getRootNav().push(CompareTaxEstBeerPage);  
  }
  reportDrink3(){
    this.app.getRootNav().push(CompareTaxEstDrinkPage);  
  }
  reportAlcohol3(){
    this.app.getRootNav().push(CompareTaxEstAlcoholPage);  
  }
  reportincome(){
    this.app.getRootNav().push(IncomerealtimePage);  
  }
 /* report2(){
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

  report3(){
    this.app.getRootNav().push(NewReportLineFollowProductPage);  
  }

  test(){
    this.app.getRootNav().push(ChartPage);  
  }*/

}
