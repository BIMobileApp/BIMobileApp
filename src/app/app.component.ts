import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ContactPage } from '../pages/contact/contact';
import { WelcomePage } from '../pages/welcome/welcome';

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
      this.getUserLogin()
      this.initializeApp();

    

     // used for an example of ngFor and navigation
    this.pages = [
      { title: 'หน้าแรก', component: null,icon: 'BHome'},
      { title: 'ติดต่อเรา', component: ContactPage,icon: 'BContact' },
      { title: 'ออกจากระบบ', component: null,icon: 'BSignOut' }
    ];
    
  }


  initializeApp() {

   
    this.platform.ready().then(() => {
    
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      /* this.hideSplashScreen(); */
    });

  }

  /* hideSplashScreen() {
    if (this.splashScreen) {
      setTimeout(() => {
        this.splashScreen.hide();
      }, 3000);
     }
    } */


  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
   
    if(page.component) {
      this.nav.push(page.component);
  } else {
      // Since the component is null, this is the logout option
      // ...

      // logout logic
      // ...

      // redirect to home
      this.nav.setRoot(HomePage);
  }
  }

  getUserLogin(){
    this.offdesc = localStorage.offdesc;
    this.name = localStorage.username;
  }

}


