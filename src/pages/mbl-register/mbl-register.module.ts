import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MblRegisterPage } from './mbl-register';

@NgModule({
  declarations: [
    MblRegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(MblRegisterPage),
  ],
})
export class MblRegisterPageModule {}
