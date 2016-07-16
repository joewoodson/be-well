import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Intention, IntentionsService } from '../../providers/intentions-service/intentions-service';

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
    // this.intentions = [
    //   {text: 'test 1', active: false, freq: 3},
    //   {text: 'test 2', active: true, freq: 6},
    //   {text: 'test 3', active: true, freq: 1}      
    // ]
  }

  private onPageDidEnter(){
    this.loadIntentions();
  }

}
