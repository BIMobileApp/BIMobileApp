import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaxCoutrySection7Page } from './tax-coutry-section7';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    TaxCoutrySection7Page,
  ],
  imports: [
    IonicPageModule.forChild(TaxCoutrySection7Page),
    DirectivesModule,
  ],
})
export class TaxCoutrySection7PageModule {}
