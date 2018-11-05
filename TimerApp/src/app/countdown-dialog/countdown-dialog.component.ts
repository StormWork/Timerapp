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
  private hours: string[];

  private filteredHours: Observable<string[]>;
  private filteredMinutes: Observable<string[]>;
  private filteredSeconds: Observable<string[]>;

  constructor(private timeService: TimerService) {
    this.minutes = [];
    this.seconds = [];
    this.hours = [];

    for(let i = 0; i <= 120; i++){
      this.minutes.push((i).toString());
    }

    for(let i = 0; i < 60; i++){
      this.seconds.push((i).toString());
    }

    for(let i = 0; i < 24; i++){
      this.hours.push((i).toString());
    }

    this.inputForm = new FormGroup({
      hours: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      minutes: new FormControl(null, Validators.required),
      seconds: new FormControl(null, Validators.required),
      auto: new FormControl(true)
    });

    this.filteredHours = this.inputForm.controls['hours'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value, 2))
    );

    this.filteredMinutes = this.inputForm.controls['minutes'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value, 1))
    );

    this.filteredSeconds = this.inputForm.controls['seconds'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value, 0))
    );
  }

  private _filter(value: string, minutes: number): string[]{
    const filterValue = value.toLowerCase();

    if(minutes == 2) {
      return this.hours.filter(option => option.toLowerCase().includes(filterValue));
    } else if(minutes == 1) {
      return this.minutes.filter(option => option.toLowerCase().includes(filterValue));
    }else{
      return this.seconds.filter(option => option.toLowerCase().includes(filterValue));
    }
  }

  public onFormSubmit(): void{
    if(this.inputForm.valid){

      this.timeService.createCountdown(this.inputForm.value['name'], parseInt(this.inputForm.value['hours']), parseInt(this.inputForm.value['minutes']), parseInt(this.inputForm.value['seconds']), this.inputForm.value['auto']);

      this.inputForm.reset({
        name: null,
        hours: '',
        minutes: '',
        seconds: '',
        auto: this.inputForm.value['auto']
      });

      this.timeService.dialog = false;
    }
  }

  ngOnInit() {
  }

}
