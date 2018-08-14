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
import { TaxbudgetyearPage } from '../pages/taxbudgetyear/taxbudgetyear';
import { TaxBudgetProductPage } from '../pages/tax-budget-product/tax-budget-product';
import { TaxBudgetRegPage } from '../pages/tax-budget-reg/tax-budget-reg';
import { TaxBudgetRegByMthPage } from '../pages/tax-budget-reg-by-mth/tax-budget-reg-by-mth';
import { CompareTaxAlcoholPage } from '../pages/compare-tax-alcohol/compare-tax-alcohol';
import { CompareTaxCarPage } from '../pages/compare-tax-car/compare-tax-car';
import { CompareTaxBeerPage } from '../pages/compare-tax-beer/compare-tax-beer';
import { CompareTaxDrinkPage } from '../pages/compare-tax-drink/compare-tax-drink';
import { CetegoryTaxPage } from '../pages/cetegory-tax/cetegory-tax';
import { CategoryDepartmentListPage } from '../pages/category-department-list/category-department-list';
import { TaxYearByProductPage } from '../pages/tax-year-by-product/tax-year-by-product';
import { TaxGroupSourcePage } from '../pages/tax-group-source/tax-group-source';
import { FollowTaxRealtimePage } from '../pages/follow-tax-realtime/follow-tax-realtime';
import { TaxEdRealtimePage } from '../pages/tax-ed-realtime/tax-ed-realtime';
import { TaxgroupMonthlyFreezonePage } from '../pages/taxgroup-monthly-freezone/taxgroup-monthly-freezone';
import { TaxAllCountryPage } from '../pages/tax-all-country/tax-all-country';
import { TaxMonthlyFreezonePage } from '../pages/tax-monthly-freezone/tax-monthly-freezone';

import { HttpClientModule } from '@angular/common/http';
import { RestProvider } from '../providers/rest/rest';
import { FollowTaxMthPage } from '../pages/follow-tax-mth/follow-tax-mth';
import { Test2Page } from '../pages/test2/test2';
import { TabGaugeAllmthSectionTaxPage } from '../pages/tab-gauge-allmth-section-tax/tab-gauge-allmth-section-tax';
import { ChartsModule } from 'ng2-charts';
import { FollowProductGroupPage } from '../pages/follow-product-group/follow-product-group';
import { OldReportBarAllTaxPage } from '../pages/old-report-bar-all-tax/old-report-bar-all-tax';
import { CheckDeliveryAllTaxPage } from '../pages/check-delivery-all-tax/check-delivery-all-tax';
import { NewReportLineFollowProductPage } from '../pages/new-report-line-follow-product/new-report-line-follow-product';
import { ContactPage } from '../pages/contact/contact';
import { NewReportLineTaxEstProdPage } from '../pages/new-report-line-tax-est-prod/new-report-line-tax-est-prod';
import { CompareTaxEstCarPage } from '../pages/compare-tax-est-car/compare-tax-est-car';
import { CompareTaxEstBeerPage } from '../pages/compare-tax-est-beer/compare-tax-est-beer';
import { CompareTaxEstAlcoholPage } from '../pages/compare-tax-est-alcohol/compare-tax-est-alcohol';
import { CompareTaxEstDrinkPage } from '../pages/compare-tax-est-drink/compare-tax-est-drink';


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
    OldReportBarAllTaxPage,
    CheckDeliveryAllTaxPage,
    IncomerealtimePage,
    NewReportLineFollowProductPage,
    TaxbudgetyearPage,
    TaxBudgetProductPage,
    TaxBudgetRegPage,
    TaxBudgetRegByMthPage,
    CompareTaxAlcoholPage,
    CompareTaxCarPage,
    CompareTaxBeerPage,
    CompareTaxDrinkPage,
    ContactPage,
    NewReportLineTaxEstProdPage,
    CetegoryTaxPage,
    CategoryDepartmentListPage,
    CompareTaxEstCarPage,
    CompareTaxEstBeerPage,
    CompareTaxEstAlcoholPage,
    CompareTaxEstDrinkPage,
    TaxYearByProductPage,
    TaxGroupSourcePage,
    FollowTaxRealtimePage,
    TaxEdRealtimePage,
    TaxgroupMonthlyFreezonePage,
    TaxAllCountryPage,
    TaxMonthlyFreezonePage

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ChartsModule,
    IonicModule.forRoot(MyApp,)
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
    OldReportBarAllTaxPage,
    CheckDeliveryAllTaxPage,
    IncomerealtimePage,
    NewReportLineFollowProductPage,
    TaxbudgetyearPage,
    TaxBudgetProductPage,
    TaxBudgetRegPage,
    TaxBudgetRegByMthPage,
    CompareTaxAlcoholPage,
    CompareTaxCarPage,
    CompareTaxBeerPage,
    CompareTaxDrinkPage,
    ContactPage,
    NewReportLineTaxEstProdPage,
    CetegoryTaxPage,
    CategoryDepartmentListPage,
    CompareTaxEstCarPage,
    CompareTaxEstBeerPage,
    CompareTaxEstAlcoholPage,
    CompareTaxEstDrinkPage,
    TaxYearByProductPage,
    TaxGroupSourcePage,
    FollowTaxRealtimePage,
    TaxEdRealtimePage,
    TaxgroupMonthlyFreezonePage,
    TaxAllCountryPage,
    TaxMonthlyFreezonePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    RestProvider
  ]
})

export class AppModule { }
