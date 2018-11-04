import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaxBranchSection3Page } from './tax-branch-section3';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    TaxBranchSection3Page,
  ],
  imports: [
    IonicPageModule.forChild(TaxBranchSection3Page),
    DirectivesModule,
  ],
})
export class TaxBranchSection3PageModule {}
