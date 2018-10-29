import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ChartsModule } from 'ng2-charts';

import { Injector } from '@angular/core';
import { MyApp } from './app.component';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { DocumentViewer } from '@ionic-native/document-viewer';
import { DirectivesModule } from '../directives/directives.module';
import { HttpClientModule } from '@angular/common/http';
import { RestProvider } from '../providers/rest/rest';

import { WelcomePage } from '../pages/welcome/welcome';
import { HomePage } from '../pages/home/home';
import { MenuGroupPage } from '../pages/menu-group/menu-group';
import { ContactPage } from '../pages/contact/contact';

/* 
import { MenuGroupNewReportPage } from '../pages/menu-group-new-report/menu-group-new-report';
import { IncomerealtimePage } from '../pages/incomerealtime/incomerealtime';
import { TaxBudgetRegPage } from '../pages/tax-budget-reg/tax-budget-reg';
import { TaxBudgetRegByMthPage } from '../pages/tax-budget-reg-by-mth/tax-budget-reg-by-mth';
import { CompareTaxAlcoholPage } from '../pages/compare-tax-alcohol/compare-tax-alcohol';
import { CompareTaxCarPage } from '../pages/compare-tax-car/compare-tax-car';
import { CompareTaxBeerPage } from '../pages/compare-tax-beer/compare-tax-beer';
import { CompareTaxDrinkPage } from '../pages/compare-tax-drink/compare-tax-drink';
import { CetegoryTaxPage } from '../pages/cetegory-tax/cetegory-tax';
import { CategoryDepartmentListPage } from '../pages/category-department-list/category-department-list';
import { FollowTaxRealtimePage } from '../pages/follow-tax-realtime/follow-tax-realtime';
import { TaxEdRealtimePage } from '../pages/tax-ed-realtime/tax-ed-realtime';
import { Test1Page } from '../pages/test1/test1';
import { Test2Page } from '../pages/test2/test2';
import { Test3Page } from '../pages/test3/test3';
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
import { NewReportGaugeTaxCarPage } from '../pages/new-report-gauge-tax-car/new-report-gauge-tax-car';
import { NewReportGaugeTaxAlcoholPage } from '../pages/new-report-gauge-tax-alcohol/new-report-gauge-tax-alcohol';
import { NewReportGaugeTaxBeerPage } from '../pages/new-report-gauge-tax-beer/new-report-gauge-tax-beer';
import { NewReportGaugeTaxDrinkPage } from '../pages/new-report-gauge-tax-drink/new-report-gauge-tax-drink';
import { MblRegisterPage } from '../pages/mbl-register/mbl-register';
import { TaxProductByMthPage } from '../pages/tax-product-by-mth/tax-product-by-mth';
import { IncDataAreaPage } from '../pages/inc-data-area/inc-data-area';
import { IncDataMthPage } from '../pages/inc-data-mth/inc-data-mth';
import { LawDataAreaPage } from '../pages/law-data-area/law-data-area';
import { LawDataMthPage } from '../pages/law-data-mth/law-data-mth';
import { DataStatusPage } from '../pages/data-status/data-status';
import { NewsEventPage } from '../pages/news-event/news-event';
import { LicDataMarketPage } from '../pages/lic-data-market/lic-data-market';


import { DimensionTime_03Page } from '../pages/dimension-time-03/dimension-time-03';
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
import { TaxBranchSection10Page } from '../pages/tax-branch-section10/tax-branch-section10'; */


@NgModule({
  declarations: [
    MyApp,
    WelcomePage,
    HomePage,
    MenuGroupPage,
    ContactPage  
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
    WelcomePage,
    HomePage,
    MenuGroupPage,
    ContactPage  
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    RestProvider,
    File,
    DocumentViewer,
    FileTransfer
  ]
})

export class AppModule {
  static injector: Injector;

    constructor(injector: Injector) {    
        // Make the injector to be available in the entire module
        AppModule.injector = injector;    
    }
    
 }
