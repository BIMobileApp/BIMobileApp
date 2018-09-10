import { Component,ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Chart } from 'chart.js';

@IonicPage()
@Component({
  selector: 'page-old-report-bi-1-12-month-graph',
  templateUrl: 'old-report-bi-1-12-month-graph.html',
})
export class OldReportBi_1_12MonthGraphPage {

  @ViewChild('barCanvas') barCanvas;

  respondData:any;
  group_name = [];
  tax_val = [];
  taxly_val = [];
  taxest_val = [];
  label_group_name =[];
  tax_color = [];
  taxly_color = [];
  tax_boder_color = [];
  taxly_boder_color = [];
  est_color = [];
  est_boder_color = [];
 

  barChart: any;
  username:any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public webapi: RestProvider) {
      this.username = localStorage.userData;
  }

  ionViewDidLoad() {
    this.webapi.getData('OldREPORT_BI_1_12MONTH_GRAPH').then((data) => {
      this.respondData = data;
      this.loadGroupName();
      this.tax_load();
      this.load_chart();
    }); 
  }
  loadGroupName(){
    for (var i = 0; i < this.respondData.length; i++) {
      this.group_name.push(this.respondData[i].GROUP_NAME); 
     }
    this.label_group_name = this.group_name;
  }
  tax_load(){
    for (var i = 0; i < this.respondData.length; i++) {
       this.tax_val.push((this.respondData[i].TAX_NETTAX_AMT / 1000000));       
       this.taxly_val.push((this.respondData[i].LAST_TAX_NETTAX_AMT  / 1000000));
       this.taxest_val.push((this.respondData[i].ESTIMATE  / 1000000));
    }
  }
  
 load_chart(){
      this.barChart = new Chart(this.barCanvas.nativeElement, {
        type: 'bar',
        data: {
            labels: this.label_group_name,
            datasets: [{
                label: 'ปีนี้',
                data: this.tax_val,               
                backgroundColor: 'rgba(255,99,132,1)',
                borderColor:'rgba(255,99,132,1)',
                borderWidth: 1
            },
            {
              label: 'ปีก่อน',
              data: this.taxly_val,               
              backgroundColor: 'rgba(54, 162, 235, 1)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
          },
          {
            label: 'ประมาณการ',
            data: this.taxest_val,               
            backgroundColor: 'rgba(255, 159, 64, 1)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1
        }]
        },
        options: {
          legend: {
            display: true,
            labels: {
                boxWidth: 10,
            }
        },
        tooltips: {
          mode: 'index',
          label: 'myLabel',
          callbacks: {
            label: function (tooltipItem, data) {
              if (tooltipItem.yLabel > 999999) {
                var value = data.datasets[tooltipItem.datasetIndex].label + ': ' + (tooltipItem.yLabel / 1000000).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " ล้านบาท";
              } else {
                var value = data.datasets[tooltipItem.datasetIndex].label + ': ' + tooltipItem.yLabel.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " บาท";
              }
    
              return value;
            }
          } // end callbacks:
        }, //end tooltip
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                userCallback: function (value, index, values) {
                  
                    value = (value / 1000000);
                    value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    return value;
                  
                 
                }
              },
              scaleLabel: {
                display: true,
                labelString: "ล้านบาท",
              }
            }
            ],
            xAxes: [{
              ticks: {
                autoSkip: false,
                maxRotation: 90,
                minRotation: 0
              }
            }]
          }
        }
  
      });
    }
  
  }
  