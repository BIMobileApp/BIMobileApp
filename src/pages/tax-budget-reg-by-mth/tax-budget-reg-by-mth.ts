import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

declare var dateDisplayAll: any;
declare var changeCurrency: any;
/* start for pinch */
const MAX_SCALE = 11.1;
const MIN_SCALE = 0.9;
const BASE_SCALE = 1.3;
/* end  */
@IonicPage()
@Component({
  selector: 'page-tax-budget-reg-by-mth',
  templateUrl: 'tax-budget-reg-by-mth.html',
})
export class TaxBudgetRegByMthPage {

  username:any;
  responseData: any;
  summaryDate: any;
  offcode: any;

  dateDisplay: any;
  dateAsOff: any;
  /* start for pinch */
  public fontSize = `${BASE_SCALE}rem`;
  private scale = BASE_SCALE;
  private alreadyScaled = BASE_SCALE;
  public isScaling = false;
  /* end  */
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public webapi: RestProvider) {
    this.offcode = localStorage.offcode;
    this.username = localStorage.userData;
    this.dateDisplay = localStorage.last_update_date;
    this.dateAsOff = dateDisplayAll;
  }

  ionViewDidLoad() {
    let datetime = new Date();

    let datenow = datetime.getMonth();
    // let datenow = datetime.getMonth();

    let date;
    let summaryDate;
    let typeCur = "M";
    this.selectDate(summaryDate, typeCur);
  }

  /*selectDataAll(){  
    this.webapi.getData('TaxBudgetRegByMth?offcode='+this.offcode+'&grpup_id='+this.grp_id).then((data)=>{
      this.responseData = data;
      this.getTableTAX();
    });
  }*/

  regionSelectType = "";
  selectDate(summaryDate, typeCur) {
    if(typeCur == undefined){
      this.regionSelectType = "M";
    }else{
      this.regionSelectType =  typeCur;
    }

    this.webapi.getData('TaxBudgetRegByMth?offcode=' + this.offcode + '&month=' + summaryDate).then((data) => {
      this.responseData = data;
      this.getTableTAX(this.regionSelectType);
    });
  }

  getTableTAX(typeCur) {
    let tax;
    for (var i = 0; i < this.responseData.length; i++) {
      tax = this.responseData[i].TAX;
      if (tax != null) { tax = changeCurrency(tax, typeCur); }
      this.responseData[i].TAX = tax;
    }
  }
  /* start for pinch */
  public onPinchStart(e) {
    this.isScaling = true;
  }
  public onPinchEnd(e) {
    this.isScaling = false;
    this.alreadyScaled = this.scale * this.alreadyScaled;
  }
  public onPinchMove(e) {
    this.scale = e.scale;
    let totalScaled = this.alreadyScaled * e.scale;
    if (totalScaled >= MAX_SCALE) {
      this.scale = MAX_SCALE / this.alreadyScaled;
      totalScaled = MAX_SCALE;
    } else if (totalScaled <= MIN_SCALE) {
      this.scale = MIN_SCALE / this.alreadyScaled;
      totalScaled = MIN_SCALE;
    }

    let fontSize = Math.round(totalScaled * 10) / 10;
    if ((fontSize * 10) % 3 === 0) {
      this.fontSize = `${fontSize}rem`;
    }
  }
  /* end  */
}
