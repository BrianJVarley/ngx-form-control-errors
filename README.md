# NgxFormControlErrorsLibrary
Based off [@ngneat/error-tailor](https://github.com/ngneat/error-tailor) a dynamic approach to generating 
Reactive Form Error messages using directives. Aim is to add extra functionality for translating error message using 
`angular-i18next` and Translation As A Service.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## CSS Naming Convention

> Try to follow BEM. It’s one of the most commonly used convention by now.
> (double dash) means variation of the element. (double underscore) means children of the element.

Example

```JavaScript
<button class='btn btn--warning'> <!-- .btn--warning one of the variation of .btn-->
  <div class="btn__text"></div> <!-- .btn__text one of the child of .btn-->
</button>

.btn--warning {
/* Yay ! By convention, I know that code here relate to the variation "warning" of a button, without event looking at the HMTL code. What a relief !*/
}
.btn__text {
/* For same reason, I know that this style will target text in a button */
}

```

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
