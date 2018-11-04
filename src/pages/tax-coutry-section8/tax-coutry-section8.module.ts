import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaxCoutrySection8Page } from './tax-coutry-section8';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    TaxCoutrySection8Page,
  ],
  imports: [
    IonicPageModule.forChild(TaxCoutrySection8Page),
    DirectivesModule,
  ],
})
export class TaxCoutrySection8PageModule {}
