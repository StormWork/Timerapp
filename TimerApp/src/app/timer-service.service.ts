import { Injectable } from '@angular/core';
import {CountdownObject} from "./countdownObject";

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  private soundMuted: boolean = true;
  private countdownObjs: CountdownObject[] = [];
  private dialogVisible: boolean = false;

  /**
   * Countdown Object example =
   * {
   *  name: "name here",
   *  start: 967578575488754,
   *  end: 96865758776585
   *  paused: false
   *
   * }
   */

  constructor() {

  }

  public get dialog(): boolean{
    return this.dialogVisible;
  }

  public set dialog(val: boolean){
    this.dialogVisible = val;
  }

  public get muted(): boolean{
    return this.soundMuted;
  }

  public set muted(val: boolean){
    this.soundMuted = val;
  }

  public get countdowns(): CountdownObject[]{
    return this.countdownObjs;
  }

  public createCountdown(name: string, minutes: number, seconds: number, immediateStart: boolean): void{
    let start = new Date().getTime() / 1000;
    let end = start + (minutes * 60) + seconds;
    let paused = !immediateStart;
    let totalSeconds = (minutes * 60) + seconds;

    this.countdownObjs.push(new CountdownObject(
      name,
      totalSeconds,
      paused
    ));
  }


}
