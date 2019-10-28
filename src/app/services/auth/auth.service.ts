import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {BaseHubClientService} from '../base/base-hub-client.service';
import {CallingCode} from '../../shared/models/calling-code.model';
import {AccountModel} from '../../shared/models/account-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseHubClientService {
  private static HUB_ENDPOINT = 'authhub';

  public callingCodes = []; // use this on-pre initialize and on nav-changes
  public callingCode$ = new Subject<Array<CallingCode>>();

  public loggedInUser$ = new Subject<any>();

  public hasPreloadedData = false;
  public preloadedCallingCountryCode: number;
  public preloadedPhoneNumber: string;

  constructor() {
    super(AuthService.HUB_ENDPOINT);
  }

  private static onError(error: any) {
    console.error(`Error`, error);
  }

  doRegisterHubClientHandlers(): void {
    super.hubClient.on(`ResponseCallingCodes124`, result => {
      this.callingCodes = result;
      this.callingCode$.next(result);
    });
    super.hubClient.on('AuthenticationDone124', result => {
      this.loggedInUser$.next(result);
    });
    super.hubClient.on('AuthenticationFailed124', result => {
      this.loggedInUser$.next(result);
    });
    super.hubClient.on('RegistrationDone124', result => {
      this.loggedInUser$.next(result);
    });
    super.hubClient.on('RegistrationFailed124', result => {
      this.loggedInUser$.next(result);
    });
  }

  register(
    phoneNumber: string,
    callingCountryCode: number,
    email: string,
    firstname: string,
    lastname: string
  ): void {
    const accountRequest = new AccountModel();
    accountRequest.phoneNumber = phoneNumber;
    accountRequest.callingCountryCode = callingCountryCode;
    accountRequest.email = email;
    accountRequest.firstname = firstname;
    accountRequest.lastname = lastname;

    super.hubClient
      .invoke('RequestRegistration', '124', accountRequest)
      .catch(AuthService.onError);
  }

  login(phoneNumber: string, callingCountryCode: number): void {
    const accountRequest = new AccountModel();
    accountRequest.phoneNumber = phoneNumber;
    accountRequest.callingCountryCode = callingCountryCode;

    setTimeout(() => {
      super.hubClient
        .invoke('RequestAuthentication', '124', accountRequest)
        .catch(AuthService.onError);
    }, 1000);
  }

  onHubClientConnected(): void {
    super.hubClient
      .invoke('RequestCallingCodes', '124')
      .catch(AuthService.onError);
  }
}
