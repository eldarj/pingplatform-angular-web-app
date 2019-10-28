import {HubConnection, HubConnectionBuilder} from '@microsoft/signalr';

export class BaseHubClientService {
  private hubConnection: HubConnection;

  get hubClient() {
    return this.hubConnection;
  }

  constructor(private hubEndpoint: string) {
    this.connect();
    this.registerHandlers();
  }

  connect() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:44380/' + this.hubEndpoint)
      .build();

    this.hubConnection
      .start()
      .then(() => this.onConnected())
      .catch(error => this.onError(error));
  }

  onConnected() {
  }

  onError(error: any) {
    console.log('Cant connect to server.', error);
  }

  registerHandlers() {
  }
}
