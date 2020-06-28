# NgxFormControlErrors

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.0.

## Code scaffolding

Run `ng generate component component-name --project NgxFormControlErrors` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project NgxFormControlErrors`.
> Note: Don't forget to add `--project NgxFormControlErrors` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build NgxFormControlErrors` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build NgxFormControlErrors`, go to the dist folder `cd dist/ngx-form-control-errors` and run `npm publish`.

## Running unit tests

Run `ng test NgxFormControlErrors` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Linking 

Updating Library(working in watch mode).
Let’s say you did some test and now you want to make some changes to the library code (happens all the time..right!). To suit our scenario, we want the library code (under projects/ngx-mat-typeahead) and our sample app (where we are using this library) to be running in --watch mode. To achieve this we need to perform a few easy steps.
First, we need to link the library to our app. Linking a library is 2 step process and is done via npm link command. More on this here.
So we cd into dist/ngx-mat-typeahead and run npm link
Next, from our project root folder run npm link
Now, if we run the library in the watch mode (ng build NgxMatTypeahead — watch) and also run ng serve. We can develop our application and our linked libraries simultaneously, and see the app recompile with each modification to the library’s source code