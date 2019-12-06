import {ValidationErrors} from '@angular/forms';

export function ValidatorsTrimHelper(ref: {control}): ValidationErrors | null {
  if (ref.control.value.charAt(0) === ' ' || ref.control.value.slice(ref.control.value.length - 1) === ' ') {
    ref.control.setValue(ref.control.value.trim());
  }
  return null;
}
