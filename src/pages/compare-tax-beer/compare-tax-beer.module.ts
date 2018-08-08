import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompareTaxBeerPage } from './compare-tax-beer';

@NgModule({
  declarations: [
    CompareTaxBeerPage,
  ],
  imports: [
    IonicPageModule.forChild(CompareTaxBeerPage),
  ],
})
export class CompareTaxBeerPageModule {}
