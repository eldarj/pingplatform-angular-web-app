import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AccountModel} from '../../shared/models/data/account.model';
import {DateTimeUtils} from '../../utils/date-time.utils';
import {ProfileService} from '../../services/profile.service';
import {DefaultValuesUtils} from '../../utils/default-values.utils';
import {DataSpaceService} from '../../services/data-space.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  public userAccount: any = {};
  public routeUsername: string;

  public profileSrc = DefaultValuesUtils.PROFILE_SRC;
  public coverSrc = DefaultValuesUtils.COVER_SRC;


  // old
  private username: string;
  public account: AccountModel;

  public get dateRegisteredHumanTimestamp() {
    return DateTimeUtils.formatISODate(this.account.dateRegistered);
  }

  public loadingCover = true;

  constructor(private route: ActivatedRoute, private profileService: ProfileService, private dataSpaceService: DataSpaceService) {
    console.log('PROFILE PAGE');
    this.route.params.subscribe(params => {
      console.log('PARAMS', params.username);
      this.username = params.username;
    });
    if (history.state.data != null) {
      this.userAccount = history.state.data;
    } else {
      this.profileService.getProfile(this.username).subscribe(result => {
        console.log('POFILE SERVICE');
        console.log(result);
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

  ngOnInit(): void {
  }

  public coverUploadFileSelected(event: any) {
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
