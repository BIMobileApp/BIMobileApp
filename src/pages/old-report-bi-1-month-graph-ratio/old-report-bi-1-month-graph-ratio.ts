import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Chart } from 'chart.js';

@IonicPage()
@Component({
  selector: 'page-old-report-bi-1-month-graph-ratio',
  templateUrl: 'old-report-bi-1-month-graph-ratio.html',
})
export class OldReportBi_1MonthGraphRatioPage {

  @ViewChild('doughnutCanvas') doughnutCanvas;

  respondData:any;
  group_name = [];
  total_tax = [];

  doughnutChart:any;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public webapi: RestProvider) {
  }

  ionViewDidLoad() {
    this.webapi.getData('OldREPORT_BI_1_MONTH_GRAPH_RATIO').then((data) => {
      this.respondData = data;
      this.loadData();
      this.loadtax();
    }); 
  }

  loadData(){
    for (var i = 0; i < this.respondData.length; i++) {
        this.group_name.push(this.respondData[i].GROUP_NAME_NEW);
        this.total_tax.push(this.respondData[i].TOTAL_TAX);
    }
 }

 loadtax(){
  this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

    type: 'pie',
    data: {
        labels:this.group_name,
        datasets: [{
            label:this.group_name,
            data: this.total_tax,
            backgroundColor: [
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)'
            ],
            hoverBackgroundColor: [
                "#FFCE56",
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#FF6384" 
            ]
        }]
    }

  });
 }

}
