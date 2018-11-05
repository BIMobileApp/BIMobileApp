import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaxCoutrySection5Page } from './tax-coutry-section5';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    TaxCoutrySection5Page,
  ],
  imports: [
    IonicPageModule.forChild(TaxCoutrySection5Page),
    DirectivesModule,
  ],
})
export class TaxCoutrySection5PageModule {}
