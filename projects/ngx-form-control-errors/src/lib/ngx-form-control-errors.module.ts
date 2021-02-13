import { NgModule, ModuleWithProviders } from '@angular/core';
import { ControlErrorContainerDirective } from './directives/control-error-container.directive';
import { ControlErrorDirective } from './directives/control-errors.directive';
import { FormSubmitDirective } from './directives/form-submit.directive';

import { ControlErrorComponent } from './components/control-error/control-error.component';

import { CommonModule } from '@angular/common';
import { FormControlErrorsConfig, FormControlErrorsConfigProvider, FORM_ERRORS } from './providers/form-errors';

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
  static forRoot(config: FormControlErrorsConfig = {}): ModuleWithProviders<NgxFormControlErrorsModule> {
    return {
      ngModule: NgxFormControlErrorsModule,
      providers: [
        {
          provide: FormControlErrorsConfigProvider,
          useValue: config
        },
        {
          provide: FORM_ERRORS,
          ...config.errors
        } as any
      ]
    };
  }
}
