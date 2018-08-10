import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaxAllCountryPage } from './tax-all-country';

@NgModule({
  declarations: [
    TaxAllCountryPage,
  ],
  imports: [
    IonicPageModule.forChild(TaxAllCountryPage),
  ],
})
export class TaxAllCountryPageModule {}
