import { Injectable } from '@angular/core';
import {CountdownObject} from "./countdownObject";

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  private soundMuted: boolean = true;
  private countdownObjs: CountdownObject[] = [];
  private dialogVisible: boolean = false;

  private audioClip: any;

  private tick: any;

  constructor() {
    this.tick = setInterval(() => { this.doTick(); }, 100);
    this.audioClip = new Audio('assets/aegis.mp3');
    this.audioClip.loop = false;
  }


  private doTick(): void{
    let time = new Date().getTime();

    for(let countdown of this.countdownObjs){
      let endedBefore = countdown.ended;

      if(!countdown.paused)
        countdown.tick(time);

        if(countdown.ended && endedBefore != countdown.ended){
          this.playSound();
        }
    }
  }

  public playAll(): void{
    for(let countdown of this.countdownObjs){
      countdown.start();
    }
  }

  public pauseAll(): void{
    for(let countdown of this.countdownObjs){
      countdown.pause();
    }
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

    if(this.soundMuted){
      this.audioClip.pause();
      this.audioClip.currentTime = 0;
    }
  }

  public get countdowns(): CountdownObject[]{
    return this.countdownObjs;
  }

  public createCountdown(name: string, hours: number, minutes: number, seconds: number, immediateStart: boolean): void{
    let start = new Date().getTime();
    let paused = !immediateStart;
    let totalSeconds = (hours * 60 * 60) + (minutes * 60) + seconds;

    var newObject = new CountdownObject(name,
      totalSeconds,
      true);

    if(immediateStart) newObject.start();

    this.countdownObjs.unshift(newObject);
  }

  public deleteCountdown(countdownObj: CountdownObject): void{
    this.countdownObjs.splice(this.countdownObjs.indexOf(countdownObj), 1);
  }

  public playSound(): void{
    //if(this.audioClip.ended || !this.audioClip.played){

    if(!this.soundMuted) {
      if(this.audioClip.ended){
        this.audioClip.currentTime = 0;
      }

      this.audioClip.play();
    }
    //}
  }


}
