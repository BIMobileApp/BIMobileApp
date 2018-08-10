import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaxMonthlyFreezonePage } from './tax-monthly-freezone';

@NgModule({
  declarations: [
    TaxMonthlyFreezonePage,
  ],
  imports: [
    IonicPageModule.forChild(TaxMonthlyFreezonePage),
  ],
})
export class TaxMonthlyFreezonePageModule {}
