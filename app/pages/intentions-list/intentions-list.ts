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

  // setIntention(){
  // 	this.intentionsService.setIntention();
  // }

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
    // this.intentionsService.getIntentions().then(
    //   data => {
    //     console.log(data);
    //     this.intentions = data;
    //   }
    // )
  }

  public addIntention(intention){
    intention = {};
    this.nav.push(IntentionDetailPage, { intention });
  }

  public intentionSelected(intention){
    this.nav.push(IntentionDetailPage, { intention });
  }

  private ionViewWillEnter(){
    this.loadIntentions();
  }

}
