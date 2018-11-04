import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DimensionTime_03Page } from './dimension-time-03';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    DimensionTime_03Page,
  ],
  imports: [
    IonicPageModule.forChild(DimensionTime_03Page),
    DirectivesModule,
  ],
})
export class DimensionTime_03PageModule {}
