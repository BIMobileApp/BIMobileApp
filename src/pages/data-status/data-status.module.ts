import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DataStatusPage } from './data-status';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    DataStatusPage,
  ],
  imports: [
    IonicPageModule.forChild(DataStatusPage),
    DirectivesModule,
  ],
})
export class DataStatusPageModule {}
