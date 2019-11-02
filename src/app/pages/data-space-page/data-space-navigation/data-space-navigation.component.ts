import {Component, EventEmitter, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {NewDirectoryDialogComponent} from '../dialogs/new-directory/new-directory-dialog.component';
import {DataSpaceDataService} from '../../../services/data/data-space-data.service';
import {StatusEnum} from '../../../shared/models/enums/status.enum';

@Component({
  selector: 'app-data-space-navigation',
  templateUrl: './data-space-navigation.component.html',
  styleUrls: ['./data-space-navigation.component.scss']
})
export class DataSpaceNavigationComponent {
  @Output() searchEmitter: EventEmitter<string> = new EventEmitter();
  private statusIcon: StatusEnum = StatusEnum.NONE;

  constructor(private dialog: MatDialog, private dataSpaceDataService: DataSpaceDataService) {
    dataSpaceDataService.emitter.subscribe(event => {
      if (event === 'CreateDirectory') {
        this.statusIcon = StatusEnum.LOADING;
      } else if (event === 'SaveDirectoryMetadataSuccess') {
        setTimeout(() => {
          this.statusIcon = StatusEnum.SUCCESS;
        }, 500);
      }
    });
  }

  public isLoading() {
    return this.statusIcon === StatusEnum.LOADING;
  }

  public isSuccess() {
    console.log(this.statusIcon === StatusEnum.SUCCESS);
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
}
