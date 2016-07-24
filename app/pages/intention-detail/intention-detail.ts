import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { IntentionsService, Intention } from '../../providers/intentions-service/intentions-service';

/*
  Generated class for the IntentionDetailPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/intention-detail/intention-detail.html',
})
export class IntentionDetailPage {
	intention: Intention;

  constructor(private nav: NavController, private params: NavParams, private intentionsService: IntentionsService) {
  	this.intention = params.get('intention');
  }

  saveIntention(intention){
    if(!intention.id) {
      this.intentionsService.saveIntention(intention);
      this.nav.pop();
    } else {
      this.intentionsService.updateIntention(intention);
      this.nav.pop();
    }

  }

}