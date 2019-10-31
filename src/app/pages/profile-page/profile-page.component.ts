import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AccountModel} from '../../shared/models/data/account.model';
import {DateTimeUtils} from '../../utils/date-time.utils';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  private username: string;
  public account: AccountModel;

  public get dateRegisteredHuman() {
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

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.username = params.username);
  }

  ngOnInit(): void {
    const account = new AccountModel();
    account.avatarImageUrl = 'https://localhost:44380/users/avatars/62005152_68641834_1349232221893366_5220624664883101696_n_4763.jpg';
    account.callingCountryCode = 1;
    account.contacts = [
      {
        accountId: 0,
        avatarImageUrl: 'https://localhost:44380/users/avatars/62154973_download_6ea8.png',
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
    account.coverImageUrl = 'https://localhost:44380/users/covers/62005152_interstellar_holy_shit_shot.0_ee81.jpg';
    account.createSession = true;
    account.dateRegistered = '2019-06-23T20:42:06.352837';
    account.email = null;
    account.firstname = 'Eldar';
    account.lastname = 'Jahijagic';
    account.id = 0;
    account.phoneNumber = '62005152';
    account.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI2MjAwNTE1MiIsIm5iZiI6MTU3MjI5NTg0MywiZXhwIjoxNTcyOTAwNjQzLCJpYXQiOjE1NzIyOTU4NDN9.quUVK7-A94F70wNU2lnAlwgzJyESZsILePRhV8tXqnM';

    this.account = account;

    console.log(account);
  }

}
