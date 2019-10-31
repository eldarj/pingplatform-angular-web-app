import {BaseHubClientService} from '../base/base-hub-client.service';
import {Injectable} from '@angular/core';
import {UserPersistanceService} from '../persistance/user-persistance.service';
import {Subject} from 'rxjs';
import {DataSpaceNodeModel} from '../../shared/models/data/data-space-node.model';

@Injectable({
  providedIn: 'root'
})
export class DataSpaceDataService extends BaseHubClientService {
  private static HUB_ENDPOINT = 'dataspacehub';

  public fileMetaData$ = new Subject<DataSpaceNodeModel[]>();

  constructor(private userPersistanceService: UserPersistanceService) {
    super(DataSpaceDataService.HUB_ENDPOINT, userPersistanceService.getSessionToken());
  }

  private static onError(error: any) {
    console.error(`Error`, error);
  }

  doRegisterHubClientHandlers(): void {
    super.hubClient.on(`RequestFilesMetaDataSuccess`, (result: {nodes: any[]}) => {
      this.fileMetaData$.next(result.nodes);
    });
    // super.hubClient.on('AuthenticationDone124', result => {
    //   this.loggedInUser$.next(result);
    //   this.userPersistanceService.setSessionToken(result.content.token);
    // });
    // super.hubClient.on('AuthenticationFailed124', result => {
    //   this.loggedInUser$.next(result);
    // });
    // super.hubClient.on('RegistrationDone124', result => {
    //   this.loggedInUser$.next(result);
    //   this.userPersistanceService.setSessionToken(result.content.token);
    // });
    // super.hubClient.on('RegistrationFailed124', result => {
    //   this.loggedInUser$.next(result);
    // });
  }

  login(phoneNumber: string, callingCountryCode: number): void {
    setTimeout(() => {
      super.hubClient
        .invoke('RequestAuthentication', '124', {phoneNumber, callingCountryCode})
        .catch(DataSpaceDataService.onError);
    }, 1000);
  }

  onHubClientConnected(): void {
    super.hubClient
      .invoke('RequestFilesMetaData')
      .catch(DataSpaceDataService.onError);
  }
}
