import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { RestProvider } from '../../providers/rest/rest';

declare var google;

@IonicPage()
@Component({
  selector: 'page-chart',
  templateUrl: 'chart.html'
})
export class ChartPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public http: HttpClient,
    public webapi:RestProvider) {

  }
  
  responseData: any;

  ionViewDidLoad() {    
     this.drawChart();
  }

  drawChart() {

    let heroes= new Array();
    let arr = [];
   
    this.webapi.getData('TaxProductThisYear').then((data)=>{
      this.responseData = data;
      for (let i = 0; i <this.responseData.length; i++) {   
        heroes.push(this.responseData[i]);
        
      }
      //console.log(heroes); 
      /*for (let i = 0; i <heroes.length; i++) {  
      
        arr. push(heroes[i].GROUP_NAME,heroes[i].TAX);
     
      }*/
    });

    
    
    
    var data = google.visualization.arrayToDataTable([
      ['Task', 'Hours per Day'],
      ['test',6]   
    ]);

    var options = {
      title: 'รายงานภาษี',
      is3D: true,
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
    chart.draw(data, options);
  }

  //apiUrl = 'https://jsonplaceholder.typicode.com';

 /* apiUrl = "http://localhost:62657/api";

  user = { name: '', username: '', email: '', phone: '', website: '', address: { street: '', suite: '', city: '', zipcode: '', geo: { lat: '', lng: '' } }, company: { name: '', bs: '', catchPhrase: '' }};

  ionViewDidLoad() {

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
  }*/
 
}
