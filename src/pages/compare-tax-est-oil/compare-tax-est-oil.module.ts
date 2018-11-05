import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompareTaxEstOilPage } from './compare-tax-est-oil';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    CompareTaxEstOilPage,
  ],
  imports: [
    IonicPageModule.forChild(CompareTaxEstOilPage),
    DirectivesModule,
  ],
})
export class CompareTaxEstOilPageModule {}
