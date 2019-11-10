import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseRestService} from './base/base-rest.service';
import {Observable} from 'rxjs';

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

  public createDirectory(directoryName: string): Observable<any> {
    const dirRequest = {name: directoryName};
    return this.httpClient.post(this.url + '/directories/', dirRequest, {
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
}
