import {Component, OnInit} from '@angular/core';
import {TimerService} from "./timer-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TimerApp';

  public constructor(private timerService: TimerService): void{
    //this.timerService.createCountdown("Galaxy", 25, 0, false);
  }

  ngOnInit(){
    //this.timerService.createCountdown("Galaxy", 25, 0, false);
  }

  private openDialog(): void{

  }

}
