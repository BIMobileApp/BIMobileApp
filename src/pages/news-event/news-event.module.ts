import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewsEventPage } from './news-event';

@NgModule({
  declarations: [
    NewsEventPage,
  ],
  imports: [
    IonicPageModule.forChild(NewsEventPage),
  ],
})
export class NewsEventPageModule {}
