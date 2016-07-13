import { Injectable } from '@angular/core';
import { Storage, SqlStorage } from 'ionic-angular';
import { LocalNotifications } from 'ionic-native'

@Injectable()
export class IntentionsService {
  storage: Storage = null;

  constructor() {
    this.storage = new Storage(SqlStorage);
  }

  setAlarm(){
    LocalNotifications.schedule({
      text: "Delayed Notification",
      at: new Date(new Date().getTime() + 1),
      led: "FF0000",
      sound: null
    });
  }

}

