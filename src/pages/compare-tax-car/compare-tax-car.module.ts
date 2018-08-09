import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompareTaxCarPage } from './compare-tax-car';

@NgModule({
  declarations: [
    CompareTaxCarPage,
  ],
  imports: [
    IonicPageModule.forChild(CompareTaxCarPage),
  ],
})
export class CompareTaxCarPageModule {}
