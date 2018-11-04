import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaxBranchSection2Page } from './tax-branch-section2';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    TaxBranchSection2Page,
  ],
  imports: [
    IonicPageModule.forChild(TaxBranchSection2Page),
    DirectivesModule,
  ],
})
export class TaxBranchSection2PageModule {}
