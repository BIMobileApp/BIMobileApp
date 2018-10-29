import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-menu-group-new-report',
  templateUrl: 'menu-group-new-report.html',
})
export class MenuGroupNewReportPage {

  offcode:any;
  username:any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public app:App) {
  }
   ionViewDidLoad() { 
    this.username = localStorage.userData;
   }

  reportCar27_31(){
    this.navCtrl.push('CompareTaxCarPage'); 
    /* this.app.getRootNav().push(CompareTaxCarPage);   */
  }
  reportAlcohol26_30(){
    this.navCtrl.push('CompareTaxAlcoholPage'); 
   /*  this.app.getRootNav().push(CompareTaxAlcoholPage);   */
  }
  reportBeer28_32(){
    this.navCtrl.push('CompareTaxBeerPage'); 
    /* this.app.getRootNav().push(CompareTaxBeerPage);   */
  }
  reportDrink29_33(){
    this.navCtrl.push('CompareTaxDrinkPage'); 
    /* this.app.getRootNav().push(CompareTaxDrinkPage);   */
  }
  reportCar3(){
    this.navCtrl.push('CompareTaxEstCarPage'); 
   /*  this.app.getRootNav().push(CompareTaxEstCarPage);  */
  }
  reportBeer3(){
    this.navCtrl.push('CompareTaxEstBeerPage'); 
   /*  this.app.getRootNav().push(CompareTaxEstBeerPage);   */
  }
  reportDrink3(){
    this.navCtrl.push('CompareTaxEstDrinkPage'); 
  /*   this.app.getRootNav().push(CompareTaxEstDrinkPage);   */
  }
  reportAlcohol3(){
    this.navCtrl.push('CompareTaxEstAlcoholPage'); 
   /*  this.app.getRootNav().push(CompareTaxEstAlcoholPage);   */
  }
  reportincome(){
    this.navCtrl.push('IncomerealtimePage'); 
   /*  this.app.getRootNav().push(IncomerealtimePage);   */
  }
  reportGaugeTaxCar(){
    this.navCtrl.push('NewReportGaugeTaxCarPage'); 
   /*  this.app.getRootNav().push(NewReportGaugeTaxCarPage);   */
  }
  reportGaugeTaxAol(){
    this.navCtrl.push('NewReportGaugeTaxAlcoholPage'); 
   /*  this.app.getRootNav().push(NewReportGaugeTaxAlcoholPage);   */
  }
  reportGaugeTaxBeer(){
    this.navCtrl.push('NewReportGaugeTaxBeerPage'); 
   /*  this.app.getRootNav().push(NewReportGaugeTaxBeerPage); */
  }
  reportGaugeTaxDrink(){
    this.navCtrl.push('NewReportGaugeTaxDrinkPage'); 
    /* this.app.getRootNav().push(NewReportGaugeTaxDrinkPage); */
  }
  FollowTaxRealtime(){
    this.navCtrl.push('FollowTaxRealtimePage'); 
    /* this.app.getRootNav().push(FollowTaxRealtimePage); */
  }

  DimentionTime03(){
    this.navCtrl.push('DimensionTime_03Page'); 
   /*  this.app.getRootNav().push(DimensionTime_03Page); */
  }

  TaxMthByProduct(){
    this.navCtrl.push('TaxProductByMthPage'); 
    /* this.app.getRootNav().push(TaxProductByMthPage); */
  }
  IncomeRealTimeTable(){
    this.navCtrl.push('IncomerealtimePage'); 
    /* this.app.getRootNav().push(IncomerealtimePage); */
  }
  TaxEdRealtime(){
    this.navCtrl.push('TaxEdRealtimePage'); 
    /* this.app.getRootNav().push(TaxEdRealtimePage); */
  }
  reportOil3(){
    this.navCtrl.push('CompareTaxEstOilPage'); 
    /* this.app.getRootNav().push(CompareTaxEstOilPage); */
  }
  reportOil29_33(){
    this.navCtrl.push('CompareTaxOilPage'); 
   /*  this.app.getRootNav().push(CompareTaxOilPage); */
  }
  reportGaugeTaxOil(){
    this.navCtrl.push('NewReportGaugeTaxOilPage'); 
    /* this.app.getRootNav().push(NewReportGaugeTaxOilPage); */
  }
  reportSica3(){
    this.navCtrl.push('CompareTaxEstSicaPage'); 
    /* this.app.getRootNav().push(CompareTaxEstSicaPage); */
  }
  reportSica29_33(){
    this.navCtrl.push('CompareTaxSicaPage'); 
    /* this.app.getRootNav().push(CompareTaxSicaPage); */
  }
  reportGaugeTaxSica(){
    this.navCtrl.push('NewReportGaugeTaxSicaPage'); 
    /* this.app.getRootNav().push(NewReportGaugeTaxSicaPage); */
  }

}
