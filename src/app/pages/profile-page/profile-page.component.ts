import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProfileService} from '../../services/profile.service';
import {DefaultValuesUtils} from '../../utils/default-values.utils';
import {DataSpaceService} from '../../services/data-space.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {
  public userAccount: any = {};

  public coverSrc = DefaultValuesUtils.COVER_SRC;
  public profileSrc = DefaultValuesUtils.PROFILE_SRC;


  private username: string;

  constructor(private route: ActivatedRoute, private profileService: ProfileService, private dataSpaceService: DataSpaceService) {
    // TODO: Wait for route param sub to finish and then fetch data (display loader as well)
    this.route.params.subscribe(params => {
      this.username = params.username;
    });
    if (history.state.data != null) {
      this.userAccount = history.state.data;

    } else {
      this.profileService.getProfile(this.username).subscribe(result => {
        this.userAccount = result;
        if (this.userAccount.avatarPath) {
          this.profileSrc = 'http://localhost:8089/dataspace-static/' + this.userAccount.avatarPath;
        }
        if (this.userAccount.coverPath) {
          this.coverSrc = 'http://localhost:8089/dataspace-static/' + this.userAccount.coverPath;
        }
      }, console.log);
    }
  }

  coverUploadFileSelected(event: any) {
    this.profileService.uploadCoverImage(this.prepareFormData(event)).subscribe(result => {
      if (result.dataSpaceNode.path && result.dataSpaceNode.name) {
        this.coverSrc = 'http://localhost:8089/dataspace-static/' + result.dataSpaceNode.path + '/' + result.dataSpaceNode.name;
      }
    }, console.log);
  }

  public avatarUploadFileSelected(event: any) {
    this.profileService.uploadAvatarImage(this.prepareFormData(event)).subscribe(result => {
      if (result.dataSpaceNode.path && result.dataSpaceNode.name) {
        this.profileSrc = 'http://localhost:8089/dataspace-static/' + result.dataSpaceNode.path + '/' + result.dataSpaceNode.name;
      }
    }, console.log);
  }

  private prepareFormData(event: any) {
    const formData = new FormData();

    Array.from<File>(event.target.files).forEach(file => {
      formData.append('multipartFile', file, file.name);
    });

    return formData;
  }
}
