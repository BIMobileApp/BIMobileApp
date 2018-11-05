import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaxCoutrySection2Page } from './tax-coutry-section2';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    TaxCoutrySection2Page,
  ],
  imports: [
    IonicPageModule.forChild(TaxCoutrySection2Page),
    DirectivesModule,
  ],
})
export class TaxCoutrySection2PageModule {}
