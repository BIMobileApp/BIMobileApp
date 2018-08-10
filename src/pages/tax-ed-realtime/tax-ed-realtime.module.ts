import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaxEdRealtimePage } from './tax-ed-realtime';

@NgModule({
  declarations: [
    TaxEdRealtimePage,
  ],
  imports: [
    IonicPageModule.forChild(TaxEdRealtimePage),
  ],
})
export class TaxEdRealtimePageModule {}
