import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LicDataMarketPage } from './lic-data-market';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    LicDataMarketPage,
  ],
  imports: [
    IonicPageModule.forChild(LicDataMarketPage),
    DirectivesModule,
  ],
})
export class LicDataMarketPageModule {}
