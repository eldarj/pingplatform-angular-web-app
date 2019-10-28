import {OnDestroy} from '@angular/core';

export declare interface HubClientServiceInterface {
  doHubClientConnect(): void;

  doRegisterHubClientHandlers(): void;

  onHubClientConnected(): void;

  onHubClientError(error: any): void;
}
