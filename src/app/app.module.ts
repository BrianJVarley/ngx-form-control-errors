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
    NgxFormControlErrorsModule.forRoot({
      errors: {
        useFactory() {
          return {
            required: 'This field is required (custom error message, supplied in NgxFormControlErrorsModule config)',
            minlength: ({ requiredLength, actualLength }) => `Expect ${requiredLength} but got ${actualLength}`,
            invalidAddress: error => `Address not valid`
          };
        },
        deps: []
      }
      //controlErrorComponent: CustomControlErrorComponent, // Uncomment to see errors being rendered using a custom component
      //controlErrorComponentAnchorFn: controlErrorComponentAnchorFn // Uncomment to see errors being positioned differently
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
