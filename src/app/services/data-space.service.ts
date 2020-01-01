import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

const DATA_SPACE_ENDPOINT = 'http://localhost:8089/api/data-space/';

@Injectable({
  providedIn: 'root'
})
export class DataSpaceService {

  constructor(private httpClient: HttpClient) {
  }

  public getNodes(username: string = null, path: string = null): Observable<any> {
    const endpointPath = username === null ? '' : path === null ? username : username + '/' + path;
    return this.httpClient.get(DATA_SPACE_ENDPOINT + endpointPath);
  }
}
