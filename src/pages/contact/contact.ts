import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

<<<<<<< HEAD
<<<<<<< HEAD
=======
declare let google;

>>>>>>> cd968405eaac6f7e4e52101aef859a4632643452
=======
declare let google;

>>>>>>> f3812276120e39062cb7df4a27b41b2cd4d04d51
@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  @ViewChild('map') mapElement: ElementRef; 
  map: any; 

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public geolocation: Geolocation) {
  }

  ionViewDidLoad() {
   this.loadMap();
  }
  
 loadMap() {
  this.geolocation.getCurrentPosition().then((position) => {      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);      let mapOptions = {        center: latLng,        zoom: 15,        mapTypeId: google.maps.MapTypeId.ROADMAP      }     
  this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);    }, (err) => {      console.log(err);    }); 
   /* let lat = 13.7620638;
    let ing = 100.5577409;
    let latLng = new google.maps.LatLng(lat, ing);   
    let mapOptions = {center: latLng, zoom: 15, mapTypeId: google.maps.MapTypeId.ROADMAP }    
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    //Marker
    new google.maps.Marker({
      position:latLng,
      map:this.map,
      icon:"../assets/icon/iconShop.png"
    });*/
  }

}

