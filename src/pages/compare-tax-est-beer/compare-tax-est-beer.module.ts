import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompareTaxEstBeerPage } from './compare-tax-est-beer';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    CompareTaxEstBeerPage,
  ],
  imports: [
    IonicPageModule.forChild(CompareTaxEstBeerPage),
    DirectivesModule,
  ],
})
export class CompareTaxEstBeerPageModule {}
