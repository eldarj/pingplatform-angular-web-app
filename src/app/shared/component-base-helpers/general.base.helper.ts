import {MatSnackBar} from '@angular/material';

export class GeneralBaseHelper {
  constructor(private snackbar: MatSnackBar) {
  }

  public openSnackBar(message: string, btnLabel: string = '', duration: number = 2000) {
    this.snackbar.open(message, btnLabel, { duration });
  }
}
