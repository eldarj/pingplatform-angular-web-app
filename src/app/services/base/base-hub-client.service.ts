import {HubConnection, HubConnectionBuilder} from '@microsoft/signalr';
import {HubClientServiceInterface} from './hub-client-service.interface';
import {OnDestroy} from '@angular/core';

export class BaseHubClientService implements HubClientServiceInterface, OnDestroy {
  private hubConnection: HubConnection;

  get hubClient() {
    return this.hubConnection;
  }

  constructor(private hubEndpoint: string) {
    this.doHubClientConnect();
    this.doRegisterHubClientHandlers();
  }

  doHubClientConnect() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:44380/' + this.hubEndpoint)
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
