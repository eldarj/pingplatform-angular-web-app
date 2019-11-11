import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseRestService} from './base/base-rest.service';
import {Observable} from 'rxjs';
import {DataSpaceNodeModel} from '../../../shared/models/data/data-space-node.model';

/**
 * DataSpace rest api client service
 */
@Injectable({
  providedIn: 'root'
})
export class DataSpaceRestService extends BaseRestService {
  private static REST_ENDPOINT = 'dataspace/eldarja';

  constructor(private httpClient: HttpClient) {
    super(DataSpaceRestService.REST_ENDPOINT);
  }

  public loadFile(fileName: string): Observable<any> {
    return this.httpClient.get(this.url + '/files/' + fileName,
      {
        responseType: 'arraybuffer'
      });
  }

  public uploadFiles(formData: FormData) {
    return this.httpClient.post(this.url + '/files', formData, {
      headers: {
        AppId: 'yxcyx',
        OwnerPhoneNumber: '61290611'
      },
      withCredentials: false
    });
  }

  public createDirectory(directoryName: string, pathToDirectory: string): Observable<any> {
    const dirRequest = { name: directoryName, path: pathToDirectory };
    return this.httpClient.post(this.url + '/directories', dirRequest, {
      headers: {
        AppId: 'yxcyx',
        OwnerPhoneNumber: '61290611'
      },
      withCredentials: false
    });
  }

  public deleteDirectory(directoryName: string): Observable<any> {
    return this.httpClient.delete(this.url + '/directories/' + directoryName, {
      headers: {
        AppId: 'yxcyx',
        OwnerPhoneNumber: '61290611'
      },
      withCredentials: false
    });
  }

  public deleteFile(fileName: string): Observable<any> {
    return this.httpClient.delete(this.url + '/files/' + fileName, {
      headers: {
        AppId: 'yxcyx',
        OwnerPhoneNumber: '61290611'
      },
      withCredentials: false
    });
  }

  public deleteMultipleItems(items: DataSpaceNodeModel[]): Observable<any> {
    const itemsToDelete = items.map(node => {
      return {name: node.name, path: node.path, nodeType: node.nodeType};
    });

    return this.httpClient.post(this.url + '/delete-multiple', itemsToDelete, {
      headers: {
        AppId: 'yxcyx',
        OwnerPhoneNumber: '61290611'
      },
      withCredentials: false
    });
  }
}
