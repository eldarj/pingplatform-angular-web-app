import {MatSnackBar} from '@angular/material';

export class FormBaseHelper {

  public trimInput(event: any) {
    event.target.value = event.target.value.trim();
  }
}
