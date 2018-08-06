import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuGroupPage } from './menu-group';

@NgModule({
  declarations: [
    MenuGroupPage,
  ],
  imports: [
    IonicPageModule.forChild(MenuGroupPage),
  ],
})
export class MenuGroupPageModule {}
