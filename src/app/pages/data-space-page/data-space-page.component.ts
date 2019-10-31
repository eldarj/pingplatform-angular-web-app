import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {DataSpaceDataService} from '../../services/data/data-space-data.service';
import {DataSpaceNodeModel} from '../../shared/models/data/data-space-node.model';

@Component({
  selector: 'app-data-space-page',
  templateUrl: './data-space-page.component.html',
  styleUrls: ['./data-space-page.component.scss']
})
export class DataSpacePageComponent {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  public displayedColumns: string[] = ['name', 'ownerFirstname', 'ownerLastname'];

  public dataSource = new MatTableDataSource<DataSpaceNodeModel>();
  public selection = new SelectionModel<DataSpaceNodeModel>(true, []);
  public resultsLength = 0;

  public isLoading = true;

  constructor(private dataSpaceService: DataSpaceDataService) {
    this.dataSpaceService.fileMetaData$.subscribe(result => {
      setTimeout(() => {
        this.dataSource.data = result;
        this.isLoading = false;
      }, 2000);
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

  public checkboxLabel(row?: DataSpaceNodeModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name + ' 1'}`;
  }
}
