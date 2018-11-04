import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IncDataAreaPage } from './inc-data-area';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    IncDataAreaPage,
  ],
  imports: [
    IonicPageModule.forChild(IncDataAreaPage),
    DirectivesModule,
  ],
})
export class IncDataAreaPageModule {}
