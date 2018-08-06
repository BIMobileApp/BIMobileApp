import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GaugechartPage } from './gaugechart';

@NgModule({
  declarations: [
    GaugechartPage,
  ],
  imports: [
    IonicPageModule.forChild(GaugechartPage),
  ],
})
export class GaugechartPageModule {}
