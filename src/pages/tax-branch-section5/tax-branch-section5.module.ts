import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaxBranchSection5Page } from './tax-branch-section5';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    TaxBranchSection5Page,
  ],
  imports: [
    IonicPageModule.forChild(TaxBranchSection5Page),
    DirectivesModule,
  ],
})
export class TaxBranchSection5PageModule {}
