import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DataSpaceDataService} from '../../../../services/data/data-space-data.service';

@Component({
  selector: 'app-new-directory',
  templateUrl: './overwrite-directory-dialog.component.html',
  styleUrls: ['./overwrite-directory-dialog.component.scss']
})
export class OverwriteDirectoryDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { directoryName: string },
    private dialogRef: MatDialogRef<OverwriteDirectoryDialogComponent>,
    private dataSpaceDataService: DataSpaceDataService
  ) {
  }

  public save(): void {
    this.dataSpaceDataService.createDirectory(this.data.directoryName).subscribe();
    this.dialogRef.close();
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}
