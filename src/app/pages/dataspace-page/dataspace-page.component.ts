import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataSpaceService} from '../../services/data-space.service';
import {Location} from '@angular/common';
import {AuthenticationService} from '../../services/authentication.service';
import {SnackbarService} from '../../services/snackbar.service';
import {MatDialog} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {FilePreviewComponent} from './file-preview/file-preview.component';
import {PathUtils} from '../../utils/path.utils';

@Component({
  selector: 'app-dataspace-page',
  templateUrl: './dataspace-page.component.html',
  styleUrls: ['./dataspace-page.component.scss']
})
export class DataspacePageComponent {
  @ViewChild(FilePreviewComponent, {static: false})
  private filePreview: FilePreviewComponent;

  username: string;

  node: any = {};
  childNodes: any[];

  displayBack = false;
  directoryInputValue = '';

  constructor(private dialog: MatDialog,
              private domSanitizer: DomSanitizer,
              private location: Location,
              private route: ActivatedRoute,
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

      }, console.warn);

    } else {
      this.fetchNodes(this.username + (path !== null ? '/' + path : ''));
    }
  }

  back() {
    this.getNodes(this.node.parentNode);
  }

  uploadFileSelected(event: any) {
    this.dataSpaceService.uploadFile(this.username, PathUtils.getNodePath(this.node), this.prepareFormData(event)).subscribe(result => {
      console.log(result);
      this.childNodes.push(...result.nodes);
      this.snackbarService.openSnackBar('Successfully uploaded file.');
    }, console.warn);
  }

  getNodes(node: any) {
    this.location.go('/dataspace/' + PathUtils.getNodePath(node));
    this.fetchNodes(PathUtils.getNodePath(node));
  }

  getFile(node: any) {
    this.filePreview.display(node);
  }

  createDirectory() {
    this.dataSpaceService.createNewDirectory(this.username, PathUtils.getNodePath(this.node), this.directoryInputValue)
      .subscribe((result: { node }) => {
        this.childNodes.push(result.node);
        this.snackbarService.openSnackBar('Successfully created new directory.');
      }, console.warn);
  }

  delete(node: any) {
    this.dataSpaceService.deleteNodes(this.username, PathUtils.getNodePathToParent(node), node.name)
      .subscribe(response => this.onDelete(response), error => this.onDelete(error));
  }

  private onDelete(response) {
    if (response.nodes !== null && response.nodes !== undefined) {
      let responseMsg = '';
      if (response.nodes.length > 1) {
        responseMsg = `${response.nodes.length} files`;
        this.childNodes = this.childNodes.filter(node => response.nodes.find(
          deletedNode => deletedNode.id !== node.id
        ));

      } else {
        responseMsg = response.nodes[0].name;
        this.childNodes = this.childNodes.filter(node => node.id !== response.nodes[0].id);
      }
      this.snackbarService.openSnackBar(`Successfully deleted ${responseMsg}.`);

    } else {
      console.warn(response);
      this.snackbarService.openSnackBar(`Something went wrong, couldn\'t delete files.`);
    }
  }

  private prepareFormData(event: any) {
    const formData = new FormData();

    Array.from<File>(event.target.files).forEach(file => {
      formData.append('files', file, file.name);
    });

    return formData;
  }

  private fetchNodes(path: string) {
    this.dataSpaceService.getNodes(this.username, path).subscribe(result => {
      this.node = result.node;
      console.log(result.node);
      console.log(result.childNodes);
      this.childNodes = result.childNodes;
      this.displayBack = this.node.path !== '';

    }, console.warn);
  }
}
