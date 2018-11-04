import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaxBranchSection6Page } from './tax-branch-section6';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    TaxBranchSection6Page,
  ],
  imports: [
    IonicPageModule.forChild(TaxBranchSection6Page),
    DirectivesModule,
  ],
})
export class TaxBranchSection6PageModule {}
