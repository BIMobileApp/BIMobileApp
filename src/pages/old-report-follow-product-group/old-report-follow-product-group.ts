import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App } from 'ionic-angular';
import { OldReportBi_1MonthPage } from '../old-report-bi-1-month/old-report-bi-1-month';
import { OldReportBi_1MonthGraphPage } from '../old-report-bi-1-month-graph/old-report-bi-1-month-graph';
import { OldReportBi_1MonthGraphRatioPage } from '../old-report-bi-1-month-graph-ratio/old-report-bi-1-month-graph-ratio';
import { OldReportBi_2YearPage } from '../old-report-bi-2-year/old-report-bi-2-year';
import { OldReportBi_1_12MonthGraphPage } from '../old-report-bi-1-12-month-graph/old-report-bi-1-12-month-graph';
import { OldReportBi_1_12MonthGraph2Page } from '../old-report-bi-1-12-month-graph2/old-report-bi-1-12-month-graph2';
import { OldReportBi_3_12MonthPage } from '../old-report-bi-3-12-month/old-report-bi-3-12-month';
import { OldReportBi_3_12GraphPage } from '../old-report-bi-3-12-graph/old-report-bi-3-12-graph';
import { OldReportBi_3_12MonthLastPage } from '../old-report-bi-3-12-month-last/old-report-bi-3-12-month-last';
import { OldReportBi_5_10YearPage } from '../old-report-bi-5-10-year/old-report-bi-5-10-year';
import { OldReportMobile1_6YearPage } from '../old-report-mobile1-6-year/old-report-mobile1-6-year';

@IonicPage()
@Component({
  selector: 'page-old-report-follow-product-group',
  templateUrl: 'old-report-follow-product-group.html',
})
export class OldReportFollowProductGroupPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public app:App) {
  }

  ionViewDidLoad() {

  }
  OldReportBi_1Month() {
    this.app.getRootNav().push(OldReportBi_1MonthPage);  
  }
  OldReportBi_1MonthGraph() {
    this.app.getRootNav().push(OldReportBi_1MonthGraphPage);  
  }
  OldReportBi_1MonthGraphRatio() {
    this.app.getRootNav().push(OldReportBi_1MonthGraphRatioPage);  
  }
  OldReportBi_2Year(){
    this.app.getRootNav().push(OldReportBi_2YearPage);  
  }
  OldReportBi_1_12MonthGraph(){
    this.app.getRootNav().push(OldReportBi_1_12MonthGraphPage);  
  }
  OldReportBi_1_12MonthGraph2(){
    this.app.getRootNav().push(OldReportBi_1_12MonthGraph2Page);  
  }
  OldReportBi_3_12Month(){
    this.app.getRootNav().push(OldReportBi_3_12MonthPage);  
  }
  OldReportBi_3_12Graph(){
    this.app.getRootNav().push(OldReportBi_3_12GraphPage);  
  }
  OldReportBi_3_12MonthLast(){
    this.app.getRootNav().push(OldReportBi_3_12MonthLastPage);  
  }
  OldReportBi_5_10Year(){
    this.app.getRootNav().push(OldReportBi_5_10YearPage);  
  }
  OldReportMobile1_6Year(){
    this.app.getRootNav().push(OldReportMobile1_6YearPage);  
  }
}
