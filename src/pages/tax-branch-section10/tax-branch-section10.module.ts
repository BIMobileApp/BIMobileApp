import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaxBranchSection10Page } from './tax-branch-section10';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    TaxBranchSection10Page,
  ],
  imports: [
    IonicPageModule.forChild(TaxBranchSection10Page),
    DirectivesModule,
  ],
})
export class TaxBranchSection10PageModule {}
