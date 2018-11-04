import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaxBranchSection8Page } from './tax-branch-section8';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    TaxBranchSection8Page,
  ],
  imports: [
    IonicPageModule.forChild(TaxBranchSection8Page),
    DirectivesModule,
  ],
})
export class TaxBranchSection8PageModule {}
