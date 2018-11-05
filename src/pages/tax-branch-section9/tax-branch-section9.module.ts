import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaxBranchSection9Page } from './tax-branch-section9';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    TaxBranchSection9Page,
  ],
  imports: [
    IonicPageModule.forChild(TaxBranchSection9Page),
    DirectivesModule,
  ],
})
export class TaxBranchSection9PageModule {}
