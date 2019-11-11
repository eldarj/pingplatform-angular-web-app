import {Component, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {DataSpaceNodeModel} from '../../shared/models/data/data-space-node.model';
import {FileTypeUtils} from '../../utils/file-type/file-type.utils';
import {DateTimeUtils} from '../../utils/date-time.utils';
import {Subject} from 'rxjs';
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

  get dataSpaceEmpty() {
    return this.dataSource.data === undefined || this.dataSource.data.length < 1;
  }

  constructor(
    private dialog: MatDialog,
    private dataSpaceDataService: DataSpaceDataService
  ) {
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

  public searchFilter(searchValue: string): void {
    this.dataSource.filter = searchValue.trim().toLowerCase();
    this.selection.deselect(...this.selection.selected.filter(
      selectedItem => this.dataSource.filteredData.indexOf(selectedItem) === -1
    ));
  }

  public isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  public masterToggle(): void {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  public isDirectory(item: DataSpaceNodeModel): boolean {
    return item.nodeType === 'Directory';
  }

  public getFileLabel(fileName: string): string {
    return FileTypeUtils.getFileLabel(fileName);
  }

  public getFileIcon(item?: DataSpaceNodeModel): string {
    return FileTypeUtils.getIcon(item);
  }

  public getHumanTimestamp(timestamp: string): string {
    return DateTimeUtils.formatISODate(timestamp);
  }

  public deleteItem(item: DataSpaceNodeModel): void {
    this.dataSpaceDataService.deleteItem(item).subscribe();
  }

  public openDirectory(directory: DataSpaceNodeModel): void {
    this.dataSpaceDataService.openDirectory(directory);
  }

  public openBreadcrumb(directoryName: string): void {
    this.dataSpaceDataService.openBreadcrumb(directoryName);
  }

  public getBreadcrumbs(): string[] {
    return [...this.dataSpaceDataService.breadcrumbManager.getBreadcrumbs().keys()];
  }

  public openFilePreview(item: DataSpaceNodeModel): void {
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

  public toRoot() {

  }

  public toDirectory(directory: DataSpaceNodeModel) {

  }
}
