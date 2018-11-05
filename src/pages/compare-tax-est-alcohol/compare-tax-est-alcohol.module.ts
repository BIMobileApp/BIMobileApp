import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompareTaxEstAlcoholPage } from './compare-tax-est-alcohol';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    CompareTaxEstAlcoholPage,
  ],
  imports: [
    IonicPageModule.forChild(CompareTaxEstAlcoholPage),
    DirectivesModule,
  ],
})
export class CompareTaxEstAlcoholPageModule {}
