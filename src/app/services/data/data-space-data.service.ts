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
      if (event.event === 'DeleteDirectoryMetadataSuccess' || event.event === 'DeleteFileMetadataSuccess') {
        this.nodes = this.nodes
          .filter(node => node.path + '/' + node.name !== event.data);
      } else if (event.event === 'DeleteMultipleNodesMetadataSuccess') {
        const deletedItemPaths = (event.data as DataSpaceNodeModel[]).map(item => item.path + '/' + item.name);
        this.nodes = this.nodes
          .filter(node => deletedItemPaths.indexOf(node.path + '/' + node.name) === -1);
      } else {
        const data = event.data.map(node => {
          node.ownerName = node.ownerFirstname + ' ' + node.ownerLastname;
          return node;
        });
        this.nodes = [...data, ...this.nodes];
      }
      this.fileMetaData$.next(new InternalEventModel('new-data', this.nodes));
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

  public deleteItems(items: DataSpaceNodeModel[]): Observable<any> {
    return this.dataSpaceRestService.deleteMultipleItems(items);
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
