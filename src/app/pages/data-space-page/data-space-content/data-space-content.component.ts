import {Component, Input, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DataSpaceDataService} from '../../../services/data/data-space-data.service';
import {DataSpaceNodeModel} from '../../../shared/models/data/data-space-node.model';
import {FileTypeUtils} from '../../../utils/file-type/file-type.utils';
import {DateTimeUtils} from '../../../utils/date-time.utils';
import {Subject} from 'rxjs';
import {FilePreviewDialogComponent} from '../dialogs/file-preview/file-preview-dialog.component';
import {ActivatedRoute} from '@angular/router';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-data-space-content',
  templateUrl: './data-space-content.component.html',
  styleUrls: ['./data-space-content.component.scss']
})
export class DataSpaceContentComponent {
  @Input() selection: SelectionModel<DataSpaceNodeModel>;
  @Input() dataSource: MatTableDataSource<DataSpaceNodeModel>;
  @Input() searchFilter: (filterString: string) => void;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  displayedColumns: string[] = [
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


  resultsLength = 0;

  isLoading = true;

  get dataSpaceEmpty() {
    return this.dataSource.data === undefined || this.dataSource.data.length < 1;
  }

  constructor(
    private dialog: MatDialog,
    private dataSpaceDataService: DataSpaceDataService,
    private route: ActivatedRoute,
  ) {
    const username = this.route.snapshot.paramMap.get('username');
    const path = this.route.snapshot.paramMap.get('path');

    console.log(username);
    console.log(path);

    this.dataSpaceDataService.emitter.subscribe(event => {
      switch (event) {
        case 'DeleteMultipleNodes': {
          this.dataSpaceDataService.deleteItems(this.selection.selected).subscribe();
          break;
        }
        case 'DownloadMultipleNodes': {
          console.log(this.selection.selected);
          // TODO manage api - zip multiple files or something
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
        this.dataSource.data = event.data;
        this.isLoading = false;
      }, 500);
    });
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle(): void {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  isDirectory(item: DataSpaceNodeModel): boolean {
    return item.nodeType === 'Directory';
  }

  getFileLabel(fileName: string): string {
    return FileTypeUtils.getFileLabel(fileName);
  }

  getFileIcon(item?: DataSpaceNodeModel): string {
    return FileTypeUtils.getIcon(item);
  }

  getHumanTimestamp(timestamp: string): string {
    return DateTimeUtils.formatISODate(timestamp);
  }

  deleteItem(item: DataSpaceNodeModel): void {
    this.dataSpaceDataService.deleteItem(item).subscribe();
  }

  openDirectory(directory: DataSpaceNodeModel): void {
    this.dataSpaceDataService.openDirectory(directory);
  }

  openBreadcrumb(directoryName: string): void {
    this.dataSpaceDataService.openBreadcrumb(directoryName);
  }

  getBreadcrumbs(): string[] {
    return [...this.dataSpaceDataService.breadcrumbManager.getBreadcrumbs().keys()];
  }

  openFilePreview(item: DataSpaceNodeModel): void {
    const fileSubject = new Subject<any>();
    fileSubject.subscribe((loadedFileObjectUrl: string) => {
      item.fileObjectUrl = loadedFileObjectUrl;
    });

    this.dialog.open(FilePreviewDialogComponent, {
      data: {node: item, fileBlobSubject: fileSubject},
      autoFocus: false,
      panelClass: 'file-preview-dialog'
    });
  }

  toRoot() {

  }

  toDirectory(directory: DataSpaceNodeModel) {

  }
}
