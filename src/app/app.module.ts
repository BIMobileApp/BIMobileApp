import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';


import { Injector } from '@angular/core';
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
import { FollowTaxMthPage } from '../pages/follow-tax-mth/follow-tax-mth';
import { Test1Page } from '../pages/test1/test1';
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
import { TaxCoutrySection1Page } from '../pages/tax-coutry-section1/tax-coutry-section1';
import { TaxCoutrySection2Page } from '../pages/tax-coutry-section2/tax-coutry-section2';
import { TaxCoutrySection3Page } from '../pages/tax-coutry-section3/tax-coutry-section3';
import { TaxCoutrySection4Page } from '../pages/tax-coutry-section4/tax-coutry-section4';
import { TaxCoutrySection5Page } from '../pages/tax-coutry-section5/tax-coutry-section5';
import { TaxCoutrySection6Page } from '../pages/tax-coutry-section6/tax-coutry-section6';
import { TaxCoutrySection7Page } from '../pages/tax-coutry-section7/tax-coutry-section7';
import { TaxCoutrySection8Page } from '../pages/tax-coutry-section8/tax-coutry-section8';
import { TaxCoutrySection9Page } from '../pages/tax-coutry-section9/tax-coutry-section9';
import { TaxCoutrySection10Page } from '../pages/tax-coutry-section10/tax-coutry-section10';
import { Test3Page } from '../pages/test3/test3';
import { WelcomePage } from '../pages/welcome/welcome';
import { NewReportGaugeTaxCarPage } from '../pages/new-report-gauge-tax-car/new-report-gauge-tax-car';
import { NewReportGaugeQuantityCarPage } from '../pages/new-report-gauge-quantity-car/new-report-gauge-quantity-car';
import { NewReportGaugeTaxAlcoholPage } from '../pages/new-report-gauge-tax-alcohol/new-report-gauge-tax-alcohol';
import { NewReportGaugeQuantityAlcoholPage } from '../pages/new-report-gauge-quantity-alcohol/new-report-gauge-quantity-alcohol';
import { NewReportGaugeTaxBeerPage } from '../pages/new-report-gauge-tax-beer/new-report-gauge-tax-beer';
import { NewReportGaugeTaxDrinkPage } from '../pages/new-report-gauge-tax-drink/new-report-gauge-tax-drink';
import { NewReportGaugeQuantityDrinkPage } from '../pages/new-report-gauge-quantity-drink/new-report-gauge-quantity-drink';
import { NewReportGaugeQuantityBeerPage } from '../pages/new-report-gauge-quantity-beer/new-report-gauge-quantity-beer';
import { OldReportBi_1_10_4_1AllPage } from '../pages/old-report-bi-1-10-4-1-all/old-report-bi-1-10-4-1-all';
import { OldReportBi_1_10_4_1AllGraphPage } from '../pages/old-report-bi-1-10-4-1-all-graph/old-report-bi-1-10-4-1-all-graph';
import { OldReportBi_1_10_4_6Page } from '../pages/old-report-bi-1-10-4-6/old-report-bi-1-10-4-6';
import { OldReportBi_1_12MonthGraphPage } from '../pages/old-report-bi-1-12-month-graph/old-report-bi-1-12-month-graph';
import { OldReportBi_1_12MonthGraph2Page } from '../pages/old-report-bi-1-12-month-graph2/old-report-bi-1-12-month-graph2';
import { OldReportBi_1MonthPage } from '../pages/old-report-bi-1-month/old-report-bi-1-month';
import { OldReportBi_1MonthGraphPage } from '../pages/old-report-bi-1-month-graph/old-report-bi-1-month-graph';
import { OldReportBi_1MonthGraphRatioPage } from '../pages/old-report-bi-1-month-graph-ratio/old-report-bi-1-month-graph-ratio';
import { OldReportBi_2YearPage } from '../pages/old-report-bi-2-year/old-report-bi-2-year';
import { OldReportBi_3_12GraphPage } from '../pages/old-report-bi-3-12-graph/old-report-bi-3-12-graph';
import { OldReportBi_3_12MonthPage } from '../pages/old-report-bi-3-12-month/old-report-bi-3-12-month';
import { OldReportBi_3_12MonthLastPage } from '../pages/old-report-bi-3-12-month-last/old-report-bi-3-12-month-last';
import { OldReportBi_5_10YearPage } from '../pages/old-report-bi-5-10-year/old-report-bi-5-10-year';
import { OldReportBiDomestic2_1Page } from '../pages/old-report-bi-domestic2-1/old-report-bi-domestic2-1';
import { OldReportBiDomestic2_1_12MonthPage } from '../pages/old-report-bi-domestic2-1-12-month/old-report-bi-domestic2-1-12-month';
import { OldReportBiDomestic2_1_12GraphPage } from '../pages/old-report-bi-domestic2-1-12-graph/old-report-bi-domestic2-1-12-graph';
import { OldReportBiDomestic2_1GraphPage } from '../pages/old-report-bi-domestic2-1-graph/old-report-bi-domestic2-1-graph';
import { OldReportBiRegion_4_1Page } from '../pages/old-report-bi-region-4-1/old-report-bi-region-4-1';
import { OldReportBiRegion_4_1GraphPage } from '../pages/old-report-bi-region-4-1-graph/old-report-bi-region-4-1-graph';
import { OldReportDomesticGroupPage } from '../pages/old-report-domestic-group/old-report-domestic-group';
import { OldReportMobile1_6YearPage } from '../pages/old-report-mobile1-6-year/old-report-mobile1-6-year';
import { OldReportFollowProductGroupPage } from '../pages/old-report-follow-product-group/old-report-follow-product-group';
import { OldReportRegionGroupPage } from '../pages/old-report-region-group/old-report-region-group';
import { OldReportSection1_10GroupPage } from '../pages/old-report-section1-10-group/old-report-section1-10-group';
import { MblRegisterPage } from '../pages/mbl-register/mbl-register';
import { TaxProductByMthPage } from '../pages/tax-product-by-mth/tax-product-by-mth';
import { OldReportBi_Law21Page } from '../pages/old-report-bi-law2-1/old-report-bi-law2-1';
import { OldReportBi_Law31Page } from '../pages/old-report-bi-law3-1/old-report-bi-law3-1';
import { IncDataAreaPage } from '../pages/inc-data-area/inc-data-area';
import { IncDataMthPage } from '../pages/inc-data-mth/inc-data-mth';
import { LawDataAreaPage } from '../pages/law-data-area/law-data-area';
import { LawDataMthPage } from '../pages/law-data-mth/law-data-mth';
import { DataStatusPage } from '../pages/data-status/data-status';
import { NewsEventPage } from '../pages/news-event/news-event';
import { LicDataMarketPage } from '../pages/lic-data-market/lic-data-market';

