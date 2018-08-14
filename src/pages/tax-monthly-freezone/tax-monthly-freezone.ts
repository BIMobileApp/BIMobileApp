import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { RadialGauge } from '../../JS/RadialGauge.js';


@IonicPage()
@Component({
  selector: 'page-tax-monthly-freezone',
  templateUrl: 'tax-monthly-freezone.html',
})
export class TaxMonthlyFreezonePage {
    TaxGauge: any;
    TaxlyGauge: any;
    TaxEstGauge: any;

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams) {
    }

  ionViewDidLoad() {
   /* this.thisYear();
    this.lastYear();
    this.compareYear();*/
  }
  
 /* thisYear(){
    this.TaxGauge = new RadialGauge({
      renderTo: 'canvas-id-thisyear',
      width: 300,
      height: 300,
      units: "Km/h",
      minValue: 0,
      startAngle: 90,
      ticksAngle: 180,
      valueBox: false,
      maxValue: 220,
      value :[89],
      majorTicks: [
          "0",
          "20",
          "40",
          "60",
          "80",
          "100",
          "120",
          "140",
          "160",
          "180",
          "200",
          "220"
      ],
      minorTicks: 2,
      strokeTicks: true,
      highlights: [
          {
              "from": 160,
              "to": 220,
              "color": "rgba(200, 50, 50, .75)"
          },
          {
            "from": 0,
            "to": 100,
            "color": "rgba(0,0,255,0.3)"
        },
        {
          "from": 101,
          "to": 159,
          "color": "rgba(255, 0, 0, 0.8)"
      }
      ],
      colorPlate: "#fff",
      borderShadowWidth: 0,
      borders: false,
      needleType: "arrow",
      needleWidth: 2,
      needleCircleSize: 7,
      needleCircleOuter: true,
      needleCircleInner: false,
      animationDuration: 1500,
      animationRule: "linear"
  }).draw();   
}

lastYear(){
    this.TaxlyGauge = new RadialGauge({
        renderTo: 'canvas-id-lastyear',
        width: 300,
        height: 300,
        units: "Km/h",
        minValue: 0,
        startAngle: 90,
        ticksAngle: 180,
        valueBox: false,
        maxValue: 220,
        value :[89],
        majorTicks: [
            "0",
            "20",
            "40",
            "60",
            "80",
            "100",
            "120",
            "140",
            "160",
            "180",
            "200",
            "220"
        ],
        minorTicks: 2,
        strokeTicks: true,
        highlights: [
            {
                "from": 160,
                "to": 220,
                "color": "rgba(200, 50, 50, .75)"
            },
            {
              "from": 0,
              "to": 100,
              "color": "rgba(0,0,255,0.3)"
          },
          {
            "from": 101,
            "to": 159,
            "color": "rgba(255, 0, 0, 0.8)"
        }
        ],
        colorPlate: "#fff",
        borderShadowWidth: 0,
        borders: false,
        needleType: "arrow",
        needleWidth: 2,
        needleCircleSize: 7,
        needleCircleOuter: true,
        needleCircleInner: false,
        animationDuration: 1500,
        animationRule: "linear"
      }).draw(); 
   }

    compareYear(){
        this.TaxEstGauge = new RadialGauge({
            renderTo: 'canvas-id-compareyear',
            width: 300,
            height: 300,
            units: "Km/h",
            minValue: 0,
            startAngle: 90,
            ticksAngle: 180,
            valueBox: false,
            maxValue: 220,
            value :[89],
            majorTicks: [
                "0",
                "20",
                "40",
                "60",
                "80",
                "100",
                "120",
                "140",
                "160",
                "180",
                "200",
                "220"
            ],
            minorTicks: 2,
            strokeTicks: true,
            highlights: [
                {
                    "from": 160,
                    "to": 220,
                    "color": "rgba(200, 50, 50, .75)"
                },
                {
                  "from": 0,
                  "to": 100,
                  "color": "rgba(0,0,255,0.3)"
              },
              {
                "from": 101,
                "to": 159,
                "color": "rgba(255, 0, 0, 0.8)"
            }
            ],
            colorPlate: "#fff",
            borderShadowWidth: 0,
            borders: false,
            needleType: "arrow",
            needleWidth: 2,
            needleCircleSize: 7,
            needleCircleOuter: true,
            needleCircleInner: false,
            animationDuration: 1500,
            animationRule: "linear"
        }).draw(); 
   }
   */

}
