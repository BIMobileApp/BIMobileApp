import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DataStatusPage } from './data-status';

@NgModule({
  declarations: [
    DataStatusPage,
  ],
  imports: [
    IonicPageModule.forChild(DataStatusPage),
  ],
})
export class DataStatusPageModule {}
