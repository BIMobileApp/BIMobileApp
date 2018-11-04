import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaxBranchSection1Page } from './tax-branch-section1';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    TaxBranchSection1Page,
  ],
  imports: [
    IonicPageModule.forChild(TaxBranchSection1Page),
    DirectivesModule,
  ],
})
export class TaxBranchSection1PageModule {}
