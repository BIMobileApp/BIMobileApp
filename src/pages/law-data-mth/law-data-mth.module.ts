import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LawDataMthPage } from './law-data-mth';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    LawDataMthPage,
  ],
  imports: [
    IonicPageModule.forChild(LawDataMthPage),
    DirectivesModule,
  ],
})
export class LawDataMthPageModule {}
