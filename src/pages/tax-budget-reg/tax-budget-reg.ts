import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

declare var dateDisplayAll: any;

@IonicPage()
@Component({
  selector: 'page-tax-budget-reg',
  templateUrl: 'tax-budget-reg.html',
})
export class TaxBudgetRegPage {

  responseData: any;
  summaryDate:any;
  responseRegion:any;
  ResponseProvince:any;
  offcode: any;
  year:any;
  grp_id:any;
  dateAsOff = "";
  dateDisplay = "";

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public webapi:RestProvider) {
     this.grp_id = this.navParams.get('group_id');
     this.offcode = localStorage.offcode;
     this.dateAsOff = dateDisplayAll;
     this.dateDisplay = localStorage.last_update_date;
  }
 
  ionViewDidLoad() {
    
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

    //this.selectDataAll();
    this.selectRegionAll();
  } 

  selectRegionAll(){
    this.webapi.getData('ddlMRegion?offcode='+this.offcode).then((data) => {
      this.responseRegion = data;
      this.selectionProvinceFill(data[0].REGION_CD);
    });
  }

  selectRegion(Region,Province){
    this.selectionProvinceFill(Region);
    this.selectDataAll(Region,Province);
  }

  selectionProvinceFill(Region){  
    this.webapi.getData('ddlMProvince?offcode='+this.offcode+'&area='+Region).then((data) => {
      this.ResponseProvince = data;
    }); 
  }

  selectionProvince(Region,Province){
    Province = [];    
    this.selectionProvinceFill(Region);
    this.selectDataAll(Region,Province);
  }

  selectDataAll(Region,Province){   
      this.webapi.getData('TaxBudgetRegAll?offcode='+this.offcode+'&group_id='+this.grp_id+'&region='+Region+'&province='+Province).then((data)=>{
        this.responseData = data;
      
        if (!this.responseData){}else{ this.getTableTAX();}    
      });
   }

   selectDate(year){
    if(year == ""){
    //  this.selectDataAll();
    }else{  
     this.webapi.getData('TaxBudgetReg?offcode='+this.offcode+'&group_id='+this.grp_id+'&year='+year).then((data)=>{
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
