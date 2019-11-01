import {IHttpConnectionOptions} from '@microsoft/signalr';

export declare interface HubClientServiceInterface {
  doHubClientConnect(httpConnectionOptions: IHttpConnectionOptions): void;

  doRegisterHubClientHandlers(): void;

  onHubClientConnected(): void;

  onHubClientError(error: any): void;
}
