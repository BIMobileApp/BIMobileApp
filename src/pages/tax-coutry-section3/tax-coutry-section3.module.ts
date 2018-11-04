import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaxCoutrySection3Page } from './tax-coutry-section3';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    TaxCoutrySection3Page,
  ],
  imports: [
    IonicPageModule.forChild(TaxCoutrySection3Page),
    DirectivesModule,
  ],
})
export class TaxCoutrySection3PageModule {}
