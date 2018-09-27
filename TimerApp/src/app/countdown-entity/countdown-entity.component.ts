import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import * as $ from 'jquery';
import {CountdownObject} from "../countdownObject";
import {TimerService} from "../timer-service.service";

@Component({
  selector: 'countdown-entity',
  templateUrl: './countdown-entity.component.html',
  styleUrls: ['./countdown-entity.component.css'],
})
export class CountdownEntityComponent implements OnInit, AfterViewInit {

  @Input('countdownObject') countdownObject: CountdownObject;
  @Input('countdownProgress') percentage: number;

  @ViewChild('backgroundWrap') background;
  private backgroundQuery: any;

  constructor(private timerService: TimerService) { }

  ngOnInit() {

  }

  ngAfterViewInit(){
    if(this.background){
      this.backgroundQuery = $(this.background.nativeElement);
    }
  }

  public deleteSelf(): void{
    this.timerService.deleteCountdown(this.countdownObject);
  }

  public getTop(): number{
    return -500 * this.percentage;
  }

}
