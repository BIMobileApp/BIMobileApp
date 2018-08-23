import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-tax-budget-reg',
  templateUrl: 'tax-budget-reg.html',
})
export class TaxBudgetRegPage {

  responseData: any;
  summaryDate:any;
  offcode: any;
  year:any;
  grp_id:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public webapi:RestProvider) {
     this.grp_id = this.navParams.get('group_id');
  }
 
  ionViewDidLoad() {

    this.offcode = localStorage.offcode;

    var d = new Date(); 
    var n = d.getFullYear();
    var nt = d.getFullYear()+543;
    let year_en:any;
    let year_th:any;

    var range = [];
    for(var i=0;i<10;i++) {

     year_en = n-i;
     year_th = nt-i;

      range.push( {"key":year_th,"value": year_en});
    }
    this.summaryDate = range;

    this.selectDataAll();
  } 

selectDataAll(){

    console.log(this.grp_id);  console.log(this.offcode);

    this.webapi.getData('TaxBudgetRegAll?offcode='+this.offcode+'&group_id='+this.grp_id).then((data)=>{
      this.responseData = data;
      console.log(this.responseData);
     // if (!this.responseData){}else{ this.getTableTAX();}    
    });
    //+'group_id&='+this.grp_id
  }

  selectDate(year){
    if(year == ""){
      this.selectDataAll();
    }else{  
     this.webapi.getData('TaxBudgetReg?offcode='+this.offcode+'group_id&='+this.grp_id+'&year='+year).then((data)=>{
      this.responseData = data;
      if (!this.responseData){}else{ this.getTableTAX();}
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
