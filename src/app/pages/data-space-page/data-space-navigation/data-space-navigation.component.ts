import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {NewDirectoryDialogComponent} from '../dialogs/new-directory/new-directory-dialog.component';
import {DataSpaceDataService} from '../../../services/data/data-space-data.service';
import {StatusEnum} from '../../../shared/models/enums/status.enum';
import {FileUploadOverwriteComponent} from '../dialogs/file-upload-overwrite/file-upload-overwrite.component';

@Component({
  selector: 'app-data-space-navigation',
  templateUrl: './data-space-navigation.component.html',
  styleUrls: ['./data-space-navigation.component.scss']
})
export class DataSpaceNavigationComponent {
  @Input() selectionLength: number;
  @Output() searchEmitter: EventEmitter<string> = new EventEmitter();
  private statusIcon: StatusEnum = StatusEnum.NONE;

    get hasSelectedItems() {
      return this.selectionLength > 0;
    }

  constructor(private dialog: MatDialog, private dataSpaceDataService: DataSpaceDataService) {
    this.dataSpaceDataService.emitter.subscribe(event => {
      switch (event) {
        case 'CreateDirectory' || 'DeleteDirectory' || 'DeleteFile' || 'UploadFile' || 'DeleteMultipleNodes' || 'DownloadMultipleNodes': {
          console.log(event);
          this.statusIcon = StatusEnum.LOADING;
          break;
        }
        case 'SaveDirectoryMetadataSuccess' || 'DeleteDirectoryMetadataSuccess' || 'DeleteFileMetadataSuccess' || 'UploadFileSuccess': {
          setTimeout(() => {
            this.statusIcon = StatusEnum.SUCCESS;
          }, 500);
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  public isLoading() {
    return this.statusIcon === StatusEnum.LOADING;
  }

  public isSuccess() {
    return this.statusIcon === StatusEnum.SUCCESS;
  }

  public isFail() {
    return this.statusIcon === StatusEnum.FAIL;
  }

  public searchFilter(searchValue: string) {
    this.searchEmitter.emit(searchValue.trim().toLowerCase());
  }

  public openNewDirectoryDialog() {
    this.dialog.open(NewDirectoryDialogComponent);
  }

  public uploadFile() {
    const uploadFileInput = document.getElementById('uploadFileInput');
    uploadFileInput.click();
  }

  public uploadFileSelected(event: any) {
    const formData = new FormData();
    const filesToOverwrite: File[] = [];

    Array.from<File>(event.target.files).forEach(file => {
      const nodes = this.dataSpaceDataService.getNodes().map(node => node.name);
      if (nodes.indexOf(file.name) !== -1) {
        filesToOverwrite.push(file);
      } else {
        formData.append(file.name, file, file.name);
      }
    });

    // Check files to override
    if (filesToOverwrite.length > 0) {
      this.dialog.open(FileUploadOverwriteComponent, {
        data: {formData, files: filesToOverwrite}
      });
    } else {
      this.dataSpaceDataService.uploadFiles(formData).subscribe();
    }
  }

  public downloadMultipleNodes() {
    this.dataSpaceDataService.emitter.emit('DownloadMultipleNodes');
  }

  public deleteMultipleNodes() {
    this.dataSpaceDataService.emitter.emit('DeleteMultipleNodes');
  }
}
