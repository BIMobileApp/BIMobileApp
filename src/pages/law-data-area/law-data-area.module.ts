import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LawDataAreaPage } from './law-data-area';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    LawDataAreaPage,
  ],
  imports: [
    IonicPageModule.forChild(LawDataAreaPage),
    DirectivesModule,
  ],
})
export class LawDataAreaPageModule {}
