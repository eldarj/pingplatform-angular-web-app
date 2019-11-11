import {EventEmitter, Injectable} from '@angular/core';
import {DataSpaceNodeModel} from '../../shared/models/data/data-space-node.model';
import {Observable, Subject} from 'rxjs';
import {DataSpaceHubClientService} from '../api/signalr/data-space-hub-client.service';
import {DataSpaceRestService} from '../api/rest/data-space-rest.service';
import {InternalEventModel} from '../../shared/models/event/internal-event-model';
import {BreadcrumbManager} from '../helper/breadcrumb.manager';

@Injectable({
  providedIn: 'root'
})
export class DataSpaceDataService {
  public emitter: EventEmitter<string> = new EventEmitter();

  public fileMetaData$ = new Subject<InternalEventModel>();

  constructor(
    private dataSpaceHubClientService: DataSpaceHubClientService,
    private dataSpaceRestService: DataSpaceRestService,
    public breadcrumbManager: BreadcrumbManager
  ) {
    this.dataSpaceHubClientService.fileMetaData$.subscribe(event => {
      if (event.event === 'DeleteDirectoryMetadataSuccess' || event.event === 'DeleteFileMetadataSuccess') {
        const nodes = this.breadcrumbManager.getNodes()
          .filter(node => node.path + '/' + node.name !== event.data);
        this.breadcrumbManager.setNodes(nodes);
      } else if (event.event === 'DeleteMultipleNodesMetadataSuccess') {
        const deletedItemPaths = (event.data as DataSpaceNodeModel[]).map(item => item.path + '/' + item.name);
        const nodes = this.breadcrumbManager.getNodes()
          .filter(node => deletedItemPaths.indexOf(node.path + '/' + node.name) === -1);
        this.breadcrumbManager.setNodes(nodes);
      } else {
        this.breadcrumbManager.setNodes([...event.data, ...this.breadcrumbManager.getNodes()]);
      }
      this.fileMetaData$.next(new InternalEventModel('new-data', this.breadcrumbManager.getNodes()));
      this.emitter.emit(event.event);
    });
  }

  public getNodes(): DataSpaceNodeModel[] {
    return this.breadcrumbManager.getNodes();
  }

  public uploadFiles(formData: FormData): Observable<any> {
    this.emitter.emit('UploadFile');
    return this.dataSpaceRestService.uploadFiles(formData);
  }

  public loadFile(filePath): Observable<any> {
    return this.dataSpaceRestService.loadFile(filePath);
  }

  public createDirectory(directoryName: string): Observable<any> {
    this.emitter.emit('CreateDirectory');
    return this.dataSpaceRestService.createDirectory(directoryName, this.breadcrumbManager.getPath());
  }

  public openDirectory(item: DataSpaceNodeModel): void {
    this.fileMetaData$.next(new InternalEventModel('new-directory', item.nodes));
    this.breadcrumbManager.openDirectory(item);
  }

  public openBreadcrumb(directoryName: string): void {
    this.breadcrumbManager.openBreadcrumb(directoryName);
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
