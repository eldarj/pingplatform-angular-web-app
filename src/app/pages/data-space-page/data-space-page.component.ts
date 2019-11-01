import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {DataSpaceHubClientService} from '../../services/api/signalr/data-space-hub-client.service';
import {DataSpaceNodeModel} from '../../shared/models/data/data-space-node.model';
import {FileTypeUtils} from '../../utils/file-type/file-type.utils';
import {DateTimeUtils} from '../../utils/date-time.utils';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-data-space-page',
  templateUrl: './data-space-page.component.html',
  styleUrls: ['./data-space-page.component.scss']
})
export class DataSpacePageComponent {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  fileMetaData$: Subscription;

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

  constructor(private dataSpaceService: DataSpaceHubClientService) {
    this.dataSpaceService.fileMetaData$.subscribe(result => {
      setTimeout(() => {
        this.dataSource.data = result.map(node => {
          node.ownerName = node.ownerFirstname + ' ' + node.ownerLastname;
          return node;
        });
        this.isLoading = false;
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
}
