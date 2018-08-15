import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { ViewChild,ElementRef } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-test2',
  templateUrl: 'test2.html',
})
export class Test2Page {
  @ViewChild('barCanvas') barCanvas;
  @ViewChild('title') mylblRef: ElementRef;
  barChart: any;
  respondData: any;
  summaryDate:any;
  title: any;
  myHero: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http: HttpClient,
    public webapi:RestProvider,
    public alertCtrl: AlertController) {


  }


  apiUrl = "http://localhost:62657/api";
  aaa:any;
  
  tooltip(){
  let alert = this.alertCtrl.create({
    title: '',
    subTitle: this.mylblRef.nativeElement.innerText,
    buttons: ['ตกลง']
  });
  alert.present();
}


  ionViewDidLoad() {

    var d = new Date(); 
    var n = d.getFullYear();
    var nt = d.getFullYear()+543;

    //this.title = n;
    //this.myHero = nt;

   //this. summaryDate = [this.title, this.myHero];
    //var bc = this. summaryDate[0];
   // var ac = this. summaryDate[1];

   

    var range = [];
    for(var i=0;i<10;i++) {

      this.title = n+i;
      this.myHero = nt+i;

      range.push( {"key":this.title,"value":this.myHero});
    }
   // console.log(range);

    this.respondData = range;
   // console.log( this.respondData);

    /*Highcharts.chart('container', {

        chart: {
          type: 'gauge',
          plotBackgroundColor: null,
          plotBackgroundImage: null,
          plotBorderWidth: 0,
          plotShadow: false
        },
      
        title: {
          text: ''
        },
      
        pane: {
          startAngle: -150,
          endAngle: 150,
          background: [{
            backgroundColor: {
              linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
              stops: [
                [0, '#FFF'],
                [1, '#333']
              ]
            },
            borderWidth: 0,
            outerRadius: '109%'
          }, {
            backgroundColor: {
              linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
              stops: [
                [0, '#333'],
                [1, '#FFF']
              ]
            },
            borderWidth: 1,
            outerRadius: '107%'
          }, {
            // default background
          }, {
            backgroundColor: '#DDD',
            borderWidth: 0,
            outerRadius: '105%',
            innerRadius: '103%'
          }]
        },
      
        // the value axis
        yAxis: {
          min: 0,
          max: 200,
      
          minorTickInterval: 'auto',
          minorTickWidth: 1,
          minorTickLength: 10,
          minorTickPosition: 'inside',
          minorTickColor: '#666',
      
          tickPixelInterval: 30,
          tickWidth: 2,
          tickPosition: 'inside',
          tickLength: 10,
          tickColor: '#666',
          labels: {
            step: 2,
            rotation: 'auto'
          },
          title: {
            text: 'km/h'
          },
          plotBands: [{
            from: 0,
            to: 120,
            color: '#55BF3B' // green
          }, {
            from: 120,
            to: 160,
            color: '#DDDF0D' // yellow
          }, {
            from: 160,
            to: 200,
            color: '#DF5353' // red
          }]
        },
      
        series: [{
          name: 'Speed',
          data: [80],
          tooltip: {
            valueSuffix: ' km/h'
          }
        }]
      
      },
      // Add some life
      function (chart) {
        if (!chart.renderer.forExport) {
          setInterval(function () {
            var point = chart.series[0].points[0],
              newVal,
              inc = Math.round((Math.random() - 0.5) * 20);
      
            newVal = point.y + inc;
            if (newVal < 0 || newVal > 200) {
              newVal = point.y - inc;
            }
      
            point.update(newVal);
      
          }, 3000);
        }
      });
    
    /*var gauge = new RadialGauge({
        renderTo: 'canvas-id2',
        minValue: 0,
        maxValue: 360,
        majorTicks: [
            "N",
            "NE",
            "E",
            "SE",
            "S",
            "SW",
            "W",
            "NW",
            "N"
        ],
        minorTicks: 22,
        ticksAngle: 360,
        startAngle: 180,
        strokeTicks: false,
        highlights: false,
        colorPlate: "#33a",
        colorMajorTicks: "#f5f5f5",
        colorMinorTicks: "#ddd",
        colorNumbers: "#ccc",
        colorNeedle: "rgba(240, 128, 128, 1)",
        colorNeedleEnd: "rgba(255, 160, 122, .9)",
        valueBox: false,
        valueTextShadow: false,
        colorCircleInner: "#fff",
        colorNeedleCircleOuter: "#ccc",
        needleCircleSize: 15,
        needleCircleOuter: false,
        animationRule: "linear",
        needleType: "line",
        needleStart: 75,
        needleEnd: 99,
        needleWidth: 3,
        borders: true,
        borderInnerWidth: 0,
        borderMiddleWidth: 0,
        borderOuterWidth: 10,
        colorBorderOuter: "#ccc",
        colorBorderOuterEnd: "#ccc",
        colorNeedleShadowDown: "#222",
        borderShadowWidth: 0,
        animationTarget: "plate",
        units: "ᵍ",
        title: "DIRECTION",
        fontTitleSize: 19,
        colorTitle: "#f5f5f5",
        animationDuration: 1500
    }).draw();*/

  }

  /*getData() {
    this.webapi.getData('WebService').then((data)=>{
      this.respondData = data;
      console.log(this.respondData);
      this.createBarChart();
     });
     
  }

  showStreets() {
    let other = [];
    let amts = [];
    
    for (var i = 0; i < this.respondData.length; i++) {
        other.push(this.respondData[i]);
    } 
   //get data
      for (var i = 0; i < other.length; i++) {
        amts.push(other[i].AMT);
      }
      return JSON.stringify(amts);
    }

    getLebel(){
        let other = [];
        let lebel = [];

        for (var i = 0; i < this.respondData.length; i++) {
            other.push(this.respondData[i]);
        } 
        //get lebel
        for (var i = 0; i < other.length; i++) {
            lebel.push(other[i].GROUP_NAME);
        }
        return JSON.stringify(lebel);
    }
    

  createBarChart(){
    let amt = JSON.parse(this.showStreets());
    console.log(amt);

    let lebel = JSON.parse(this.getLebel());
    console.log(lebel);


    this.barChart = new Chart(this.barCanvas.nativeElement, {
        type: 'bar',
        data: {
            labels: lebel,
            datasets: [{
                label: '# of Votes',
                data:amt,
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 206, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(153, 102, 255)',
                    'rgb(255, 159, 64)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
  
    });
  }*/

}
