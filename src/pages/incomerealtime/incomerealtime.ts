import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest'; 

declare var dateDisplayAll: any;
declare var changeMillion: any;
const MAX_SCALE = 7.5;  
const MIN_SCALE = 0.9;
const BASE_SCALE = 1.5;

@IonicPage()
@Component({
  selector: 'page-incomerealtime',
  templateUrl: 'incomerealtime.html',
})
export class IncomerealtimePage {

  public fontSize = `${BASE_SCALE}rem`;
  private scale = BASE_SCALE;
  private alreadyScaled = BASE_SCALE;

  private isScaling = false;

  
  respondData: any;
  respondSumData: any;
  responseRegion:any;
  ResponseProvince:any;

  offcode: any;
  username:any;
  dateAsOff = "";
  dateDisplay = "";
  unitType: any;
  Region: any;
   Province : any;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public webapi:RestProvider) {
      this.offcode = localStorage.offcode;
      this.username = localStorage.userData;
      this.dateAsOff = dateDisplayAll;
      this.dateDisplay = localStorage.last_update_date;
  }

  ionViewDidLoad() {
    let Region = 'undefined';
    let Province = 'undefined';
    this.getData(Region,Province);
    this.selectionAreaAll();
  }

  selectionAreaAll(){

    this.webapi.getData('TaxRealtimeRegion?offcode='+this.offcode).then((data) => {
      this.responseRegion = data;      
      this.selectionProvinceFill(data[0].REGION_NAME);
      this.unitType="B";
    });
  }

  selectionProvinceFill(Region){  

    this.webapi.getData('TaxRealtimeProvince?offcode='+this.offcode+'&area='+Region).then((data) => {
      this.ResponseProvince = data;
    }); 
  } 

  selectRegion(Region,Province){
    Province = [];

    this.selectionProvinceFill(Region);
   this.getData(Region,Province);
  }
   
  getData(Region,Province){
      this.webapi.getData('SourceImcome?offcode='+this.offcode+'&region='+Region+'&province='+Province).then((data)=>{
          this.respondData = data;
   
          //this.getTableTAX();
      });
     /* this.webapi.getData('SumIncomeList?offcode='+this.offcode).then((data)=>{
          this.respondSumData = data;
          //this.getTableSumTAX();
        });*/
  }

changeTHBToMTHB(valB){
  //alert(valB); 
this.webapi.getData('SourceImcome?offcode='+this.offcode+'&region='+this.Region+'&province='+this.Province).then((data)=>{
 this.respondData = data; 
 let valIn;let valOut;
 for (var i = 0; i < this.respondData.length; i++) {
  valIn = this.respondData[i].TAX;
  
  valIn = valIn.toString().replace(",", "");  
   valOut = changeMillion(valIn ,valB);
 
 this.respondData[i].TAX = valOut;
 }  
});
}
  selectionProvince(Region,Province){

    this.getData(Region,Province);
    /*this.webapi.getData('SourceImcome?offcode='+this.offcode+'&region='+Region+'&province='+Province).then((data)=>{
      this.respondData = data;

       // this.getTableTAX();
      
  });*/
  /*this.webapi.getData('SumIncomeList?offcode='+this.offcode).then((data)=>{
      this.respondSumData = data;

        this.getTableSumTAX();
      
    });*/
  }
 

  getTableTAX() { 
    let val;
    for (var i = 0; i < this.respondData.length; i++) {
      val = this.respondData[i].TAX;
     // val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.respondData[i].TAX = val;
    }
  }
 
  /*getTableSumTAX(){
    let val;
    for (var i = 0; i < this.respondSumData.length; i++) {
      val = this.respondSumData[i].SUM_TAX;
     // val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.respondSumData[i].SUM_TAX = val;
    }
  }*/

  public onPinchStart(e) {

    // flag that sets the class to disable scrolling
    this.isScaling = true;
  }


  // called at (pinchend) and (pinchcancel)
  public onPinchEnd(e) {

    // flip the flag, enable scrolling
    this.isScaling = false;

    // adjust the amount we already scaled
    this.alreadyScaled = this.scale * this.alreadyScaled;

  }

  public onPinchMove(e) {

    // set the scale so we can track it globally
    this.scale = e.scale;

    // total amount we scaled
    let totalScaled = this.alreadyScaled * e.scale;

    // did we hit the max scale (pinch out)
    if (totalScaled >= MAX_SCALE) {

      // fix the scale by calculating it, don't use the e.scale
      // scenario: an insane quick pinch out will offset the this.scale
      this.scale = MAX_SCALE / this.alreadyScaled;
      totalScaled = MAX_SCALE;

      // did we hit the min scale (pinch in)
    } else if (totalScaled <= MIN_SCALE) {

      // fix the scale
      this.scale = MIN_SCALE / this.alreadyScaled;
      totalScaled = MIN_SCALE;

    }

    let fontSize = Math.round(totalScaled * 10) / 10;

    // change the fontsize every 3 decimals in scale change
    if ((fontSize * 10) % 3 === 0) {

      // update the fontsize
      this.fontSize = `${fontSize}rem`;
    }

  }
}
