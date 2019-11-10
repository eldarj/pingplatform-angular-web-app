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

  public getNodes(): DataSpaceNodeModel[] {
    return this.nodes;
  }

  public uploadFiles(formData: FormData): Observable<any> {
    this.emitter.emit('UploadFile');
    return this.dataSpaceRestService.uploadFiles(formData);
  }

  public loadFile(filePath): Observable<any> {
    return this.dataSpaceRestService.loadFile(filePath);
  }

  public createDirectory(directoryPath): Observable<any> {
    this.emitter.emit('CreateDirectory');
    return this.dataSpaceRestService.createDirectory(directoryPath);
  }

  public deleteItem(item: DataSpaceNodeModel): Observable<any> {
    if (item.nodeType === 'Directory') {
      this.emitter.emit('DeleteDirectory');
      return this.dataSpaceRestService.deleteDirectory(item.path + '/' + item.name);
    } else {
      this.emitter.emit('DeleteFile');
      return this.dataSpaceRestService.deleteFile(item.path + '/' + item.name);
    }
  }
}
