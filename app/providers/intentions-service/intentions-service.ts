import { Injectable } from '@angular/core';
import { Storage, SqlStorage } from 'ionic-angular';
import { LocalNotifications } from 'ionic-native'

export class Intention {
  id: number;
  text: string;
  active: boolean;
  freq: number;

  constructor(id: number, text: string, active: boolean, freq: number){
    this.id = id;
    this.text = text;
    this.active = active;
    this.freq =freq;
  }

}

@Injectable()
export class IntentionsService {
  storage: Storage = null;

  constructor() {
    this.storage = new Storage(SqlStorage, {name: 'be-wellDb'});
    this.storage.query('CREATE TABLE IF NOT EXISTS intentions (id INTEGER PRIMARY KEY, text TEXT, active TEXT, frequency INTEGER)');
  }

  public getIntentions(){
    return this.storage.query('SELECT * FROM intentions');
  }

  public setIntention(){
    LocalNotifications.schedule({
      text: "Delayed Notification",
      at: new Date(new Date().getTime() + 5000),
      led: "FF0000",
      sound: null
    });
  }

}

