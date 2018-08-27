import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App } from 'ionic-angular';
import { OldReportFollowProductGroupPage } from '../old-report-follow-product-group/old-report-follow-product-group';
import { OldReportDomesticGroupPage } from '../old-report-domestic-group/old-report-domestic-group';
import { OldReportSection1_10GroupPage } from '../old-report-section1-10-group/old-report-section1-10-group';
import { OldReportRegionGroupPage } from '../old-report-region-group/old-report-region-group';
import { OldReportBi_Law21Page } from '../old-report-bi-law2-1/old-report-bi-law2-1';
import { OldReportBi_Law31Page } from '../old-report-bi-law3-1/old-report-bi-law3-1';

@IonicPage()
@Component({
  selector: 'page-menu-group-old-report',
  templateUrl: 'menu-group-old-report.html',
})
export class MenuGroupOldReportPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public app:App) {
  }

  ionViewDidLoad() {

  }

  oldReportFollowProductGroup() {
    this.app.getRootNav().push(OldReportFollowProductGroupPage); 
  }
  oldReportDomesticGroup() {
    this.app.getRootNav().push(OldReportDomesticGroupPage); 
  }
  oldReportSection1_10Group() {
    this.app.getRootNav().push(OldReportSection1_10GroupPage); 
  }
  oldReportRegionGroup() {
    this.app.getRootNav().push(OldReportRegionGroupPage); 
  }
  gotoCategoryLawTax(){
    this.app.getRootNav().push(OldReportBi_Law21Page); 
  }
  gotoCategoryFinesTax(){
    this.app.getRootNav().push(OldReportBi_Law31Page); 
  }

}
