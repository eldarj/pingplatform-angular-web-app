import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {DataSpaceNodeModel} from '../../shared/models/data/data-space-node.model';
import {FileTypeUtils} from '../../utils/file-type/file-type.utils';
import {DateTimeUtils} from '../../utils/date-time.utils';
import {Subject, Subscription} from 'rxjs';
import {DataSpaceDataService} from '../../services/data/data-space-data.service';
import {FilePreviewDialogComponent} from './dialogs/file-preview/file-preview-dialog.component';

@Component({
  selector: 'app-data-space-page',
  templateUrl: './data-space-page.component.html',
  styleUrls: ['./data-space-page.component.scss']
})
export class DataSpacePageComponent {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  public displayedColumns: string[] = [
    'select',
    'icon',
    'name',
    'private',
    'creationTime',
    'lastModifiedTime',
    'mimeType',
    'ownerName',
    'more'
  ];

  public dataSource = new MatTableDataSource<DataSpaceNodeModel>();
  public selection = new SelectionModel<DataSpaceNodeModel>(true, []);
  public resultsLength = 0;

  public isLoading = true;

  public get dataSpaceEmpty() {
    return this.dataSource.data === undefined || this.dataSource.data.length < 1;
  }

  constructor(
    private dialog: MatDialog,
    private dataSpaceDataService: DataSpaceDataService
  ) {
    this.dataSpaceDataService.emitter.subscribe(event => {
      switch (event) {
        case 'DeleteMultipleNodes': {
          break;
        }
        default: {
          break;
        }
      }
    });

    this.dataSpaceDataService.fileMetaData$.subscribe(event => {
      this.isLoading = true;
      setTimeout(() => {
        if (event.event === 'DeleteDirectoryMetadataSuccess' || event.event === 'DeleteFileMetadataSuccess') {
          this.dataSource.data = this.dataSource.data
            .filter(node => node.path + '/' + node.name !== event.data);
        } else {
          const data = event.data.map(node => {
            node.ownerName = node.ownerFirstname + ' ' + node.ownerLastname;
            return node;
          });
          this.dataSource.data = [...data, ...this.dataSource.data];
        }
        this.isLoading = false;
        // this.changeDetectorRefs.detectChanges();
      }, 500);
    });
  }

  public searchFilter(searchValue: string) {
    this.dataSource.filter = searchValue.trim().toLowerCase();
  }

  public isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  public masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  public getFileLabel(fileName: string) {
    return FileTypeUtils.getFileLabel(fileName);
  }

  public getFileIcon(fileName: string) {
    return FileTypeUtils.getFileIcon(fileName);
  }

  public getHumanTimestamp(timestamp: string) {
    return DateTimeUtils.formatISODate(timestamp);
  }

  public deleteItem(item: DataSpaceNodeModel) {
    this.dataSpaceDataService.deleteItem(item).subscribe();
  }

  public openFilePreview(node: DataSpaceNodeModel) {
    const fileSubject = new Subject<any>();
    fileSubject.subscribe((loadedFileObjectUrl: string) => {
      node.fileObjectUrl = loadedFileObjectUrl;
    });

    this.dialog.open(FilePreviewDialogComponent, {
      data: { node, fileBlobSubject: fileSubject },
      autoFocus: false,
      panelClass: 'file-preview-dialog'
    });

    // If it not an img, vid or audio file, just display the preview without rendering any more content (icon is there by default)
    // if (['image', 'video', 'audio'].indexOf(this.state.fileType) < 0) {
    //   this.setState({
    //     IsPreviewModalVisible: true
    //   });
    //   return;
    // }

    // Check if we already have this content fetched from API, from earlier
    // if (this.state.contentBlob) {
    //   this.setState({
    //     ObjectURL: URL.createObjectURL(this.state.contentBlob),
    //     IsPreviewModalVisible: true
    //   });
    //   URL.revokeObjectURL(this.state.ObjectURL);
    //   return;
    // }
    //
    // // Otherwise, display a spinner icon and fetch data from API
    // this._fetchFromApi();
  }
}
