import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuGroupPage } from './menu-group';
import { MblRegisterPage } from '../mbl-register/mbl-register';
import { LicDataMarketPage } from '../lic-data-market/lic-data-market';
import { IncDataMthPage } from '../inc-data-mth/inc-data-mth';
import { IncDataAreaPage } from '../inc-data-area/inc-data-area';
import { LawDataMthPage } from '../law-data-mth/law-data-mth';
import { LawDataAreaPage } from '../law-data-area/law-data-area';
import { MenuGroupNewReportPage } from '../menu-group-new-report/menu-group-new-report';
import { CategoryDepartmentListPage } from '../category-department-list/category-department-list';
import { CetegoryTaxPage } from '../cetegory-tax/cetegory-tax';

@NgModule({
  declarations: [
    MenuGroupPage,
    MblRegisterPage,
    LicDataMarketPage,
    IncDataMthPage,
    IncDataAreaPage,
    LawDataMthPage,
    LawDataAreaPage,
    MenuGroupNewReportPage,
    CategoryDepartmentListPage,
    CetegoryTaxPage
  ],
  imports: [
    IonicPageModule.forChild(MenuGroupPage),
  ],
  exports:[
    MenuGroupPage,
    MblRegisterPage,
    LicDataMarketPage,
    IncDataMthPage,
    IncDataAreaPage,
    LawDataMthPage,
    LawDataAreaPage,
    MenuGroupNewReportPage,
    CategoryDepartmentListPage,
    CetegoryTaxPage
  ]
})
export class MenuGroupPageModule {}
