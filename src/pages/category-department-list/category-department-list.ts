import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App } from 'ionic-angular';
import { TaxBudgetRegByMthPage } from '../tax-budget-reg-by-mth/tax-budget-reg-by-mth';
import { TaxBudgetRegPage } from '../tax-budget-reg/tax-budget-reg';
import { TaxbudgetyearPage } from '../taxbudgetyear/taxbudgetyear';
import { TaxBudgetProductPage } from '../tax-budget-product/tax-budget-product';
import { IncomerealtimePage } from '../incomerealtime/incomerealtime';
import { TaxYearByProductPage } from '../tax-year-by-product/tax-year-by-product';
import { TaxGroupSourcePage } from '../tax-group-source/tax-group-source';
import { FollowTaxRealtimePage } from '../follow-tax-realtime/follow-tax-realtime';
import { TaxEdRealtimePage } from '../tax-ed-realtime/tax-ed-realtime';
import { TaxgroupMonthlyFreezonePage } from '../taxgroup-monthly-freezone/taxgroup-monthly-freezone';
import { NewReportLineFollowProductPage } from '../new-report-line-follow-product/new-report-line-follow-product';
import { MblRegisterPage } from '../mbl-register/mbl-register';

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
  }

  TaxThisYearTable(){
    this.app.getRootNav().push(TaxbudgetyearPage); 
  }

  TaxTopRegTable(grp_id){
    this.app.getRootNav().push(TaxBudgetRegPage,{group_id:grp_id}); 
  }

  MBLRegisterLink(){
    this.app.getRootNav().push(MblRegisterPage); 
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

  TaxYearByProduct(){
    this.app.getRootNav().push(TaxYearByProductPage); 
  }

  TaxGroupSource(){
    this.app.getRootNav().push(TaxGroupSourcePage); 
  }

  FollowTaxRealtime(){
    this.app.getRootNav().push(FollowTaxRealtimePage); 
  }

  TaxEdRealtime(){
    this.app.getRootNav().push(TaxEdRealtimePage); 
  }

  TaxMonthlyFreezone(){
    this.app.getRootNav().push(TaxgroupMonthlyFreezonePage); 
  }

  TaxAndEstimateProductLine(){
    this.app.getRootNav().push(NewReportLineFollowProductPage); 
  }

}
