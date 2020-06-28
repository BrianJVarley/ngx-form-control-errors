import { NgModule } from '@angular/core';
import {
  ControlErrorsDirective,
  ControlErrorContainerDirective,
  ControlErrorComponent,
  FormSubmitDirective,
} from '../public-api';
import { CommonModule } from '@angular/common';


const api = [
  ControlErrorComponent,  
  ControlErrorContainerDirective,
  ControlErrorsDirective,
  FormSubmitDirective,
];

@NgModule({
  declarations: [
    ControlErrorContainerDirective,
    ControlErrorsDirective,
    ControlErrorComponent,
    FormSubmitDirective,
  ],
  imports: [CommonModule],
  exports: [api],
  entryComponents: [ControlErrorComponent]
})
export class NgxFormControlErrorsModule {}

/**
 * Example extending module to accept cofig object / providers
 */
// @NgModule({
//   declarations: [ControlErrorsDirective, ControlErrorAnchorDirective, ControlErrorComponent, FormSubmitDirective],
//   imports: [CommonModule],
//   exports: [api],
//   entryComponents: [ControlErrorComponent]
// })
// export class ErrorTailorModule {
//   static forRoot(config: ErrorTailorConfig = {}): ModuleWithProviders {
//     return {
//       ngModule: ErrorTailorModule,
//       providers: [
//         {
//           provide: ErrorTailorConfigProvider,
//           useValue: config
//         },
//         {
//           provide: FORM_ERRORS,
//           ...config.errors
//         } as any
//       ]
//     };
//   }
// }
