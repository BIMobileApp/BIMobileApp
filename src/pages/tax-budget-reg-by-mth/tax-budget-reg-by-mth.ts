import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

declare var dateDisplayAll:any;

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
    console.log(datetime);
    let datenow = datetime.getMonth();
   // let datenow = datetime.getMonth();
    console.log(datenow);

    let date;
    this.selectDate(date);
  }

  /*selectDataAll(){  
    this.webapi.getData('TaxBudgetRegByMth?offcode='+this.offcode+'&grpup_id='+this.grp_id).then((data)=>{
      this.responseData = data;
      this.getTableTAX();
    });
  }*/

  selectDate(summaryDate){
  
    if(summaryDate == ""){
     // this.selectDataAll();
    }else{
      this.webapi.getData('TaxBudgetRegByMth?offcode='+this.offcode+'&month='+summaryDate).then((data)=>{
        this.responseData = data;
        this.getTableTAX();
        //this.getTableTAX();
      });
    }
   
  }

  getTableTAX() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].TAX/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].TAX = val;
    
    }
  }
}
