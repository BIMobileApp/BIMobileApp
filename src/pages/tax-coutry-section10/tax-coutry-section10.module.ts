import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaxCoutrySection10Page } from './tax-coutry-section10';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    TaxCoutrySection10Page,
  ],
  imports: [
    IonicPageModule.forChild(TaxCoutrySection10Page),
    DirectivesModule,
  ],
})
export class TaxCoutrySection10PageModule {}
