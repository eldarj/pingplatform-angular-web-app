import {Component} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataSpaceDataService} from '../../../../services/data/data-space-data.service';
import {OverwriteDirectoryDialogComponent} from '../overwrite-directory/overwrite-directory-dialog.component';

@Component({
  selector: 'app-new-directory',
  templateUrl: './new-directory-dialog.component.html',
  styleUrls: ['./new-directory-dialog.component.scss']
})
export class NewDirectoryDialogComponent {
  private form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<NewDirectoryDialogComponent>,
    private dataSpaceDataService: DataSpaceDataService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      directoryName: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  public get directoryNameControl() {
    return this.form.get('directoryName');
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public save(): void {
    const directoryName = this.form.value.directoryName;

    if (!!directoryName) {
      const dataSpaceNodeModel = this.dataSpaceDataService.getNodes()
        .find(node => node.name === directoryName && node.nodeType === 'Directory');

      if (!!dataSpaceNodeModel) {
        this.dialog.open(OverwriteDirectoryDialogComponent, {
          data: {directoryName}
        });
      } else {
        this.dataSpaceDataService.createDirectory(directoryName).subscribe();
      }
    }

    this.dialogRef.close();
  }

  public isInvalid(): boolean {
    return this.directoryNameControl.invalid &&
      (this.directoryNameControl.touched || this.directoryNameControl.dirty);
  }
}
