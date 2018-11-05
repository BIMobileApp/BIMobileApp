import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaxCoutrySection6Page } from './tax-coutry-section6';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    TaxCoutrySection6Page,
  ],
  imports: [
    IonicPageModule.forChild(TaxCoutrySection6Page),
    DirectivesModule,
  ],
})
export class TaxCoutrySection6PageModule {}
