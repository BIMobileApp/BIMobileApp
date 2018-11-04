import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompareTaxEstCarPage } from './compare-tax-est-car';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    CompareTaxEstCarPage,
  ],
  imports: [
    IonicPageModule.forChild(CompareTaxEstCarPage),
    DirectivesModule,
  ],
})
export class CompareTaxEstCarPageModule {}
