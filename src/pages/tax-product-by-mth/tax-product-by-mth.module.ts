import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaxProductByMthPage } from './tax-product-by-mth';

@NgModule({
  declarations: [
    TaxProductByMthPage,
  ],
  imports: [
    IonicPageModule.forChild(TaxProductByMthPage),
  ],
})
export class TaxProductByMthPageModule {}
