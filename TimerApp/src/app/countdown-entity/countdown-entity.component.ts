import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import * as $ from 'jquery';
import {CountdownObject} from "../countdownObject";

@Component({
  selector: 'countdown-entity',
  templateUrl: './countdown-entity.component.html',
  styleUrls: ['./countdown-entity.component.css'],
})
export class CountdownEntityComponent implements OnInit, AfterViewInit {

  @Input('countdownObject') countdownObject: CountdownObject;

  @ViewChild('backgroundWrap') background;
  private backgroundQuery: any;
  private playing: boolean;

  constructor() { }

  ngOnInit() {
    this.playing = false;
  }

  ngAfterViewInit(){
    if(this.background){
      this.backgroundQuery = $(this.background.nativeElement);
    }
  }

  private entityClicked(): void{
    if(this.playing){
      this.backgroundQuery.find(".countdown-inner-wrap").eq(0).stop();
    }else{
      this.backgroundQuery.find(".countdown-inner-wrap").eq(0).animate({
        top: "-600px"
      }, 10000);
    }

    this.playing = !this.playing;
  }

}
