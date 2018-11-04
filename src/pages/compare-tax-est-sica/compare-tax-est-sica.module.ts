import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompareTaxEstSicaPage } from './compare-tax-est-sica';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    CompareTaxEstSicaPage,
  ],
  imports: [
    IonicPageModule.forChild(CompareTaxEstSicaPage),
    DirectivesModule,
  ],
})
export class CompareTaxEstSicaPageModule {}
