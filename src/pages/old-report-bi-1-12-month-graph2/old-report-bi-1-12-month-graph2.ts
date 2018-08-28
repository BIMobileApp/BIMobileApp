
import { Component,ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Chart } from 'chart.js';

@IonicPage()
@Component({
  selector: 'page-old-report-bi-1-12-month-graph2',
  templateUrl: 'old-report-bi-1-12-month-graph2.html',
})
export class OldReportBi_1_12MonthGraph2Page {
  @ViewChild('pieCanvas') pieCanvas;

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
      this.loadtax();
    });
  }

  loadData() {
    this.group_name=[];
    this.total_tax=[];
    for (var i = 0; i < this.respondData.length; i++) {
      this.group_name.push(this.respondData[i].GROUP_NAME);
      this.total_tax.push(this.respondData[i].TOTAL_TAX);
    }

    for (var j = 0; j < this.total_tax.length; j++) {
      if (this.total_tax[j] != 0) {
        this.flag = 1;
        break;
      }
    }

  }
  loadtax(){
    this.pieCanvas = new Chart(this.pieCanvas.nativeElement, {
      type: 'pie',
      data: {
          labels: this.group_name,
          datasets: [{
              label: this.group_name,
              data: this.total_tax,
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
          }],
          options: {
            responsive: true
          }
      }
  
    });
   }

  }
  

  