import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[controlErrorContainer]',
  exportAs: 'controlErrorContainer'
})
export class ControlErrorContainerDirective {

  constructor(public vcr: ViewContainerRef) { }

}

