import { Injectable } from '@angular/core';
import { Storage, SqlStorage } from 'ionic-angular';
import { LocalNotifications } from 'ionic-native'

@Injectable()
export class IntentionsService {
  storage: Storage = null;
  public alarms: any;

  constructor() {
    this.storage = new Storage(SqlStorage);
  }

  getIntentions(){
    return LocalNotifications.getAll();
  }

  setIntention(){
    LocalNotifications.schedule({
      text: "Delayed Notification",
      at: new Date(new Date().getTime() + 15000),
      led: "FF0000",
      sound: null
    });
  }

}

