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
  ElementRef,
} from '@angular/core';
import { NgControl, ControlContainer, AbstractControl } from '@angular/forms';
import { FORM_ERRORS } from '../providers/form-errors';
import { ControlErrorComponent } from '../components/control-error/control-error.component';
import { ControlErrorContainerDirective } from './control-error-container.directive';
import { FormSubmitDirective } from './form-submit.directive';
import { merge, EMPTY, Observable, Subject } from 'rxjs';
import { ErrorsMap } from '../types';
import { distinctUntilChanged, switchMap, startWith, takeUntil } from 'rxjs/operators';

@Directive({
  selector:
    '[formControlName]:not([controlErrorsIgnore]), [formControl]:not([controlErrorsIgnore]), [formGroup]:not([controlErrorsIgnore]), [formGroupName]:not([controlErrorsIgnore]), [formArrayName]:not([controlErrorsIgnore])',
})
export class ControlErrorsDirective implements OnInit, OnDestroy {
  @Input() customErrors: ErrorsMap  = {};
  @Input() controlErrorContainer: ControlErrorContainerDirective;
  @Input() controlErrorsClass: string | undefined;


  private ref: ComponentRef<ControlErrorComponent>;
  private anchor: ViewContainerRef;
  private submit$: Observable<Event>;
  private control: AbstractControl;
  private destroy = new Subject();

  constructor(
    private vcr: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
    private host: ElementRef,
    @Inject(FORM_ERRORS) private errors,
    @Optional() private controlErrorContainerParent: ControlErrorContainerDirective,
    @Optional() @Host() private form: FormSubmitDirective,
    @Optional() @Self() private ngControl: NgControl,
    @Optional() @Self() private controlContainer: ControlContainer
  ) {
    this.submit$ = this.form ? this.form.submit$ : EMPTY;
  }

  ngOnInit(): void {
    this.anchor = this.resolveAnchor();
    this.control = (this.controlContainer || this.ngControl).control;

    const statusChanges$ = this.control.statusChanges.pipe(distinctUntilChanged());
    const valueChanges$ = this.control.valueChanges;
    const controlChanges$ = merge(statusChanges$, valueChanges$);
   
    const changesOnSubmit$ = this.submit$.pipe(switchMap(() => controlChanges$.pipe(startWith(true))));

    merge(changesOnSubmit$)
      .pipe(takeUntil(this.destroy))
      .subscribe(() => this.valueChanges());
  }

  private resolveAnchor(): ViewContainerRef {
    if (this.controlErrorContainer) {
      return this.controlErrorContainer.vcr;
    }

    if (this.controlErrorContainerParent) {
      return this.controlErrorContainerParent.vcr;
    }

    return this.vcr;
  }

  ngOnDestroy(): void {
    this.destroy.next();
    if (this.ref) { this.ref.destroy(); }
    this.ref = null;
  }

  private valueChanges(): void {
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

  setError(text: string): void {
    if (!this.ref) {
      const factory = this.resolver.resolveComponentFactory(
        ControlErrorComponent
      );
      this.ref = this.anchor.createComponent(factory);
    }

    const instance = this.ref.instance;
    instance.text = text;

    if (this.controlErrorsClass) {
      instance.customClass = this.controlErrorsClass;
    }
  }
}
