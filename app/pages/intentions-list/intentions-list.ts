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
            item.freq = this.convertFreq(item.freq);
            this.intentions.push(new Intention(item.id, item.text, item.active, item.freq));
          }
        }
      });
  }

  public convertFreq(freq){
    switch(freq) {
      case 1:
        return "once a day";
      case 2:
        return "twice a day";
      case 3:
        return "three times a day";
      default:
        return "several times a day";
    }
  }

  public addIntention(intention){
    intention = {active: true};
    this.nav.push(IntentionDetailPage, { intention });
  }

  public intentionSelected(e, intention){
    if (e.target.tagName !== 'ION-TOGGLE' && e.target.tagName !== 'BUTTON' && e.target.tagName !== 'SPAN') {
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
