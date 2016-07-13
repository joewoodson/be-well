import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IntentionsService } from '../../providers/intentions-service/intentions-service';

/*
  Generated class for the HomePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/home/home.html',
})
export class HomePage {

  constructor(private nav: NavController, private intentionsService: IntentionsService) {

  }

  setAlarm(){
  	this.intentionsService.setAlarm();
  }

}
