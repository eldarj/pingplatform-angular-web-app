import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataSpaceService} from '../../services/data-space.service';
import {Location} from '@angular/common';
import {AuthenticationService} from '../../services/authentication.service';
import {SnackbarService} from '../../services/snackbar.service';

@Component({
  selector: 'app-dataspace-page',
  templateUrl: './dataspace-page.component.html',
  styleUrls: ['./dataspace-page.component.scss']
})
export class DataspacePageComponent {
  username: string;

  node: any = {};
  childNodes: any[];

  displayBack = false;

  directoryInputValue = '';

  constructor(private location: Location, private route: ActivatedRoute,
              private dataSpaceService: DataSpaceService,
              private authenticationService: AuthenticationService,
              private snackbarService: SnackbarService) {
    this.username = route.snapshot.paramMap.get('username');

    let path = '';
    const snapshotPath = this.route.snapshot.children[0];
    if (snapshotPath !== null && snapshotPath !== undefined && snapshotPath.url !== null && snapshotPath.url !== undefined) {
      path = snapshotPath.url.join('/');
    }

    if (this.username === null) {
      this.authenticationService.getCurrentUsername().subscribe(userResult => {
        this.username = userResult.username;
        this.location.go('/dataspace/' + this.username);
        this.fetchNodes(this.username);

      }, console.log);

    } else {
      this.fetchNodes(this.username + (path !== null ? '/' + path : ''));
    }
  }

  back() {
    this.getNodes(this.node.parentNode);
  }

  getNodes(node: any) {
    let path = '';
    if (node.path !== '') {
      path += node.path + '/';
    }
    path += node.name;

    this.location.go('/dataspace/' + path);
    this.fetchNodes(path);
  }

  createDirectory() {
    let path = '';
    if (this.node.path !== '') {
      path += this.node.path + '/';
    }
    path += this.node.name;

    this.dataSpaceService.createNewDirectory(this.username, path, this.directoryInputValue).subscribe((result: {node}) => {
      this.childNodes.push(result.node);
      this.snackbarService.openSnackBar('Successfully created new directory.');
    }, console.log);
  }

  private fetchNodes(path: string) {
    this.dataSpaceService.getNodes(this.username, path).subscribe(result => {
      this.node = result.node;
      this.childNodes = result.childNodes;
      this.displayBack = this.node.path !== '';

    }, console.log);
  }
}