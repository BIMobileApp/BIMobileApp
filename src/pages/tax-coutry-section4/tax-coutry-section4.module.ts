import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaxCoutrySection4Page } from './tax-coutry-section4';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    TaxCoutrySection4Page,
  ],
  imports: [
    IonicPageModule.forChild(TaxCoutrySection4Page),
    DirectivesModule,
  ],
})
export class TaxCoutrySection4PageModule {}
