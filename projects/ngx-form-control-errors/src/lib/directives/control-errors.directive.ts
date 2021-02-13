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
import { FormControlErrorsConfig, FormControlErrorsConfigProvider, FORM_ERRORS } from '../providers/form-errors';
import { ControlErrorComponent } from '../components/control-error/control-error.component';
import { ControlErrorContainerDirective } from './control-error-container.directive';
import { FormSubmitDirective } from './form-submit.directive';
import { merge, EMPTY, Observable, Subject, fromEvent } from 'rxjs';
import { ErrorsMap } from '../types';
import {
  distinctUntilChanged,
  switchMap,
  startWith,
  takeUntil,
} from 'rxjs/operators';

@Directive({
  selector:
    '[formControlName]:not([controlErrorsIgnore]), [formControl]:not([controlErrorsIgnore]), [formGroup]:not([controlErrorsIgnore]), [formGroupName]:not([controlErrorsIgnore]), [formArrayName]:not([controlErrorsIgnore])',
})
export class ControlErrorDirective implements OnInit, OnDestroy {
  @Input() customErrors: ErrorsMap = {};
  @Input() controlErrorsClass: string | undefined;
  @Input() controlErrorsOnAsync = true;
  @Input() controlErrorsOnBlur = true;
  @Input() controlErrorContainer: ControlErrorContainerDirective;

  private ref: ComponentRef<ControlErrorComponent>;
  private anchor: ViewContainerRef;
  private submit$: Observable<Event>;
  private control: AbstractControl;
  private destroy = new Subject();
  private mergedConfig: FormControlErrorsConfig = {};


  constructor(
    private vcr: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
    private host: ElementRef,
    @Inject(FORM_ERRORS) private globalErrors,
    @Inject(FormControlErrorsConfigProvider) private config: FormControlErrorsConfig,
    @Optional()
    private controlErrorContainerParent: ControlErrorContainerDirective,
    @Optional() @Host() private form: FormSubmitDirective,
    @Optional() @Self() private ngControl: NgControl,
    @Optional() @Self() private controlContainer: ControlContainer
  ) {
    this.submit$ = this.form ? this.form.submit$ : EMPTY;
    this.mergedConfig = this.buildConfig();
  }

  ngOnInit(): void {
    this.anchor = this.resolveAnchor();
    this.control = (this.controlContainer || this.ngControl).control;
    const hasAsyncValidator = !!this.control.asyncValidator;

    const statusChanges$ = this.control.statusChanges.pipe(
      distinctUntilChanged()
    );
    const valueChanges$ = this.control.valueChanges;
    const controlChanges$ = merge(statusChanges$, valueChanges$);

    let changesOnAsync$: Observable<any> = EMPTY;
    let changesOnBlur$: Observable<any> = EMPTY;

    if (this.controlErrorsOnAsync && hasAsyncValidator) {
      changesOnAsync$ = statusChanges$.pipe(startWith(true));
    }

    if (this.controlErrorsOnBlur) {
      const blur$ = fromEvent(this.host.nativeElement, 'focusout');
      changesOnBlur$ = blur$.pipe(
        switchMap(() => valueChanges$.pipe(startWith(true)))
      );
    }

    const changesOnSubmit$ = this.submit$.pipe(
      switchMap(() => controlChanges$.pipe(startWith(true)))
    );

    merge(changesOnAsync$, changesOnBlur$, changesOnSubmit$)
      .pipe(takeUntil(this.destroy))
      .subscribe(() => this.valueChanges());
  }

  ngOnDestroy(): void {
    this.destroy.next();
    if (this.ref) {
      this.ref.destroy();
    }
    this.ref = null;
  }

  private get isInput() {
    return this.mergedConfig.blurPredicate(this.host.nativeElement);
  }

  private valueChanges(): void {
    const controlErrors = this.control.errors;
    if (controlErrors) {
      const [firstKey] = Object.keys(controlErrors);
      const getError = this.globalErrors[firstKey];

      if (!getError) {
        return;
      }

      const text =
        typeof getError === 'function'
          ? getError(controlErrors[firstKey])
          : getError;
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

  private resolveAnchor(): ViewContainerRef {
    if (this.controlErrorContainer) {
      return this.controlErrorContainer.vcr;
    }

    if (this.controlErrorContainerParent) {
      return this.controlErrorContainerParent.vcr;
    }

    return this.vcr;
  }


  private buildConfig(): FormControlErrorsConfig {
    return {
      ...{
        blurPredicate(element) {
          return element.tagName === 'INPUT' || element.tagName === 'SELECT';
        },
        controlErrorComponent: ControlErrorComponent 
      },
      ...this.config
    };
  }
}
