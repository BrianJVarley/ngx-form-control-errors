import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ElementRef,
} from '@angular/core';

@Component({
  template: `
    <label class="control-error" [class.hide-control]="hide">{{
      _text
    }}</label>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./control-error.component.scss'],
})
export class ControlErrorComponent {
  _text: string | null = null;
  hide = true;

  set customClass(className: string) {
    this.host.nativeElement.classList.add(className);
  }

  set text(value: string | null) {
    if (value !== this._text) {
      this._text = value;
      this.hide = !value;
      this.cdr.markForCheck();
    }
  }

  constructor(private cdr: ChangeDetectorRef, private host: ElementRef<HTMLElement>) {}
}