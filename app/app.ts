import { Component, ViewChild } from '@angular/core';
import { ionicBootstrap, Platform, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { IntentionsService } from './providers/intentions-service/intentions-service';

import { HomePage } from './pages/home/home';
import { IntentionsListPage } from './pages/intentions-list/intentions-list';

@Component({
  templateUrl: 'build/app.html',
  providers: [IntentionsService]
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(private platform: Platform, private intentionsService: IntentionsService) {
    this.initializeApp();

    this.pages = [
      { title: 'Home', component: HomePage },   
      { title: 'Intentions', component: IntentionsListPage } 
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

ionicBootstrap(MyApp);
