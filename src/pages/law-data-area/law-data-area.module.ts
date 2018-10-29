import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LawDataAreaPage } from './law-data-area';

@NgModule({
  declarations: [
    LawDataAreaPage,
  ],
  imports: [
    IonicPageModule.forChild(LawDataAreaPage),
  ],
})
export class LawDataAreaPageModule {}
