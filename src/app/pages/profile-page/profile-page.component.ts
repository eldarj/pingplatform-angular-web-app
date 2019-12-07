import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AccountModel} from '../../shared/models/data/account.model';
import {DateTimeUtils} from '../../utils/date-time.utils';
import {ProfileService} from '../../services/profile.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  public userAccount: any = null;
  public routeUsername: string;


  // old
  private username: string;
  public account: AccountModel;

  public get dateRegisteredHumanTimestamp() {
    return DateTimeUtils.formatISODate(this.account.dateRegistered);
  }

  public loadingCover = true;

  public get avatarStyles() {
    return {
      'background-image': 'url(\'' + this.account.avatarImageUrl + '\')'
    };
  }

  public get coverStyles() {
    return {
      'background-image': 'url(\'' + this.account.coverImageUrl + '\')'
    };
  }

  constructor(private route: ActivatedRoute, private profileService: ProfileService) {
    this.route.params.subscribe(params => {
      this.username = params.username;
      console.log(params);
    });
    if (history.state.data != null) {
      this.userAccount = history.state.data;
    } else {
      this.profileService.getProfile(this.username).subscribe(result => {
        console.log(result);
        this.userAccount = result;
      }, console.log);
    }

    console.log(this.userAccount);
  }

  ngOnInit(): void {
    this.setFakeData();
  }

  private setFakeData() {
    const account = new AccountModel();
    account.avatarImageUrl =
      'https://img.freepik.com/free-vector/abstract-dynamic-pattern-wallpaper-vector_53876-59131.jpg?size=338&ext=jpg';
    account.callingCountryCode = 1;
    account.contacts = [
      {
        accountId: 0,
        avatarImageUrl: 'https://img.freepik.com/free-vector/abstract-dynamic-pattern-wallpaper-vector_53876-59131.jpg?size=338&ext=jpg',
        callingCountryCode: 0,
        contactAccountId: 17,
        contactCallingCountryCode: 0,
        contactName: 'mama',
        contactPhoneNumber: '62154973',
        coverImageUrl: null,
        dateAdded: '2019-07-26T22:43:40.256822',
        messages: null,
        isFavorite: false,
        phoneNumber: null
      }
    ];
    account.coverImageUrl = 'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__340.jpg';
    account.createSession = true;
    account.dateRegistered = '2019-06-23T20:42:06.352837';
    account.email = null;
    account.firstname = 'Eldar';
    account.lastname = 'Jahijagic';
    account.id = 0;
    account.phoneNumber = '62005152';
    account.token = '';

    this.account = account;
  }
}
