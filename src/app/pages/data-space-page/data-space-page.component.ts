import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {DataSpaceDataService} from '../../services/data/data-space-data.service';
import {DataSpaceNodeModel} from '../../shared/models/data/data-space-node.model';
import {FileUtils} from '../../utils/file.utils';

@Component({
  selector: 'app-data-space-page',
  templateUrl: './data-space-page.component.html',
  styleUrls: ['./data-space-page.component.scss']
})
export class DataSpacePageComponent {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  public displayedColumns: string[] = ['select', 'name', 'private', 'mimeType', 'creationTime', 'lastModifiedTime', 'ownerName'];

  public dataSource = new MatTableDataSource<DataSpaceNodeModel>();
  public selection = new SelectionModel<DataSpaceNodeModel>(true, []);
  public resultsLength = 0;

  public isLoading = true;

  constructor(private dataSpaceService: DataSpaceDataService) {
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
    console.log(searchValue);
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

  public getFileType(fileName: string) {
    return FileUtils.getTypeDescription(fileName);
  }
}
