import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaxBudgetRegByMthPage } from './tax-budget-reg-by-mth';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    TaxBudgetRegByMthPage,
  ],
  imports: [
    IonicPageModule.forChild(TaxBudgetRegByMthPage),
    DirectivesModule,
  ],
})
export class TaxBudgetRegByMthPageModule {}
