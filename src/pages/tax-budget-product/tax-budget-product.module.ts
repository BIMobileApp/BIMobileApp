import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaxBudgetProductPage } from './tax-budget-product';

@NgModule({
  declarations: [
    TaxBudgetProductPage,
  ],
  imports: [
    IonicPageModule.forChild(TaxBudgetProductPage),
  ],
})
export class TaxBudgetProductPageModule {}
