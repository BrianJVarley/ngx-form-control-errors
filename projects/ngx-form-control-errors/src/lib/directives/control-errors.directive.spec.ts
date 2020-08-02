import { Component, Type } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
} from '@angular/forms';
import {
  byPlaceholder,
  byText,
  createComponentFactory,
  Spectator,
  SpectatorElement,
  SpectatorFactory,
} from '@ngneat/spectator';
import { NgxFormControlErrorsModule } from '../ngx-form-control-errors.module';
import { tick, fakeAsync } from '@angular/core/testing';

// TODO: fix these tests, something up with control-error-container.directive

function getComponentFactory<C>(component: Type<C>): SpectatorFactory<any> {
  return createComponentFactory({
    component,
    imports: [FormsModule, ReactiveFormsModule, NgxFormControlErrorsModule],
  });
}

function typeInElementAndFocusOut(
  spectator: Spectator<any>,
  text: string,
  input: Element
): void {
  spectator.typeInElement(text, input);
  spectator.dispatchFakeEvent(input, 'focusout');
}

describe('ControlErrorDirective', () => {
  describe('FormGroup', () => {
    @Component({
      template: `
        <form [formGroup]="form" NgxFormControlErrors>
          <input formControlName="name" placeholder="Name" />

          <input
            type="checkbox"
            formControlName="terms"
            id="check"
            [controlErrorContainer]="anchor"
          />
          <ng-template
            controlErrorContainer
            #anchor="controlErrorContainer"
          ></ng-template>

          <input
            formControlName="ignored"
            placeholder="Ignored"
            controlErrorsIgnore
          />

          <div formArrayName="names">
            <div *ngFor="let name of form.controls.names.controls; index as i">
              <input [formControl]="name" placeholder="Name {{ i }}" />
            </div>
          </div>

          <button type="submit">Submit</button>
        </form>
      `,
    })
    class FormGroupComponent {
      form = this.builder.group({
        name: this.createName(),
        terms: [false, Validators.requiredTrue],
        ignored: ['', Validators.required],
        names: this.builder.array(
          [this.createName(), this.createName()],
          this.validator
        ),
      });

      constructor(private builder: FormBuilder) {}

      createName(): FormControl {
        return new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]);
      }

      validator({ controls }: FormArray): object | null {
        return controls.some((control) => control.valid)
          ? null
          : { requiredone: true };
      }
    }

    let spectator: Spectator<FormGroupComponent>;

    const createComponent = getComponentFactory(FormGroupComponent);

    beforeEach(() => (spectator = createComponent()));

    it('should create', () => {
      expect(spectator.component).toBeTruthy();
    });

    it('should show errors on interactions', () => {
      const nameInput = spectator.query<HTMLInputElement>(
        byPlaceholder('Name')
      );

      typeInElementAndFocusOut(spectator, 't', nameInput);

      expect(spectator.query(byText('min error'))).toBeTruthy();

      typeInElementAndFocusOut(spectator, '', nameInput);

      expect(spectator.query(byText('required error'))).toBeTruthy();

      typeInElementAndFocusOut(spectator, 'test', nameInput);

      const oneNameInput = spectator.query<HTMLInputElement>(
        byPlaceholder('Name 0')
      );
      const oneNameInput1 = spectator.query<HTMLInputElement>(
        byPlaceholder('Name 1')
      );

      spectator.click('button');

      expect(spectator.query(byText('required one error'))).toBeTruthy();

      typeInElementAndFocusOut(spectator, 'no error', oneNameInput);
      typeInElementAndFocusOut(spectator, 'no error2', oneNameInput1);
      spectator.click('input[type=checkbox]');

      expect(spectator.query(byText(/error/))).toBeNull();
    });

    xit('should not show errors on interactions', () => {
      const ignoredInput = spectator.query<HTMLInputElement>(
        byPlaceholder('Ignored')
      );

      typeInElementAndFocusOut(spectator, '', ignoredInput);

      expect(spectator.query(byText('required error'))).toBeFalsy();
    });

    xit('should show errors on async statusChanges', fakeAsync(() => {
      const serverError = 'server error';
      const nameInput = spectator.query<HTMLInputElement>(
        byPlaceholder('Name')
      );

      typeInElementAndFocusOut(spectator, 'no error', nameInput);

      expect(spectator.query(byText(serverError))).toBeFalsy();

      spectator.click('button');

      setTimeout(() => {
        const control = spectator.component.form.get('name');

        control.setErrors({ serverError });
      }, 50);

      tick(50);

      spectator.detectChanges();

      expect(spectator.query(byText(serverError))).toBeTruthy();
    }));
  });

  describe('FormControl', () => {
    @Component({
      template: ` <input [formControl]="name" placeholder="Name" /> `,
    })
    class FormControlComponent {
      name = new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]);
    }

    let spectator: Spectator<FormControlComponent>;

    const createComponent = getComponentFactory(FormControlComponent);

    beforeEach(() => (spectator = createComponent()));

    xit('should create', () => {
      expect(spectator.component).toBeTruthy();
    });

    xit('should show errors on interactions', () => {
      const nameInput = spectator.query<HTMLInputElement>(
        byPlaceholder('Name')
      );

      typeInElementAndFocusOut(spectator, 't', nameInput);

      expect(spectator.query(byText('min error'))).toBeTruthy();

      typeInElementAndFocusOut(spectator, '', nameInput);

      expect(spectator.query(byText('required error'))).toBeTruthy();

      typeInElementAndFocusOut(spectator, 'test', nameInput);

      expect(spectator.query(byText(/error/))).toBeNull();
    });
  });

  describe('NgModel', () => {
    @Component({
      template: `
        <input [(ngModel)]="name" placeholder="Name" required minlength="3" />
      `,
    })
    class NgModelComponent {
      name = '';
    }

    let spectator: Spectator<NgModelComponent>;

    const createComponent = getComponentFactory(NgModelComponent);

    beforeEach(() => (spectator = createComponent()));

    it('should create', () => {
      expect(spectator.component).toBeTruthy();
    });

    xit('should show errors on interactions', () => {
      const nameInput = spectator.query<HTMLInputElement>(
        byPlaceholder('Name')
      );

      typeInElementAndFocusOut(spectator, 't', nameInput);

      expect(spectator.query(byText('min error'))).toBeTruthy();

      typeInElementAndFocusOut(spectator, '', nameInput);

      expect(spectator.query(byText('required error'))).toBeTruthy();

      typeInElementAndFocusOut(spectator, 'test', nameInput);

      expect(spectator.query(byText(/error/))).toBeNull();
    });
  });
});
