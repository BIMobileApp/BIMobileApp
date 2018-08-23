import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-old-report-bi-law2-1',
  templateUrl: 'old-report-bi-law2-1.html',
})
export class OldReportBi_Law21Page{
  responseData: any;  
  dateDisplay = "";
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public webapi: RestProvider) {
  }

  ionViewDidLoad() {
    this.getTableData();
    this.displayDate();
  }

  getTableData() {

    this.webapi.getData('OldREPORT_BI_Law2_1').then((data) => {
    this.responseData = data;
    console.log(this.responseData);
    this.getTableLAW_AMT();
    this.getTableTARGET_AMT();
    this.getTableL_LAW_AMT();
    this.getTableCOMPARE_TARGET();
    this.getTableCOMPARE_TAX();
  });
} 
  displayDate() {
    var now=new Date();  
    var buddhayear = now.getFullYear()+543;    
    var last  =  new Date(now.getFullYear(),now.getMonth(),0); //th 
    var budgetyear =  0;
    if (now.getMonth() >= 10) {budgetyear= buddhayear;}
    else {budgetyear=buddhayear-1;}
    
    var thmonth = new Array ("มกราคม","กุมภาพันธ์","มีนาคม",
    "เมษายน","พฤษภาคม","มิถุนายน", "กรกฎาคม","สิงหาคม","กันยายน",
    "ตุลาคม","พฤศจิกายน","ธันวาคม");
    
    if((now.getDate()-1) < 1){
      this.dateDisplay="ตั้งแต่ต้นปี ถึง "+ last.getDate() +" "+   (now.getMonth()-2 < 0 ?thmonth[11] : thmonth[now.getMonth()-2] ) +" " +  (now.getMonth()-2  < 0 ? buddhayear- 1 : buddhayear ); 
      }else{
        this.dateDisplay="ตั้งแต่ต้นปี ถึง "+ last.getDate() +" "+  (now.getMonth()-1 < 0 ?thmonth[11] : thmonth[now.getMonth()-1] ) +" " +  (now.getMonth()-1  < 0 ? buddhayear- 1 : buddhayear );
      }
    }
  getTableLAW_AMT() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {      
       let val2;
       val2 = this.responseData[i].LAW_TYPE;  
        if(val2=='คดี'){
          val = this.responseData[i].LAW_AMT;
        }else{
          val = this.responseData[i].LAW_AMT/1000000;
        }
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].LAW_AMT = val;
    }
  }

  

  getTableTARGET_AMT() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].TARGET_AMT/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].TARGET_AMT = val;
    }
  }

  getTableL_LAW_AMT() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].L_LAW_AMT/1000000
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].L_LAW_AMT = val;
    }
  }

  getTableCOMPARE_TARGET() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].COMPARE_TARGET/1000000
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].COMPARE_TARGET = val;
    }
  }


  getTableCOMPARE_TAX() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].COMPARE_TAX/1000000
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].COMPARE_TAX = val;
    }
  }
  


}
