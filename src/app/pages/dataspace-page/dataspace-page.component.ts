import {Component} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {DataSpaceNodeModel} from '../../shared/models/data/data-space-node.model';
import {ActivatedRoute} from '@angular/router';
import {DataSpaceService} from '../../services/data-space.service';

@Component({
  selector: 'app-dataspace-page',
  templateUrl: './dataspace-page.component.html',
  styleUrls: ['./dataspace-page.component.scss']
})
export class DataspacePageComponent {
  selection = new SelectionModel<DataSpaceNodeModel>(true, []);
  dataSource = new MatTableDataSource<DataSpaceNodeModel>();

  constructor(private route: ActivatedRoute, private dataSpaceService: DataSpaceService) {
    const username = route.snapshot.paramMap.get('username');
    const path = route.snapshot.paramMap.get('path');

    this.dataSpaceService.getNodes(username, path).subscribe(result => {
      console.log(result);
    }, console.log);
  }

  searchFilter(searchValue: string): void {
    this.dataSource.filter = searchValue.trim().toLowerCase();
    this.selection.deselect(...this.selection.selected.filter(
      selectedItem => this.dataSource.filteredData.indexOf(selectedItem) === -1
    ));
  }
}
