import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {CallingCodeModel} from '../../../shared/models/data/calling-code.model';
import {BaseHubClientService} from './base/base-hub-client.service';
import {UserPersistanceService} from '../../persistance/user-persistance.service';

@Injectable({
  providedIn: 'root'
})
export class AuthHubClientService extends BaseHubClientService {
  private static HUB_ENDPOINT = 'authhub';

  public callingCodes = []; // use this on-pre initialize and on nav-changes
  public callingCode$ = new Subject<CallingCodeModel[]>();

  public loggedInUser$ = new Subject<any>();

  public hasPreloadedData = false;
  public preloadedCallingCountryCode: number;
  public preloadedPhoneNumber: string;

  constructor(private userPersistanceService: UserPersistanceService) {
    super(AuthHubClientService.HUB_ENDPOINT);
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
      this.userPersistanceService.setSessionToken(result.content.token);
    });
    super.hubClient.on('AuthenticationFailed124', result => {
      this.loggedInUser$.next(result);
    });
    super.hubClient.on('RegistrationDone124', result => {
      this.loggedInUser$.next(result);
      this.userPersistanceService.setSessionToken(result.content.token);
    });
    super.hubClient.on('RegistrationFailed124', result => {
      this.loggedInUser$.next(result);
    });
  }

  register(phoneNumber: string, callingCountryCode: number, email: string, firstname: string, lastname: string): void {
    super.hubClient
      .invoke('RequestRegistration', '124', {
        phoneNumber,
        callingCountryCode,
        email,
        firstname,
        lastname
      })
      .catch(AuthHubClientService.onError);
  }

  login(phoneNumber: string, callingCountryCode: number): void {
    setTimeout(() => {
      super.hubClient
        .invoke('RequestAuthentication', '124', {phoneNumber, callingCountryCode})
        .catch(AuthHubClientService.onError);
    }, 1000);
  }

  onHubClientConnected(): void {
    super.hubClient
      .invoke('RequestCallingCodes', '124')
      .catch(AuthHubClientService.onError);
  }
}
