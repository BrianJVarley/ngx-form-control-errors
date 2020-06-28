import { Directive, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: 'form[NgxFormControlErrors]'
})
export class FormSubmitDirective {
  submit$ = fromEvent(this.element, 'submit')
    .pipe(tap(() => {
      if (this.element.classList.contains('form-submitted') === false) {
        this.element.classList.add('form-submitted');
      }
    }), shareReplay({ refCount: true, bufferSize: 1 }));

  constructor(private host: ElementRef<HTMLFormElement>) { }

  get element(): Element {
    return this.host.nativeElement;
  }
}