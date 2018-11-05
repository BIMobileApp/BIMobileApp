import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaxProductByMthPage } from './tax-product-by-mth';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    TaxProductByMthPage,
  ],
  imports: [
    IonicPageModule.forChild(TaxProductByMthPage),
    DirectivesModule,
  ],
})
export class TaxProductByMthPageModule {}
