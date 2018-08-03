import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { ViewChild } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the ChartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chart',
  templateUrl: 'chart.html',
})
export class ChartPage {
  @ViewChild('barCanvas') barCanvas;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('lineCanvas') lineCanvas;

  barChart: any;
  doughnutChart: any;
  lineChart: any;

  respondData: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public http: HttpClient,
    public webapi:RestProvider) {

        //this.getUsers();

        this.getUsers();

  }

  //apiUrl = 'https://jsonplaceholder.typicode.com';

  apiUrl = "http://localhost:62657/api";

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
  }

  

  getUsers() {
    /* let headers = new HttpHeaders();
     //headers.append('Authorization','Basic YWRtaW46MTIzNDU2');
     headers.append('Content-Type','application/json');
 
     this.http.get(this.apiUrl+'/Test',{headers:headers}).subscribe(data => {
        console.log(data);
        this.respondData = data;
       }, err => {
         console.log(err);
     });
   }*/
 
   this.webapi.getData('Test').then((data)=>{
     // console.log(result);
     this.respondData = data;
    });
   }

  /*getUsers() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/users').subscribe(data => {
          alert( resolve(data));
         resolve(data);
      }, err => {
          alert(err);
        //console.log(err);
      });
    });
  }*/

}
