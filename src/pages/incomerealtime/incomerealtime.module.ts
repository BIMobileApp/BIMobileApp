import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IncomerealtimePage } from './incomerealtime';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    IncomerealtimePage,
  ],
  imports: [
    IonicPageModule.forChild(IncomerealtimePage),
    DirectivesModule,
  ],
})
export class IncomerealtimePageModule {}