import { HttpClientModule } from '@angular/common/http';
import { RestProvider } from '../providers/rest/rest';

import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { DocumentViewer } from '@ionic-native/document-viewer';
import { Geolocation } from '@ionic-native/geolocation'; 
import { DimensionTime_03Page } from '../pages/dimension-time-03/dimension-time-03';

import { DirectivesModule } from '../directives/directives.module';
import { CompareTaxEstOilPage } from '../pages/compare-tax-est-oil/compare-tax-est-oil';
import { CompareTaxOilPage } from '../pages/compare-tax-oil/compare-tax-oil';
import { NewReportGaugeTaxOilPage } from '../pages/new-report-gauge-tax-oil/new-report-gauge-tax-oil';
import { CompareTaxEstSicaPage } from '../pages/compare-tax-est-sica/compare-tax-est-sica';
import { CompareTaxSicaPage } from '../pages/compare-tax-sica/compare-tax-sica';
import { NewReportGaugeTaxSicaPage } from '../pages/new-report-gauge-tax-sica/new-report-gauge-tax-sica';
import { TaxBranchSection1Page } from '../pages/tax-branch-section1/tax-branch-section1';
import { TaxBranchSection2Page } from '../pages/tax-branch-section2/tax-branch-section2';
import { TaxBranchSection3Page } from '../pages/tax-branch-section3/tax-branch-section3';
import { TaxBranchSection4Page } from '../pages/tax-branch-section4/tax-branch-section4';
import { TaxBranchSection5Page } from '../pages/tax-branch-section5/tax-branch-section5';
import { TaxBranchSection6Page } from '../pages/tax-branch-section6/tax-branch-section6';
import { TaxBranchSection7Page } from '../pages/tax-branch-section7/tax-branch-section7';
import { TaxBranchSection8Page } from '../pages/tax-branch-section8/tax-branch-section8';
import { TaxBranchSection9Page } from '../pages/tax-branch-section9/tax-branch-section9';
import { TaxBranchSection10Page } from '../pages/tax-branch-section10/tax-branch-section10';


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
    TaxYearByProductPage,
    TaxGroupSourcePage,
    FollowTaxRealtimePage,
    TaxEdRealtimePage,
    TaxgroupMonthlyFreezonePage,
    TaxAllCountryPage,
    TaxMonthlyFreezonePage,
    CompareTaxEstDrinkPage,
    TaxCoutrySection1Page,
    TaxCoutrySection2Page,
    TaxCoutrySection3Page,
    TaxCoutrySection4Page,
    TaxCoutrySection5Page,
    TaxCoutrySection6Page,
    TaxCoutrySection7Page,
    TaxCoutrySection8Page,
    TaxCoutrySection9Page,
    TaxCoutrySection10Page,
    Test1Page,
    Test3Page,
    WelcomePage,
    NewReportGaugeTaxCarPage,
    NewReportGaugeQuantityCarPage,
    NewReportGaugeTaxAlcoholPage,
    NewReportGaugeQuantityAlcoholPage,
    NewReportGaugeTaxBeerPage,
    NewReportGaugeQuantityBeerPage,
    NewReportGaugeTaxDrinkPage,
    NewReportGaugeQuantityDrinkPage,
    OldReportBi_1_10_4_1AllPage,
    OldReportBi_1_10_4_1AllGraphPage,
    OldReportBi_1_10_4_6Page,
    OldReportBi_1_12MonthGraphPage,
    OldReportBi_1_12MonthGraph2Page,
    OldReportBi_1MonthPage,
    OldReportBi_1MonthGraphPage,
    OldReportBi_1MonthGraphRatioPage,
    OldReportBi_2YearPage,
    OldReportBi_3_12GraphPage,
    OldReportBi_3_12MonthPage,
    OldReportBi_3_12MonthLastPage,
    OldReportBi_5_10YearPage,
    OldReportBiDomestic2_1Page,
    OldReportBiDomestic2_1_12MonthPage,
    OldReportBiDomestic2_1_12GraphPage,
    OldReportBiDomestic2_1GraphPage,
    OldReportBiRegion_4_1Page,
    OldReportBiRegion_4_1GraphPage,
    OldReportMobile1_6YearPage,
    OldReportDomesticGroupPage,
    OldReportFollowProductGroupPage,
    OldReportRegionGroupPage,
    OldReportSection1_10GroupPage,
    MblRegisterPage,
    TaxProductByMthPage,
    OldReportBi_Law21Page,
    OldReportBi_Law31Page,
    IncDataAreaPage,
    IncDataMthPage,
    LawDataAreaPage,
    LawDataMthPage,
    DataStatusPage,
    NewsEventPage,
    LicDataMarketPage,
    DimensionTime_03Page,
    CompareTaxEstOilPage,
    CompareTaxOilPage,
    NewReportGaugeTaxOilPage,
    CompareTaxEstSicaPage,
    CompareTaxSicaPage,
    NewReportGaugeTaxSicaPage,
    TaxBranchSection1Page,
    TaxBranchSection2Page,
    TaxBranchSection3Page,
    TaxBranchSection4Page,
    TaxBranchSection5Page,
    TaxBranchSection6Page,
    TaxBranchSection7Page,
    TaxBranchSection8Page,
    TaxBranchSection9Page,
    TaxBranchSection10Page
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DirectivesModule,
    ChartsModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      iconMode: 'ios',
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      tabsPlacement: 'bottom',
      pageTransition: 'ios-transition'
    })
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
    TaxMonthlyFreezonePage,
    TaxCoutrySection1Page,
    TaxCoutrySection2Page,
    TaxCoutrySection3Page,
    TaxCoutrySection4Page,
    TaxCoutrySection5Page,
    TaxCoutrySection6Page,
    TaxCoutrySection7Page,
    TaxCoutrySection8Page,
    TaxCoutrySection9Page,
    TaxCoutrySection10Page,
    Test1Page,
    Test3Page,
    WelcomePage,
    NewReportGaugeTaxCarPage,
    NewReportGaugeQuantityCarPage,
    NewReportGaugeTaxAlcoholPage,
    NewReportGaugeQuantityAlcoholPage,
    NewReportGaugeTaxBeerPage,
    NewReportGaugeQuantityBeerPage,
    NewReportGaugeTaxDrinkPage,
    NewReportGaugeQuantityDrinkPage,
    OldReportBi_1_10_4_1AllPage,
    OldReportBi_1_10_4_1AllGraphPage,
    OldReportBi_1_10_4_6Page,
    OldReportBi_1_12MonthGraphPage,
    OldReportBi_1_12MonthGraph2Page,
    OldReportBi_1MonthPage,
    OldReportBi_1MonthGraphPage,
    OldReportBi_1MonthGraphRatioPage,
    OldReportBi_2YearPage,
    OldReportBi_3_12GraphPage,
    OldReportBi_3_12MonthPage,
    OldReportBi_3_12MonthLastPage,
    OldReportBi_5_10YearPage,
    OldReportBiDomestic2_1Page,
    OldReportBiDomestic2_1_12MonthPage,
    OldReportBiDomestic2_1_12GraphPage,
    OldReportBiDomestic2_1GraphPage,
    OldReportBiRegion_4_1Page,
    OldReportBiRegion_4_1GraphPage,
    OldReportMobile1_6YearPage,
    OldReportDomesticGroupPage,
    OldReportFollowProductGroupPage,
    OldReportRegionGroupPage,
    OldReportSection1_10GroupPage,
    MblRegisterPage,
    TaxProductByMthPage,
    OldReportBi_Law21Page,
    OldReportBi_Law31Page,
    IncDataAreaPage,
    IncDataMthPage,
    LawDataAreaPage,
    LawDataMthPage,
    DataStatusPage,
    NewsEventPage,
    LicDataMarketPage,
    DimensionTime_03Page,
    CompareTaxEstOilPage,
    CompareTaxOilPage,
    NewReportGaugeTaxOilPage,
    CompareTaxEstSicaPage,
    CompareTaxSicaPage,
    NewReportGaugeTaxSicaPage,
    TaxBranchSection1Page,
    TaxBranchSection2Page,
    TaxBranchSection3Page,
    TaxBranchSection4Page,
    TaxBranchSection5Page,
    TaxBranchSection6Page,
    TaxBranchSection7Page,
    TaxBranchSection8Page,
    TaxBranchSection9Page,
    TaxBranchSection10Page
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    RestProvider,
    File,
    DocumentViewer,
    FileTransfer,
    Geolocation
  ]
})

export class AppModule {
  static injector: Injector;

    constructor(injector: Injector) {    
        // Make the injector to be available in the entire module
        AppModule.injector = injector;    
    }
    
 }
