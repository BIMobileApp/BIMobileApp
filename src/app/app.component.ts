import { Component, ViewChild } from '@angular/core';
import {Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ContactPage } from '../pages/contact/contact';
import { WelcomePage } from '../pages/welcome/welcome';
import {Injectable, Inject} from  '@angular/core';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = WelcomePage;
  pages: Array<{title: string, component: any, icon: string}>;
  offdesc : any;
  name : any;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen) {
    this.offdesc = localStorage.offdesc;
    this.name = localStorage.username;
    this.initializeApp();
     // used for an example of ngFor and navigation
    this.pages = [
      { title: 'หน้าแรก', component: HomePage,icon: 'BHome'},
      { title: 'ติดต่อเรา', component: ContactPage,icon: 'BContact' },
      { title: 'ออกจากระบบ', component: HomePage,icon: 'BSignOut' }
    ];
    
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
  }

}


