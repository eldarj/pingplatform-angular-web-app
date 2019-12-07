import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-mat-form-input',
  templateUrl: './mat-form-input.component.html'
})
export class MatFormInputComponent {
  @Input() formGroup: FormGroup;

  @Input() label: string;
  @Input() placeholder: string;
  @Input() controlName: string;

  @Input() errors: any;
  @Input() patternError = 'Field is not valid.';

  trimInput(event: any) {
    event.target.value = event.target.value.trim();
  }
}
