import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Chart } from 'chart.js';

@IonicPage()
@Component({
  selector: 'page-old-report-bi-1-12-month-graph2',
  templateUrl: 'old-report-bi-1-12-month-graph2.html',
})
export class OldReportBi_1_12MonthGraph2Page {

  @ViewChild('doughnutCanvas') doughnutCanvas;

  respondData: any;
  group_name = [];
  total_tax = [];

  doughnutChart: any;
  flag = 0;
  isZero: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public webapi: RestProvider) {
  }

  ionViewDidLoad() {
    this.webapi.getData('OldREPORT_BI_1_12MONTH_GRAPH2').then((data) => {
      this.respondData = data;
      this.loadData();

    });
  }

  loadData() {
    this.group_name=[];
    this.total_tax=[];
    for (var i = 0; i < this.respondData.length; i++) {
      this.group_name.push(this.respondData[i].GROUP_NAME);
      this.total_tax.push(this.respondData[i].TOTAL_TAX);
    }

    for (var i = 0; i < this.total_tax.length; i++) {
      if (this.total_tax[i] != 0) {
        this.flag = 1;
        break;
      }
    }

    
  }


  loadtax(){
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
  
      type: 'pie',
      data: {
          labels: ["3","4","5","6"],
          datasets: [{
              label: ["3","4","5","6"],
              data: ["30","40","20","10"],
              backgroundColor: [
                  'rgba(255, 159, 64, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)'
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

   createChart(){
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
 
      type: 'doughnut',
      data: {
          labels: ["BJP", "Congress", "AAP", "CPM", "SP"],
          datasets: [{
              label: '# of Votes',
              data: [50, 29, 15, 10, 7],
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
  