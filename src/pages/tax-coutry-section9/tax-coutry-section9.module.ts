import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaxCoutrySection9Page } from './tax-coutry-section9';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    TaxCoutrySection9Page,
  ],
  imports: [
    IonicPageModule.forChild(TaxCoutrySection9Page),
    DirectivesModule,
  ],
})
export class TaxCoutrySection9PageModule {}
