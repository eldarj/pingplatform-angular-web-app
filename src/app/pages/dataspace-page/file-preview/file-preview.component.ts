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
  previewObjectUrl = null;
  displaySelf = false;
  loading = true;

  username: string;

  constructor(private dataSpaceService: DataSpaceService,
              private snackbarService: SnackbarService,
              private domSanitizer: DomSanitizer,
              private route: ActivatedRoute) {
    this.username = route.snapshot.paramMap.get('username');
  }

  display(node: any) {
    this.displaySelf = true;
    this.loading = true;

    if (node.fileObjectUrl !== null && node.fileObjectUrl !== undefined) {
      this.setObjectUrl(node.fileObjectUrl);
    } else {
      // TODO: Remove timeout in production
      setTimeout(() => {
        this.dataSpaceService.getFile(this.username, PathUtils.getNodePathToParent(node), node.name).subscribe(response => {
          const responseFileObjectUrl = URL.createObjectURL(new Blob([response]));
          node.fileObjectUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(responseFileObjectUrl);
          this.setObjectUrl(node.fileObjectUrl);

        }, error => {
          console.log(error);
          this.snackbarService.openSnackBar(`Couldn\'t load ${node.name}, please try again or contact PING Support.`);
        });
      }, 2000);
    }
  }

  private setObjectUrl(fileObjectUrl: any) {
    this.previewObjectUrl = fileObjectUrl;
    this.loading = false;
  }
}
