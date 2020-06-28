import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFormControlErrorsModule } from 'ngx-form-control-errors';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxFormControlErrorsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
