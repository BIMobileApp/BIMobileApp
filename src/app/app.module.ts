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

import { HttpClientModule } from '@angular/common/http';
import { RestProvider } from '../providers/rest/rest';
import { FollowTaxMthPage } from '../pages/follow-tax-mth/follow-tax-mth';
import { Test2Page } from '../pages/test2/test2';
import { TabGaugeAllmthSectionTaxPage } from '../pages/tab-gauge-allmth-section-tax/tab-gauge-allmth-section-tax';
import { ChartsModule } from 'ng2-charts';
import { FollowProductGroupPage } from '../pages/follow-product-group/follow-product-group';
import { OldReportBarAllTaxPage } from '../pages/old-report-bar-all-tax/old-report-bar-all-tax';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ChartPage,
    FollowTaxMthPage,
    Test2Page,
    TabGaugeAllmthSectionTaxPage,
    GaugechartPage,
    DashboardPage,
    MenuGroupPage,
    MenuGroupOldReportPage,
    MenuGroupNewReportPage,
    OldReportMenuGroup1Page,
    OldReportMenuGroup2Page,
    FollowProductGroupPage,
    OldReportBarAllTaxPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ChartPage,
    FollowTaxMthPage,
    Test2Page,
    TabGaugeAllmthSectionTaxPage,
    GaugechartPage,
    DashboardPage,
    MenuGroupPage,
    MenuGroupOldReportPage,
    MenuGroupNewReportPage,
    OldReportMenuGroup1Page,
    OldReportMenuGroup2Page,
    FollowProductGroupPage,
    OldReportBarAllTaxPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider
  ]
})
export class AppModule {}
