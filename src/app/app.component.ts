import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  FormBuilder,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  form: FormGroup;
  control: FormControl;

  options = Array.from(Array(5), (_, i) => ({
    label: `Animal ${i + 1}`,
    id: i + 1,
  }));

  customErrors = {
    minlength: ({ requiredLength }) =>
      `Use country abbreviation! (min ${requiredLength} chars)`,
    maxlength: 'Use country abbreviation! (max 3 chars)',
  };

  constructor(private builder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.builder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      terms: [false, Validators.requiredTrue],
      languages: ['', Validators.required],
      animal: [null, Validators.required],
      address: this.builder.group(
        {
          city: ['', Validators.required],
          country: ['', [Validators.minLength(2), Validators.maxLength(3)]],
        },
        { validator: this.addressValidator }
      ),
    });
  }

  private addressValidator(addr: FormGroup): object {
    return addr.value && addr.value.country && addr.value.city
      ? null
      : { invalidAddress: true };
  }
}
