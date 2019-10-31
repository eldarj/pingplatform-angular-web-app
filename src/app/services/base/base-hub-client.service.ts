import {HubConnection, HubConnectionBuilder, IHttpConnectionOptions} from '@microsoft/signalr';
import {HubClientServiceInterface} from './hub-client-service.interface';
import {OnDestroy} from '@angular/core';

export class BaseHubClientService implements HubClientServiceInterface, OnDestroy {
  private hubConnection: HubConnection;

  get hubClient() {
    return this.hubConnection;
  }

  constructor(private hubEndpoint: string, private accessToken: string = '') {
    const httpConnectionOptions: IHttpConnectionOptions = !!accessToken ?
      {accessTokenFactory: () => accessToken} : {};

    this.doHubClientConnect(httpConnectionOptions);
    this.doRegisterHubClientHandlers();
  }

  doHubClientConnect(httpConnectionOptions: IHttpConnectionOptions) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:44380/' + this.hubEndpoint, httpConnectionOptions)
      .build();

    this.hubConnection
      .start()
      .then(() => this.onHubClientConnected())
      .catch(error => this.onHubClientError(error));
  }

  doRegisterHubClientHandlers() {
  }

  onHubClientConnected() {
  }

  onHubClientError(error: any) {
    console.log('Cant connect to server.', error);
  }

  ngOnDestroy(): void {
    this.hubConnection.stop();
  }
}
