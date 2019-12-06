import {AbstractControl, ValidationErrors} from '@angular/forms';

export function ValidatorsExistsInCollection(control: AbstractControl, collection: any[]): ValidationErrors | null {
  let errors: ValidationErrors = [];
  if (control.value.length > 0 && !collection.some(item => item === control.value)) {
    errors = {...errors, unexistingValue: true};
  }
  return errors;
}
