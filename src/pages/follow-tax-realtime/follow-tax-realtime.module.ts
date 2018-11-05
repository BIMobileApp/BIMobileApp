import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FollowTaxRealtimePage } from './follow-tax-realtime';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    FollowTaxRealtimePage,
  ],
  imports: [
    IonicPageModule.forChild(FollowTaxRealtimePage),
    DirectivesModule,
  ],
})
export class FollowTaxRealtimePageModule {}
