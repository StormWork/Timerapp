import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CountdownEntityComponent } from './countdown-entity/countdown-entity.component';
import { CountdownDialogComponent } from './countdown-dialog/countdown-dialog.component';
import { NavbarComponent } from './navbar/navbar.component';
import {TimerService} from "./timer-service.service";
import {
  MatAutocompleteModule, MatButtonModule, MatCheckboxModule, MatFormField, MatFormFieldModule, MatInputModule,
  MatOption,
  MatOptionModule,
  MatSliderModule
} from "@angular/material";
import {FormControlDirective, FormGroupDirective, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    CountdownEntityComponent,
    CountdownDialogComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,

  ],
  providers: [TimerService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
