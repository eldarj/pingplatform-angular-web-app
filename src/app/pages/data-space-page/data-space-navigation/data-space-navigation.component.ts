import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {NewDirectoryDialogComponent} from '../dialogs/new-directory/new-directory-dialog.component';
import {DataSpaceRestService} from '../../../services/api/rest/data-space-rest.service';

@Component({
  selector: 'app-data-space-navigation',
  templateUrl: './data-space-navigation.component.html',
  styleUrls: ['./data-space-navigation.component.scss']
})
export class DataSpaceNavigationComponent {
  @Output() searchEmitter: EventEmitter<string> = new EventEmitter();

  constructor(public dialog: MatDialog, private dataSpaceRestService: DataSpaceRestService) {
  }

  public searchFilter(searchValue: string) {
    this.searchEmitter.emit(searchValue.trim().toLowerCase());
  }

  openNewDirectoryDialog() {
    const dialogRef = this.dialog.open(NewDirectoryDialogComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this.dataSpaceRestService.post()
          .subscribe(result => {
            console.log(result);
          });
      }
    });
  }
}
