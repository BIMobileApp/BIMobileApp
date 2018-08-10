import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App } from 'ionic-angular';
import { TaxBudgetRegByMthPage } from '../tax-budget-reg-by-mth/tax-budget-reg-by-mth';
import { TaxBudgetRegPage } from '../tax-budget-reg/tax-budget-reg';
import { TaxbudgetyearPage } from '../taxbudgetyear/taxbudgetyear';
import { TaxBudgetProductPage } from '../tax-budget-product/tax-budget-product';
import { IncomerealtimePage } from '../incomerealtime/incomerealtime';

@IonicPage()
@Component({
  selector: 'page-category-department-list',
  templateUrl: 'category-department-list.html',
})
export class CategoryDepartmentListPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public app:App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryDepartmentListPage');
  }

  TaxThisYearTable(){
    this.app.getRootNav().push(TaxbudgetyearPage); 
  }

  TaxRegTable(){
    this.app.getRootNav().push(TaxBudgetRegPage); 
  }

  TaxTopMthTable(){
    this.app.getRootNav().push(TaxBudgetRegByMthPage); 
  }

  TaxCompareProductTable(){
    this.app.getRootNav().push(TaxBudgetProductPage); 
  }

  IncomeRealTimeTable(){
    this.app.getRootNav().push(IncomerealtimePage); 
  }

}
