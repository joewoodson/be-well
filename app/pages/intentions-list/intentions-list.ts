import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IntentionsService } from '../../providers/intentions-service/intentions-service';

@Component({
  templateUrl: 'build/pages/intentions-list/intentions-list.html',
})
export class IntentionsListPage {
	intentions: any;

  constructor(private nav: NavController, private intentionsService: IntentionsService) {
  	this.intentionsService.getIntentions()
    .then(intentions => {
      this.intentions = intentions;
      console.log(this.intentions);
    });
  }

  setIntention(){
  	this.intentionsService.setIntention();
  }

}
