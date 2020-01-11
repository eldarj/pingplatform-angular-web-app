import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataSpaceService} from '../../services/data-space.service';
import {Location} from '@angular/common';
import {AuthenticationService} from '../../services/authentication.service';
import {SnackbarService} from '../../services/snackbar.service';
import {MatDialog} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-dataspace-page',
  templateUrl: './dataspace-page.component.html',
  styleUrls: ['./dataspace-page.component.scss']
})
export class DataspacePageComponent {
  username: string;

  node: any = {};
  childNodes: any[];

  fileLoading = false;
  previewObjectUrl = null;
  displayBack = false;
  directoryInputValue = '';

  constructor(private dialog: MatDialog,
              private domSanitizer: DomSanitizer,
              private location: Location, private route: ActivatedRoute,
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

  get filePreviewSrc() {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(this.previewObjectUrl);
  }

  back() {
    this.getNodes(this.node.parentNode);
  }

  uploadFileSelected(event: any) {
    this.dataSpaceService.uploadFile(this.username, this.getPath(this.node), this.prepareFormData(event)).subscribe(result => {
      console.log(result);
      this.childNodes.push(result.node);
      this.snackbarService.openSnackBar('Successfully uploaded file.');
    }, console.log);
  }

  getNodes(node: any) {
    this.location.go('/dataspace/' + this.getPath(node));
    this.fetchNodes(this.getPath(node));
  }

  getFile(node: any) {
    this.fileLoading = true;
    this.dataSpaceService.getFile(this.username, this.getPath(this.node), node.name).subscribe(response => {
      setTimeout(
        () => {
          node.fileObjectUrl = URL.createObjectURL(new Blob([response]));
          this.previewObjectUrl = node.fileObjectUrl;
          this.fileLoading = false;
        },
        1000
      );
    }, error => {
      this.snackbarService.openSnackBar(`Couldn\'t load ${node.name}, please try again or contact PING Support.`);
    });
  }

  createDirectory() {
    this.dataSpaceService.createNewDirectory(this.username, this.getPath(this.node), this.directoryInputValue)
      .subscribe((result: { node }) => {
        this.childNodes.push(result.node);
        this.snackbarService.openSnackBar('Successfully created new directory.');
      }, console.log);
  }

  private getPath(node: any) {
    let path = '';
    if (node.path !== '') {
      path += node.path + '/';
    }
    path += node.name;
    return path;
  }

  private prepareFormData(event: any) {
    const formData = new FormData();

    Array.from<File>(event.target.files).forEach(file => {
      formData.append('multipartFile', file, file.name);
    });

    return formData;
  }

  private fetchNodes(path: string) {
    this.dataSpaceService.getNodes(this.username, path).subscribe(result => {
      this.node = result.node;
      this.childNodes = result.childNodes;
      this.displayBack = this.node.path !== '';

    }, console.log);
  }
}
