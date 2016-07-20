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
    this.storage.query('CREATE TABLE IF NOT EXISTS intentions (text TEXT, active TEXT, frequency INTEGER)');
    this.storage.query('INSERT INTO intentions (text, active, frequency) VALUES (?,?,?)', ['this is a test intention', true, 3]);
    this.storage.query('INSERT INTO intentions (text, active, frequency) VALUES (?,?,?)', ['another one', true, 3]);
  }

  public getIntentions(){
    return this.storage.query('SELECT * FROM intentions');
    // return [
    //   {id: 1,text: 'test 1', active: false, freq: 3},
    //   {id: 1,text: 'test 2', active: true, freq: 6},
    //   {id: 1,text: 'test 3', active: true, freq: 1}      
    // ]
  }

  public saveIntention(){

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

