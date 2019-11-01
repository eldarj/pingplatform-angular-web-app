import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseRestService} from './base/base-rest.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSpaceRestService extends BaseRestService {
  private static REST_ENDPOINT = 'dataspace/eldarja/directories/xxx';

  constructor(private httpClient: HttpClient) {
    super(DataSpaceRestService.REST_ENDPOINT);
  }

  public post(): Observable {
    console.log('hello');
    console.log(this.url);
    return this.httpClient.post(this.url, {
      headers: {
        AppId: 'ycyxc',
        OwnerPhoneNumber: 62005152
      },
      withCredentials: false
    });
  }
}
