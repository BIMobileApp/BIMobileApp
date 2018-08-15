import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { TaxCoutrySection1Page } from '../tax-coutry-section1/tax-coutry-section1';
import { TaxCoutrySection2Page } from '../tax-coutry-section2/tax-coutry-section2';
import { TaxCoutrySection3Page } from '../tax-coutry-section3/tax-coutry-section3';
import { TaxCoutrySection4Page } from '../tax-coutry-section4/tax-coutry-section4';
import { TaxCoutrySection5Page } from '../tax-coutry-section5/tax-coutry-section5';
import { TaxCoutrySection6Page } from '../tax-coutry-section6/tax-coutry-section6';
import { TaxCoutrySection7Page } from '../tax-coutry-section7/tax-coutry-section7';
import { TaxCoutrySection8Page } from '../tax-coutry-section8/tax-coutry-section8';
import { TaxCoutrySection9Page } from '../tax-coutry-section9/tax-coutry-section9';
import { TaxCoutrySection10Page } from '../tax-coutry-section10/tax-coutry-section10';

/**
 * Generated class for the TaxAllCountryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tax-all-country',
  templateUrl: 'tax-all-country.html',

})
export class TaxAllCountryPage {
  offcode: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public app: App, ) {
  }

  ionViewDidLoad() {
    this.offcode = localStorage.offcode;

    this.UserAthu();

  }

  UserAthu() {
    this.offcode = this.offcode.substring(0, 2);
    console.log(this.offcode );
  }

  section1() {
    this.app.getRootNav().push(TaxCoutrySection1Page);
  }
  section2() {
    this.app.getRootNav().push(TaxCoutrySection2Page);
  }
  section3() {
    this.app.getRootNav().push(TaxCoutrySection3Page);
  }
  section4() {
    this.app.getRootNav().push(TaxCoutrySection4Page);
  }
  section5() {
    this.app.getRootNav().push(TaxCoutrySection5Page);
  }
  section6() {
    this.app.getRootNav().push(TaxCoutrySection6Page);
  }
  section7() {
    this.app.getRootNav().push(TaxCoutrySection7Page);
  }
  section8() {
    this.app.getRootNav().push(TaxCoutrySection8Page);
  }
  section9() {
    this.app.getRootNav().push(TaxCoutrySection9Page);
  }
  section10() {
    this.app.getRootNav().push(TaxCoutrySection10Page);
  }
}
