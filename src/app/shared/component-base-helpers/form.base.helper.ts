import {MatSnackBar} from '@angular/material';
import {FormGroup} from '@angular/forms';

export class FormBaseHelper {
  public form: FormGroup;

  public formLoading = true;
  public submitLoading = false;

  public get f() {
    return this.form.controls;
  }

  public trimInput(event: any) {
    event.target.value = event.target.value.trim();
  }
}
