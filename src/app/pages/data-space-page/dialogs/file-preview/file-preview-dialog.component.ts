import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DataSpaceDataService} from '../../../../services/data/data-space-data.service';
import {DataSpaceNodeModel} from '../../../../shared/models/data/data-space-node.model';
import {DomSanitizer} from '@angular/platform-browser';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-file-preview',
  templateUrl: './file-preview-dialog.component.html',
  styleUrls: ['./file-preview-dialog.component.scss']
})
export class FilePreviewDialogComponent {
  fileLoading = true;
  fileBlob: any;

  public get filePreviewSrc() {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(this.data.node.fileObjectUrl);
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { node: DataSpaceNodeModel, fileBlobSubject: Subject<any> },
    private domSanitizer: DomSanitizer,
    private dialogRef: MatDialogRef<FilePreviewDialogComponent>,
    private dataSpaceDataService: DataSpaceDataService
  ) {
    if (data.node.fileObjectUrl !== undefined && data.node.fileObjectUrl.length > 0) {
      // this.fileObjectURL = data.node.fileObjectUrl;
      this.fileLoading = false;
    } else {
      this.dataSpaceDataService.loadFile(this.data.node.name)
        .subscribe(
          result => {
            this.fileBlob = new Blob([result]);
            setTimeout(
              () => {
                data.node.fileObjectUrl = URL.createObjectURL(this.fileBlob);
                // this.fileObjectURL = URL.createObjectURL(this.fileBlob);
                // this.data.fileBlobSubject.next(this.fileObjectURL);
                this.fileLoading = false;
              },
              1000
            );
          },
          error => console.log(error)
        );
    }
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public downloadFile(): void {
    const domLink = document.createElement('a');
    document.body.appendChild(domLink);
    domLink.style.display = 'none';
    domLink.href = URL.createObjectURL(this.fileBlob);
    domLink.download = this.data.node.name;
    domLink.click();
  }
}
