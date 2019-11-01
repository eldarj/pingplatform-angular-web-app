import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-new-directory',
  templateUrl: './new-directory-dialog.component.html',
  styleUrls: ['./new-directory-dialog.component.scss']
})
export class NewDirectoryDialogComponent {
  public directoryName: string;

  constructor(
    public dialogRef: MatDialogRef<NewDirectoryDialogComponent>) {
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
