import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MblRegisterPage } from './mbl-register';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    MblRegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(MblRegisterPage),
    DirectivesModule,
  ],
})
export class MblRegisterPageModule {}
