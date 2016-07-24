import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Intention, IntentionsService } from '../../providers/intentions-service/intentions-service';
import { IntentionDetailPage } from '../intention-detail/intention-detail';

@Component({
  templateUrl: 'build/pages/intentions-list/intentions-list.html',
})
export class IntentionsListPage {
	intentions: Intention[];

  constructor(private nav: NavController, private intentionsService: IntentionsService) {
  	// this.intentionsService.getIntentions()
   //  .then(intentions => {
   //    this.intentions = intentions;
   //    console.log(this.intentions);
   //  });
  }

  private loadIntentions(){
    this.intentions = [];
    this.intentionsService.getIntentions().then(
      data => {
        this.intentions = [];
        if (data.res.rows.length > 0) {
          for (var i = 0; i < data.res.rows.length; i++) {
            let item = data.res.rows.item(i);
            this.intentions.push(new Intention(item.id, item.text, item.active, item.freq));
          }
        }
      });
  }

  public addIntention(intention){
    intention = {active: true};
    this.nav.push(IntentionDetailPage, { intention });
  }

  public intentionSelected(e, intention){
    console.log(e.target.tagName);
    if (e.target.tagName !== 'ION-TOGGLE' && e.target.tagName !== 'BUTTON') {
      this.nav.push(IntentionDetailPage, { intention });
    }
  }

  public toggleActive(intention){
    this.intentionsService.updateActive(intention);
  }

  private ionViewWillEnter(){
    this.loadIntentions();
  }

}
