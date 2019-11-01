import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {NewDirectoryComponent} from '../dialogs/new-directory/new-directory.component';

@Component({
  selector: 'app-data-space-navigation',
  templateUrl: './data-space-navigation.component.html',
  styleUrls: ['./data-space-navigation.component.scss']
})
export class DataSpaceNavigationComponent implements OnInit {
  @Output() searchEmitter: EventEmitter<string> = new EventEmitter();

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  public searchFilter(searchValue: string) {
    this.searchEmitter.emit(searchValue.trim().toLowerCase());
  }

  openNewDirectoryDialog() {
    const dialogRef = this.dialog.open(NewDirectoryComponent, {
      width: '250px',
      data: {name: 'yxc', animal: 'yc'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
}
