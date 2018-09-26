import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {map, startWith} from "rxjs/internal/operators";
import {Observable} from "rxjs/index";
import {TimerService} from "../timer-service.service";

@Component({
  selector: 'app-countdown-dialog',
  templateUrl: './countdown-dialog.component.html',
  styleUrls: ['./countdown-dialog.component.css'],
})
export class CountdownDialogComponent implements OnInit {

  @Input('display') popupVisible: boolean = false;

  private inputForm: FormGroup;
  private minutes: string[];
  private seconds: string[];

  private filteredMinutes: Observable<string[]>;
  private filteredSeconds: Observable<string[]>;

  constructor(private timeService: TimerService) {
    this.minutes = [];
    this.seconds = [];

    for(let i = 0; i <= 120; i++){
      this.minutes.push((i).toString());
    }

    for(let i = 0; i < 60; i++){
      this.seconds.push((i).toString());
    }

    this.inputForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      minutes: new FormControl(null, Validators.required),
      seconds: new FormControl(null, Validators.required),
      auto: new FormControl(true)
    });

    this.filteredMinutes = this.inputForm.controls['minutes'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value, true))
    );

    this.filteredSeconds = this.inputForm.controls['seconds'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value, false))
    );
  }

  private _filter(value: string, minutes: boolean): string[]{
    const filterValue = value.toLowerCase();

    if(minutes) {
      return this.minutes.filter(option => option.toLowerCase().includes(filterValue));
    }else{
      return this.seconds.filter(option => option.toLowerCase().includes(filterValue));
    }
  }

  public onFormSubmit(): void{
    if(this.inputForm.valid){

      this.timeService.createCountdown(this.inputForm.value['name'], parseInt(this.inputForm.value['minutes']), parseInt(this.inputForm.value['seconds']), this.inputForm.value['auto']);

      this.inputForm.reset();

      this.timeService.dialog = false;
    }
  }

  ngOnInit() {
  }

}
