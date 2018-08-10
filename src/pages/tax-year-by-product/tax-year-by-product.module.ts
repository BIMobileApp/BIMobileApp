import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaxYearByProductPage } from './tax-year-by-product';

@NgModule({
  declarations: [
    TaxYearByProductPage,
  ],
  imports: [
    IonicPageModule.forChild(TaxYearByProductPage),
  ],
})
export class TaxYearByProductPageModule {}
