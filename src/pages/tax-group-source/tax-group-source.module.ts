import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaxGroupSourcePage } from './tax-group-source';

@NgModule({
  declarations: [
    TaxGroupSourcePage,
  ],
  imports: [
    IonicPageModule.forChild(TaxGroupSourcePage),
  ],
})
export class TaxGroupSourcePageModule {}
