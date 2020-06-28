import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  form: FormGroup;
  control: FormControl;
  customErrors = {required: 'Please accept the terms'};
  constructor(private builder: FormBuilder) { }


  ngOnInit(): void {
    this.control = this.builder.control('', Validators.required);

    this.form = this.builder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      terms: ['', Validators.requiredTrue],
      address: this.builder.group({
        city: ['', Validators.required],
        country: ['', Validators.required]
      })
    });
  }
}
