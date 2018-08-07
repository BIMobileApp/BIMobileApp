import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ChartPage } from '../pages/chart/chart';

import { GaugechartPage } from '../pages/gaugechart/gaugechart';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { MenuGroupPage } from '../pages/menu-group/menu-group';
import { MenuGroupOldReportPage } from '../pages/menu-group-old-report/menu-group-old-report';
import { MenuGroupNewReportPage } from '../pages/menu-group-new-report/menu-group-new-report';
import { OldReportMenuGroup1Page } from '../pages/old-report-menu-group1/old-report-menu-group1';
import { OldReportMenuGroup2Page } from '../pages/old-report-menu-group2/old-report-menu-group2';
import { IncomerealtimePage } from '../pages/incomerealtime/incomerealtime';


import { HttpClientModule } from '@angular/common/http';
import { RestProvider } from '../providers/rest/rest';
import { FollowTaxMthPage } from '../pages/follow-tax-mth/follow-tax-mth';
import { ChartsModule } from 'ng2-charts';
import { CheckDeliveryAllTaxPage } from '../pages/check-delivery-all-tax/check-delivery-all-tax';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ChartPage,
    FollowTaxMthPage,
    GaugechartPage,
    DashboardPage,
    MenuGroupPage,
    MenuGroupOldReportPage,
    MenuGroupNewReportPage,
    OldReportMenuGroup1Page,
    OldReportMenuGroup2Page,
    CheckDeliveryAllTaxPage,
    IncomerealtimePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    ChartsModule,
    NgxDatatableModule 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ChartPage,
    FollowTaxMthPage,
    GaugechartPage,
    DashboardPage,
    MenuGroupPage,
    MenuGroupOldReportPage,
    MenuGroupNewReportPage,
    OldReportMenuGroup1Page,
    OldReportMenuGroup2Page,
    CheckDeliveryAllTaxPage,
    IncomerealtimePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider
  ]
})

export class AppModule {}
