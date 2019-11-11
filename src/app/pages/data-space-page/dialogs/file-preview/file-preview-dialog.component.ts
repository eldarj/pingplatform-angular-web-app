import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DataSpaceDataService} from '../../../../services/data/data-space-data.service';
import {DataSpaceNodeModel} from '../../../../shared/models/data/data-space-node.model';
import {DomSanitizer} from '@angular/platform-browser';
import {Subject} from 'rxjs';
import {FileTypeUtils} from '../../../../utils/file-type/file-type.utils';

@Component({
  selector: 'app-file-preview',
  templateUrl: './file-preview-dialog.component.html',
  styleUrls: ['./file-preview-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilePreviewDialogComponent {
  fileLoading = true;
  fileBlob: any;

  public get filePreviewSrc() {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(this.data.node.fileObjectUrl);
  }

  public get fileType(): string {
    return FileTypeUtils.getBasicType(this.data.node.mimeType);
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { node: DataSpaceNodeModel, fileBlobSubject: Subject<any> },
    private domSanitizer: DomSanitizer,
    private dialogRef: MatDialogRef<FilePreviewDialogComponent>,
    private dataSpaceDataService: DataSpaceDataService,
    private changeDetectorRef: ChangeDetectorRef
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
                this.changeDetectorRef.detectChanges();
              },
              1000
            );
          },
          error => console.log(error)
        );
    }
  }

  public getFileIcon(fileName: string) {
    return FileTypeUtils.getIcon(fileName);
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public downloadFile(): void {
    FileTypeUtils.downloadFile(this.fileBlob, this.data.node.name);
  }
}
