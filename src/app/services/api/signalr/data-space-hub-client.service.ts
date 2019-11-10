import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {DataSpaceNodeModel} from '../../../shared/models/data/data-space-node.model';
import {BaseHubClientService} from './base/base-hub-client.service';
import {UserPersistanceService} from '../../persistance/user-persistance.service';
import {InternalEventModel} from '../../../shared/models/event/internal-event-model';

/**
 * DataSpace signalr hub client service
 */
@Injectable({
  providedIn: 'root'
})
export class DataSpaceHubClientService extends BaseHubClientService {
  private static HUB_ENDPOINT = 'dataspacehub';

  public fileMetaData$ = new Subject<InternalEventModel>();

  constructor(private userPersistanceService: UserPersistanceService) {
    super(DataSpaceHubClientService.HUB_ENDPOINT, userPersistanceService.getSessionToken());
  }

  private static onError(error: any) {
    console.error(`Error`, error);
  }

  doRegisterHubClientHandlers(): void {
    super.hubClient.on(`RequestFilesMetaDataSuccess`, (result: { nodes: any[] }) => {
      this.fileMetaData$.next(new InternalEventModel ('RequestFilesMetaDataSuccess', result.nodes));
    });
    super.hubClient.on('SaveDirectoryMetadataSuccess', (result: DataSpaceNodeModel) => {
      this.fileMetaData$.next(new InternalEventModel ('SaveDirectoryMetadataSuccess', [result]));
    });
    super.hubClient.on('DeleteDirectoryMetadataSuccess', (oldDirectoryPath: string) => {
      this.fileMetaData$.next(new InternalEventModel('DeleteDirectoryMetadataSuccess', oldDirectoryPath));
    });

    super.hubClient.on('UploadFileSuccess', (result: DataSpaceNodeModel) => {
      this.fileMetaData$.next(new InternalEventModel('UploadFileSuccess', [result]));
    });

    super.hubClient.on('DeleteFileMetadataSuccess', (oldFilePath: string) => {
      this.fileMetaData$.next(new InternalEventModel('DeleteFileMetadataSuccess', oldFilePath));
    });

    super.hubClient.on('DeleteMultipleNodesMetadataSuccess', (oldItems: DataSpaceNodeModel[]) => {
      console.log(oldItems);
      this.fileMetaData$.next(new InternalEventModel('DeleteMultipleNodesMetadataSuccess', oldItems));
    });

    // super.hubClient.on('AuthenticationDone124', result => {
    //   this.loggedInUser$.next(result);
    //   this.userPersistanceService.setSessionToken(result.content.token);
    // });|
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
        .catch(DataSpaceHubClientService.onError);
    }, 1000);
  }

  onHubClientConnected(): void {
    this.requestFileMetaData();
  }

  public requestFileMetaData() {
    super.hubClient
      .invoke('RequestFilesMetaData')
      .catch(DataSpaceHubClientService.onError);
  }
}
