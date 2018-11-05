import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompareTaxEstDrinkPage } from './compare-tax-est-drink';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    CompareTaxEstDrinkPage,
  ],
  imports: [
    IonicPageModule.forChild(CompareTaxEstDrinkPage),
    DirectivesModule,
  ],
})
export class CompareTaxEstDrinkPageModule {}
