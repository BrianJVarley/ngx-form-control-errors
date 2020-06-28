import { NgModule, ModuleWithProviders } from '@angular/core';
import { ControlErrorContainerDirective } from './directives/control-error-container.directive';
import { ControlErrorsDirective } from './directives/control-errors.directive';
import { FormSubmitDirective } from './directives/form-submit.directive';

import { ControlErrorComponent } from './components/control-error/control-error.component';

import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    ControlErrorComponent,
    ControlErrorContainerDirective,
    ControlErrorsDirective,
    FormSubmitDirective,
  ],
  imports: [CommonModule],
  exports: [ ControlErrorComponent,  
    ControlErrorContainerDirective,
    ControlErrorsDirective,
    FormSubmitDirective,],
  entryComponents: [ControlErrorComponent]
})
export class NgxFormControlErrorsModule {
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