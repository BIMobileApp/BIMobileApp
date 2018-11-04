import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaxEdRealtimePage } from './tax-ed-realtime';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    TaxEdRealtimePage,
  ],
  imports: [
    IonicPageModule.forChild(TaxEdRealtimePage),
    DirectivesModule,
  ],
})
export class TaxEdRealtimePageModule {}
