import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaxCoutrySection1Page } from './tax-coutry-section1';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    TaxCoutrySection1Page,
  ],
  imports: [
    IonicPageModule.forChild(TaxCoutrySection1Page),
    DirectivesModule,
  ],
})
export class TaxCoutrySection1PageModule {}
