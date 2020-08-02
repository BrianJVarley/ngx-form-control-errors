import { NgModule, ModuleWithProviders } from '@angular/core';
import { ControlErrorContainerDirective } from './directives/control-error-container.directive';
import { ControlErrorDirective } from './directives/control-errors.directive';
import { FormSubmitDirective } from './directives/form-submit.directive';

import { ControlErrorComponent } from './components/control-error/control-error.component';

import { CommonModule } from '@angular/common';

const api = [
  ControlErrorComponent,
  ControlErrorContainerDirective,
  ControlErrorDirective,
  FormSubmitDirective,
];

@NgModule({
  declarations: [
    ControlErrorComponent,
    ControlErrorContainerDirective,
    ControlErrorDirective,
    FormSubmitDirective,
  ],
  imports: [CommonModule],
  exports: [api],
  entryComponents: [ControlErrorComponent],
})
export class NgxFormControlErrorsModule {
  // TODO: If errors need to be extended with pre-translated erorrs
  // implement this static method in app.module
  // static forRoot(config: any = {}): ModuleWithProviders<any> {
  //   return {
  //     ngModule: NgxFormControlErrorsModule,
  //     providers: [
  //       {
  //         provide: FORM_ERRORS,
  //         ...config.errors
  //       } as any
  //     ]
  //   };
  // }
}
