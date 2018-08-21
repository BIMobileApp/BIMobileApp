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

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public webapi: RestProvider) {
  }

  ionViewDidLoad() {
    this.webapi.getData('OldREPORT_BI_1_12MONTH_GRAPH').then((data) => {
      this.respondData = data;
      this.loadGroupName();
      this.tax_load();
      this.load_chart();
    }); 
  }
  /*public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  
  public barChartLabels:string[];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  public barChartData:any[] = [{data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'}];*/
 
  // events
  /*public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }*/

  loadGroupName(){
    for (var i = 0; i < this.respondData.length; i++) {
      this.group_name.push(this.respondData[i].GROUP_NAME_NEW); 
      this.tax_color.push('rgba(255, 99, 132, 0.2)');
      this.tax_boder_color.push('rgba(255,99,132,1)');
      this.taxly_color.push('rgba(54, 162, 235, 0.2)');
      this.taxly_boder_color.push('rgba(54, 162, 235, 1)');
      this.est_color.push('rgba(255, 159, 64, 0.2)');
      this.est_boder_color.push('rgba(255, 159, 64, 1)');
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
                backgroundColor: this.tax_color,
                borderColor:this.tax_boder_color,
                borderWidth: 1
            },
            {
              label: 'ปีก่อน',
              data: this.taxly_val,               
              backgroundColor: this.taxly_color,
              borderColor: this.taxly_boder_color,
              borderWidth: 1
          },
          {
            label: 'ประมาณการ',
            data: this.taxest_val,               
            backgroundColor: this.est_color,
            borderColor: this.est_boder_color,
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
}

}
