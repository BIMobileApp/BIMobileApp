import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Test1Page } from '../test1/test1';
import { DisableSideMenu } from '../../customDecorators/disable-side-menu.decorator'; 

@DisableSideMenu()
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public app:App) {
  }

  ionViewDidLoad() {
   
  }
  gotoHomePage(){
    this.app.getRootNav().push(HomePage);  
  }
  
}

