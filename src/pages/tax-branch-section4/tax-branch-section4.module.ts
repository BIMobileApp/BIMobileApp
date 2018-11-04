import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaxBranchSection4Page } from './tax-branch-section4';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    TaxBranchSection4Page,
  ],
  imports: [
    IonicPageModule.forChild(TaxBranchSection4Page),
    DirectivesModule,
  ],
})
export class TaxBranchSection4PageModule {}
