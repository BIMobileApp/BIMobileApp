import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaxBudgetRegPage } from './tax-budget-reg';

@NgModule({
  declarations: [
    TaxBudgetRegPage,
  ],
  imports: [
    IonicPageModule.forChild(TaxBudgetRegPage),
  ],
})
export class TaxBudgetRegPageModule {}
