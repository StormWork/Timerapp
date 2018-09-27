import { Component, OnInit } from '@angular/core';
import {TimerService} from "../timer-service.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public timerService: TimerService) { }

  ngOnInit() {
  }

}
