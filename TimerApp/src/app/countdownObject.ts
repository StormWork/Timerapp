import {TimerService} from "./timer-service.service";
export class CountdownObject{

  private now: number;
  private completed: boolean;
  private percentageComplete: number;

  private startTime: number;
  private timePassed: number;

  private timeMinutes: string;
  private timeSeconds: string;
  private timeHours: string;

  constructor(public name: string, public seconds: number, public paused: boolean){
    this.now = new Date().getTime() / 1000;

    this.completed = false;
    this.percentageComplete = 0;
    this.startTime = -1;
    this.timePassed = 0;

    this.timeMinutes = "00";
    this.timeSeconds = "00";
    this.timeHours = "00";

    this.initialiseTime(this.seconds);
  }

  private initialiseTime(seconds: number): void{
    let hours = Math.floor(seconds / (60 * 60));

    let minutes = Math.floor((seconds - (hours * 60 * 60)) / 60);
    let secondsB = seconds - (minutes * 60) - (hours * 60 * 60);

    if(hours <= 0){
      this.timeHours = "00";
    }else if(hours < 10){
      this.timeHours = "0" + hours.toString();
    }else{
      this.timeHours = hours.toString();
    }

    if(minutes <= 0){
      this.timeMinutes = "00";
    }else if(minutes < 10){
      this.timeMinutes = "0" + minutes.toString();
    }else{
      this.timeMinutes = minutes.toString();
    }

    if(secondsB <= 0){
      this.timeSeconds = "00";
    }else if(secondsB < 10){
      this.timeSeconds = "0" + secondsB.toString();
    }else{
      this.timeSeconds = secondsB.toString();
    }
  }

  public restart(): void{
    this.startTime = -1;
    this.completed = false;
    this.timePassed = 0;
    this.percentageComplete = 0;

    this.initialiseTime(this.seconds);

    //this.start();
  }

  public get percentage(): number{
    return this.percentageComplete;
  }

  public get minutesString(): string{
    return this.timeMinutes;
  }

  public get secondsString(): string{
    return this.timeSeconds;
  }

  public get hoursString(): string{
    return this.timeHours;
  }

  public start(): void{
    if(this.completed) return;
    if(!this.paused) return;

    let currentTime = new Date().getTime();

    this.startTime = currentTime;
    this.paused = false;
  }

  public pause(): void{
    let currentTime = new Date().getTime();

    if(this.startTime != -1){
      this.timePassed += currentTime - this.startTime;
    }

    this.paused = true;
  }

  public tick(timeInSeconds: number): void{
    if(this.paused) return;

    let totalTimePassed = this.timePassed + (timeInSeconds - this.startTime);
    let totalTimePassedInSeconds = totalTimePassed / 1000;

    if(totalTimePassedInSeconds >= this.seconds){
      this.completed = true;
      this.paused = true;
      this.percentageComplete = 1;
      //this.timerService.playSound();
    }else{
      this.percentageComplete = totalTimePassedInSeconds / this.seconds;
    }

    this.initialiseTime(this.seconds - Math.floor(totalTimePassedInSeconds));
  }

  public get ended(): boolean{
    return this.completed;
  }
}
