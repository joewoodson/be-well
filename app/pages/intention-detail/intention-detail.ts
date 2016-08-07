import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { IntentionsService, Intention } from '../../providers/intentions-service/intentions-service';

@Component({
  templateUrl: 'build/pages/intention-detail/intention-detail.html',
})
export class IntentionDetailPage {
	intention: Intention;

  constructor(private nav: NavController, private params: NavParams, private intentionsService: IntentionsService) {
  	this.intention = params.get('intention');
  }

  saveIntention(intention){
    if(!intention.id && intention.active) {
      this.intentionsService.saveIntention(intention);
      this.intentionsService.setAlarm(intention);
      this.nav.pop();
    } else if(!intention.id) {
      this.intentionsService.saveIntention(intention);
      this.nav.pop();
    } else {
      this.intentionsService.updateIntention(intention);
      this.nav.pop();
    }
  }

  deleteIntention(intention){
    if(!intention.id) {
      this.nav.pop();
    } else {
      this.intentionsService.deleteIntention(intention);
      this.nav.pop();
    }
  }

}
