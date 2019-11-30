import {Component} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {DataSpaceNodeModel} from '../../shared/models/data/data-space-node.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-data-space-page',
  templateUrl: './data-space-page.component.html',
  styleUrls: ['./data-space-page.component.scss']
})
export class DataSpacePageComponent {
  selection = new SelectionModel<DataSpaceNodeModel>(true, []);
  dataSource = new MatTableDataSource<DataSpaceNodeModel>();

  constructor(private route: ActivatedRoute) {
    const username = route.snapshot.paramMap.get('username');
    const path = route.snapshot.paramMap.get('path');

    if (username === null) {
      // TODO: redirect to this user
    } else {
      // TODO: fetch data-space by path, by user
    }
  }

  searchFilter(searchValue: string): void {
    this.dataSource.filter = searchValue.trim().toLowerCase();
    this.selection.deselect(...this.selection.selected.filter(
      selectedItem => this.dataSource.filteredData.indexOf(selectedItem) === -1
    ));
  }
}
