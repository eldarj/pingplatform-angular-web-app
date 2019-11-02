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
  private static REST_ENDPOINT = 'dataspace/eldarja/directories/xxx';

  constructor(private httpClient: HttpClient) {
    super(DataSpaceRestService.REST_ENDPOINT);
  }

  public createDirectory(directoryName: string): Observable<any> {
    const dirRequest = { name: directoryName };
    return this.httpClient.post(this.url, dirRequest, {
      headers: {
        AppId: 'yxcyx',
        OwnerPhoneNumber: '61290611',
      },
      withCredentials: false
    });
  }
}
