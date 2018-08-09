import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { ViewChild } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the Test2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-test2',
  templateUrl: 'test2.html',
})
export class Test2Page {
  @ViewChild('barCanvas') barCanvas;

  barChart: any;
  respondData: any;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http: HttpClient,
    public webapi:RestProvider) {

        this.getData();
  }

  apiUrl = "http://localhost:62657/api";

  
  ionViewDidLoad() {
    
    
  }

  getData() {
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
  }

}
