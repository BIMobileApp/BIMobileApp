import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaxBranchSection7Page } from './tax-branch-section7';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    TaxBranchSection7Page,
  ],
  imports: [
    IonicPageModule.forChild(TaxBranchSection7Page),
    DirectivesModule,
  ],
})
export class TaxBranchSection7PageModule {}
