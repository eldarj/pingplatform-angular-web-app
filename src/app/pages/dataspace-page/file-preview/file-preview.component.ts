import {Component} from '@angular/core';
import {DataSpaceService} from '../../../services/data-space.service';
import {PathUtils} from '../../../utils/path.utils';
import {SnackbarService} from '../../../services/snackbar.service';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-file-preview',
  templateUrl: './file-preview.component.html',
  styleUrls: ['./file-preview.component.scss']
})
export class FilePreviewComponent {
  node = null;
  displaySelf = false;
  loading = true;

  username: string;

  isImage = false;
  isAudio = false;
  isVideo = false;
  detailsHolderClassname = '';

  constructor(private dataSpaceService: DataSpaceService,
              private snackbarService: SnackbarService,
              private domSanitizer: DomSanitizer,
              private route: ActivatedRoute) {
    this.username = route.snapshot.paramMap.get('username');
  }

  display(node: any) {
    this.displaySelf = true;
    this.loading = true;
    this.node = node;

    this.resolveType();

    if (this.node.fileObjectUrl === null || this.node.fileObjectUrl === undefined) {
      // TODO: Remove timeout in production
      setTimeout(() => {
        this.dataSpaceService.getFile(this.username, PathUtils.getNodePathToParent(this.node), this.node.name).subscribe(response => {
          const responseFileObjectUrl = URL.createObjectURL(new Blob([response]));
          this.node.fileObjectUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(responseFileObjectUrl);
          this.loading = false;

        }, error => {
          console.warn(error);
          this.snackbarService.openSnackBar(`Couldn\'t load ${this.node.name}, please try again or contact PING Support.`);
        });
      }, 2000);
    } else {
      this.loading = false;
    }
  }

  delete() {
    this.dataSpaceService.deleteFile(this.username, PathUtils.getNodePathToParent(this.node), this.node.name).subscribe(response => {
      console.log(response);
      let responseMsg = '';
      if (response.nodes.length > 1) {
        responseMsg = `${response.nodes.length} files`;
      } else {
        responseMsg = response.nodes[0].name;
      }
      this.snackbarService.openSnackBar(`Successfully deleted ${responseMsg}.`);

    }, error => {
      console.warn(error);
      this.snackbarService.openSnackBar(`Something went wrong, couldn\'t delete files.`);
    });
  }

  private resolveType() {
    this.isImage = this.node.mimeType.includes('image');
    this.isAudio = this.node.mimeType.includes('audio');
    this.isVideo = this.node.mimeType.includes('video');
    this.detailsHolderClassname = this.isImage ? 'image-details' : this.isAudio ? 'audio-details' : 'video-details';
  }
}
