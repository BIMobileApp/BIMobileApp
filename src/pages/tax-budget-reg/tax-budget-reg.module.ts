import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaxBudgetRegPage } from './tax-budget-reg';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    TaxBudgetRegPage,
  ],
  imports: [
    IonicPageModule.forChild(TaxBudgetRegPage),
    DirectivesModule,
  ],
})
export class TaxBudgetRegPageModule {}
