import {
  Directive,
  Optional,
  Inject,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentRef,
  Input,
  Host,
  OnInit,
  OnDestroy,
  Self,
} from '@angular/core';
import { NgControl, ControlContainer, AbstractControl } from '@angular/forms';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { FORM_ERRORS } from '../providers/form-errors';
import { ControlErrorComponent } from '../components/control-error/control-error.component';
import { ControlErrorContainerDirective } from './control-error-container.directive';
import { FormSubmitDirective } from './form-submit.directive';
import { merge, EMPTY, Observable, Subject } from 'rxjs';

@Directive({
  selector:
    '[formControlName]:not([controlErrorsIgnore]), [formControl]:not([controlErrorsIgnore]), [formGroup]:not([controlErrorsIgnore]), [formGroupName]:not([controlErrorsIgnore]), [formArrayName]:not([controlErrorsIgnore])',
})
export class ControlErrorsDirective implements OnInit, OnDestroy {
  @Input() customErrors = {};
  @Input() controlErrorAnchor: ControlErrorContainerDirective;

  private ref: ComponentRef<ControlErrorComponent>;
  private anchor: ViewContainerRef;
  private submit$: Observable<Event>;
  private control: AbstractControl;
  private destroy = new Subject();

  constructor(
    private vcr: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
    @Inject(FORM_ERRORS) private errors,
    @Optional() @Host() private form: FormSubmitDirective,
    @Optional() @Self() private ngControl: NgControl,
    @Optional() @Self() private controlContainer: ControlContainer
  ) {
    this.submit$ = this.form ? this.form.submit$ : EMPTY;
  }

  ngOnInit(): void {
    this.anchor = this.resolveAnchor();
    this.control = (this.controlContainer || this.ngControl).control;

    merge(this.submit$, this.control.valueChanges)
      .pipe(untilDestroyed(this))
      .subscribe((v) => this.valueChanges());
  }

  private resolveAnchor() {
    if (this.controlErrorAnchor) {
      return this.controlErrorAnchor.vcr;
    }

    return this.vcr;
  }

  ngOnDestroy(): void {
    this.destroy.next();
    if (this.ref) this.ref.destroy();
    this.ref = null;
  }

  private valueChanges() {
    const controlErrors = this.control.errors;
    if (controlErrors) {
      const [firstKey] = Object.keys(controlErrors);
      const getError = this.errors[firstKey];
      const text =
        this.customErrors[firstKey] || getError(controlErrors[firstKey]);
      this.setError(text);
    } else if (this.ref) {
      this.setError(null);
    }
  }

  setError(text: string) {
    if (!this.ref) {
      const factory = this.resolver.resolveComponentFactory(
        ControlErrorComponent
      );
      this.ref = this.anchor.createComponent(factory);
    }

    const instance = this.ref.instance;
    instance.text = text;
  }
}
