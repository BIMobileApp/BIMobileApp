import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IncDataMthPage } from './inc-data-mth';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    IncDataMthPage,
  ],
  imports: [
    IonicPageModule.forChild(IncDataMthPage),
    DirectivesModule,
  ],
})
export class IncDataMthPageModule {}
