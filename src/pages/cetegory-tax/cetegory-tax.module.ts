import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CetegoryTaxPage } from './cetegory-tax';
import { DirectivesModule } from '../../directives/directives.module';
@NgModule({
  declarations: [
    CetegoryTaxPage,
   
  ],
  imports: [
    IonicPageModule.forChild(CetegoryTaxPage),
    DirectivesModule
  ],
 
})
export class CetegoryTaxPageModule {}
