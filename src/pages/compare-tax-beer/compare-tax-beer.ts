import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-compare-tax-beer',
  templateUrl: 'compare-tax-beer.html',
})
export class CompareTaxBeerPage {

  responseData: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public webapi:RestProvider) {
  }

  ionViewDidLoad() {
    let grp_name = 'ภาษีเบียร์';
    this.webapi.getData('CompareTax?grp_name='+grp_name).then((data)=>{
      this.responseData = data;
      console.log(this.responseData);
    });
  }

}
