import {OnDestroy} from '@angular/core';

export declare interface HubClientServiceInterface extends OnDestroy {
  connect(): void;

  onConnected(): void;

  registerHandlers(): void;

  onError(error: any): void;
}
