import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DataSpaceDataService} from '../../../../services/data/data-space-data.service';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-new-directory',
  templateUrl: './file-upload-overwrite.component.html',
  styleUrls: ['./file-upload-overwrite.component.scss']
})
export class FileUploadOverwriteComponent {
  multiple = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { formData: FormData, files: File[] },
    private dialogRef: MatDialogRef<FileUploadOverwriteComponent>,
    private dataSpaceDataService: DataSpaceDataService
  ) {
    this.multiple = data.files.length > 1;
  }

  public save(): void {
    this.data.files.forEach(file => this.data.formData.append(file.name, file, file.name));
    this.dataSpaceDataService.uploadFiles(this.data.formData).subscribe();
    this.dialogRef.close();
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}
