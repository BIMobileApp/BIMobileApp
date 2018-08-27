import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LowDataAreaPage } from './low-data-area';

@NgModule({
  declarations: [
    LowDataAreaPage,
  ],
  imports: [
    IonicPageModule.forChild(LowDataAreaPage),
  ],
})
export class LowDataAreaPageModule {}
