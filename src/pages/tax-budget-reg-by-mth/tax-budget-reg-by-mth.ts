import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

declare var dateDisplayAll:any;
declare var changeCurrency: any;

@IonicPage()
@Component({
  selector: 'page-tax-budget-reg-by-mth',
  templateUrl: 'tax-budget-reg-by-mth.html',
})
export class TaxBudgetRegByMthPage {

  responseData: any;
  summaryDate: any;
  offcode: any;

  dateDisplay:any;
  dateAsOff:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public webapi:RestProvider ) {
      this.offcode = localStorage.offcode;

      this.dateDisplay = localStorage.last_update_date;
      this.dateAsOff =  dateDisplayAll;
  }

  ionViewDidLoad() {
    let datetime =  new Date();
   
    let datenow = datetime.getMonth();
   // let datenow = datetime.getMonth();

    let date;
    let summaryDate = 2;
    let typeCur = "B";
    this.selectDate(summaryDate,typeCur);
  }

  /*selectDataAll(){  
    this.webapi.getData('TaxBudgetRegByMth?offcode='+this.offcode+'&grpup_id='+this.grp_id).then((data)=>{
      this.responseData = data;
      this.getTableTAX();
    });
  }*/

  selectDate(summaryDate,typeCur){ 
      this.webapi.getData('TaxBudgetRegByMth?offcode='+this.offcode+'&month='+summaryDate).then((data)=>{
        this.responseData = data;
        this.getTableTAX(typeCur);
      });      
  }

  getTableTAX(typeCur) {
    let tax;
    for (var i = 0; i < this.responseData.length; i++) {
      tax = this.responseData[i].TAX;
      if (tax != null) { tax = changeCurrency(tax, typeCur);}
     this.responseData[i].TAX = tax;
    }
  }
}
