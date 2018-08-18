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
import { NewReportGaugeTaxCarPage } from '../new-report-gauge-tax-car/new-report-gauge-tax-car';
import { NewReportGaugeQuantityCarPage } from '../new-report-gauge-quantity-car/new-report-gauge-quantity-car';
import { NewReportGaugeTaxAlcoholPage } from '../new-report-gauge-tax-alcohol/new-report-gauge-tax-alcohol';
import { NewReportGaugeQuantityAlcoholPage } from '../new-report-gauge-quantity-alcohol/new-report-gauge-quantity-alcohol';
import { NewReportGaugeTaxBeerPage } from '../new-report-gauge-tax-beer/new-report-gauge-tax-beer';
import { NewReportGaugeQuantityBeerPage } from '../new-report-gauge-quantity-beer/new-report-gauge-quantity-beer';
import { NewReportGaugeTaxDrinkPage } from '../new-report-gauge-tax-drink/new-report-gauge-tax-drink';
import { NewReportGaugeQuantityDrinkPage } from '../new-report-gauge-quantity-drink/new-report-gauge-quantity-drink';

@IonicPage()
@Component({
  selector: 'page-menu-group-new-report',
  templateUrl: 'menu-group-new-report.html',
})
export class MenuGroupNewReportPage {

  offcode:any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public app:App) {
  }
   ionViewDidLoad() { 
    this.UserAthu();
   }

   UserAthu() {
    this.offcode = localStorage.offcode;
    this.offcode = this.offcode.substring(0, 2);
    console.log(this.offcode);
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

  reportCar3(){
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
  reportGaugeTaxCar(){
    this.app.getRootNav().push(NewReportGaugeTaxCarPage);  
  }
  reportGaugeQuanCar(){
    this.app.getRootNav().push(NewReportGaugeQuantityCarPage);  
  }
  reportGaugeTaxAol(){
    this.app.getRootNav().push(NewReportGaugeTaxAlcoholPage);  
  }
  reportGaugeQuanAol(){
    this.app.getRootNav().push(NewReportGaugeQuantityAlcoholPage);
  }
  reportGaugeTaxBeer(){
    this.app.getRootNav().push(NewReportGaugeTaxBeerPage);
  }
  reportGaugeQuanBeer(){
    this.app.getRootNav().push(NewReportGaugeQuantityBeerPage);
  }
  reportGaugeTaxDrink(){
    this.app.getRootNav().push(NewReportGaugeTaxDrinkPage);
  }
  reportGaugeQuanDrink(){
    this.app.getRootNav().push(NewReportGaugeQuantityDrinkPage);
  }

}
