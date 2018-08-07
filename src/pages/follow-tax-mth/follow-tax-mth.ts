import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-follow-tax-mth',
  templateUrl: 'follow-tax-mth.html',
})
export class FollowTaxMthPage {

  @ViewChild('lineCanvas') lineCanvas;
  lineChart: any;
  respondData: any;
  dbData: any;
  loading: any;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public webapi:RestProvider) {
      this.showTaxMth();
  }

  ionViewDidLoad() {
   // this.showStreets();
  }

  showTaxMth(){
    this.webapi.getData('FollowTax').then((data)=>{
         this.respondData = data;
     });
  }



  /*data: (function() {
    var data = [];
  
    for (let i = 0; i & lt; = 5; i += 1) {
      data.push({
        x: i,
        y: Math.floor(Math.random() * 10) + 0
      });
    }
    return data;
  }());*/

  showStreets() {
    let other = [];
    let amts = [];

    for (var i = 0; i < this.respondData.length; i++) {
      //for(let data of this.respondData) {
        other.push(this.respondData[i]);
    
        //console.log(this.respondData[i]);
      //  return this.respondData[i];
    } 
    
      for (var i = 0; i < other.length; i++) {
        amts.push(other[i].AMT);
      }

      return JSON.stringify(amts);
   // console.log(JSON.stringify(amts));
    }

testgraph(){
  let other =  JSON.parse(this.showStreets());
  console.log(other);

  this.lineChart = new Chart(this.lineCanvas.nativeElement, {
    type: 'line',
    data: {
        labels: ["ภาค1", "ภาค2", "ภาค3", "ภาค4", "ภาค5", "ภาค6", "ภาค7", "ภาค8", "ภาค9", "ภาค10", "ไม่ระบุภาค"],
        datasets: [
            {
                label: "Sell per week",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: other,//[, 65, 59, 80, 81, 56, 55, 40, 10, 5, 50, 10, 15],
                spanGaps: false,
            }            
        ]
    }
});
}

public map(){
  
 
}

}
