import { Injectable } from '@angular/core';
import { Storage, SqlStorage } from 'ionic-angular';
import { LocalNotifications } from 'ionic-native'

export class Intention {
  id: number;
  text: string;
  active: number;
  freq: number;

  constructor(id: number, text: string, active: number, freq: number){
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
    this.storage.query('CREATE TABLE IF NOT EXISTS intentions (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT, active INTEGER, freq INTEGER)');
  }

  public getIntentions(){
    return this.storage.query('SELECT * FROM intentions');
  }

  public saveIntention(intention){
    this.storage.query('INSERT INTO intentions (text, active, freq) VALUES (?,?,?)', [intention.text, intention.active, intention.freq]);
    this.storage.query('SELECT last_insert_rowid()').then(
      data => {
        var latestId = data.res.rows[0]["last_insert_rowid()"];
        console.log(latestId);
      });
  }

  public updateIntention(intention){
    this.storage.query('UPDATE intentions SET text = \"' + intention.text + '\", active = \"' + intention.active + '\", freq = \"' + intention.freq + '\" WHERE id = \"' + intention.id + '\"');
  }

  public updateActive(intention){
    let active = intention.active;
    this.storage.query('UPDATE intentions SET active = \"' + active + '\" WHERE id = \"' + intention.id + '\"');

    if (active) {
      this.setAlarm(intention);
    } else {
      this.cancelAlarm(intention.id);
    }
  }

  public setAlarm(intention){
    console.log(intention.id);
    console.log(intention.text);
    console.log(LocalNotifications.getAll());
    LocalNotifications.schedule({
      id: intention.id,
      text: intention.text,
      at: new Date(new Date().getTime() + 10000),
      led: "FF0000",
      sound: null
    });
    console.log(LocalNotifications.get(intention.id));
  }

  public cancelAlarm(id){
    LocalNotifications.cancel(id);
  }

}
