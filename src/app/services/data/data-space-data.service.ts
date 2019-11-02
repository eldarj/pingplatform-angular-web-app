import {EventEmitter, Injectable} from '@angular/core';
import {DataSpaceNodeModel} from '../../shared/models/data/data-space-node.model';
import {Observable, Subject} from 'rxjs';
import {DataSpaceHubClientService} from '../api/signalr/data-space-hub-client.service';
import {DataSpaceRestService} from '../api/rest/data-space-rest.service';
import {InternalEventModel} from '../../shared/models/event/internal-event-model';

/**
 * Wrapper for data-space rest & signalr client services
 */
@Injectable({
  providedIn: 'root'
})
export class DataSpaceDataService {
  public emitter: EventEmitter<string> = new EventEmitter();
  private nodes: DataSpaceNodeModel[] = [];

  public fileMetaData$ = new Subject<InternalEventModel>();

  constructor(
    private dataSpaceHubClientService: DataSpaceHubClientService,
    private dataSpaceRestService: DataSpaceRestService
  ) {
    this.dataSpaceHubClientService.fileMetaData$.subscribe(event => {
      this.nodes = event.data;
      this.fileMetaData$.next(event);
      this.emitter.emit(event.event);
    });
  }

  public getNodes() {
    return this.nodes;
  }

  public createDirectory(directoryName): Observable<any> {
    this.emitter.emit('CreateDirectory');
    return this.dataSpaceRestService.createDirectory(directoryName);
  }

  public refreshFileMetaData() {
    this.dataSpaceHubClientService.requestFileMetaData();
  }
}
