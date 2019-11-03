import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {DataSpaceNodeModel} from '../../shared/models/data/data-space-node.model';
import {FileTypeUtils} from '../../utils/file-type/file-type.utils';
import {DateTimeUtils} from '../../utils/date-time.utils';
import {Subscription} from 'rxjs';
import {DataSpaceDataService} from '../../services/data/data-space-data.service';

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

  constructor(private dataSpaceDataService: DataSpaceDataService, private changeDetectorRefs: ChangeDetectorRef) {
    this.dataSpaceDataService.emitter.subscribe(event => {
      switch (event) {
        case 'DeleteMultipleNodes': {

          break;
        }
        default: {
          break;
        }
      }
    })

    this.dataSpaceDataService.fileMetaData$.subscribe(event => {
      this.isLoading = true;
      setTimeout(() => {
        if (event.event === 'DeleteDirectoryMetadataSuccess') {
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

  public deleteDirectory(node: DataSpaceNodeModel) {
    this.dataSpaceDataService.deleteDirectory(node.path + '/' + node.name).subscribe();
  }
}
