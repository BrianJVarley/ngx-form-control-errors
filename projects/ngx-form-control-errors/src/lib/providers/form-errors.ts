import { ValueSansProvider } from '@angular/core';
import { FactorySansProvider, InjectionToken, Type } from '@angular/core';
import { ControlErrorComponent } from '../components/control-error/control-error.component';
import { ErrorsMap } from '../types';


export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
  providedIn: 'root',
  factory: () => {
    return {};
  }
});

export interface ErrorsUseValue extends ValueSansProvider {
  useValue: ErrorsMap;
}

export interface ErrorsUseFactory extends FactorySansProvider {
  useFactory: (...args: any[]) => ErrorsMap;
}

export type ErrorsProvider = ErrorsUseValue | ErrorsUseFactory;

export type FormControlErrorsConfig = {
  errors?: ErrorsProvider;
  blurPredicate?: (element: Element) => boolean;
  controlErrorComponent?: Type<ControlErrorComponent>;
  controlErrorComponentAnchorFn?: (hostElement: Element, errorElement: Element) => () => void;
};

export const FormControlErrorsConfigProvider = new InjectionToken<FormControlErrorsConfig>('FormControlErrorsConfigProvider');

