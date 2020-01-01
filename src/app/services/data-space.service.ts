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

  public getNodes(path: string): Observable<any> {
    return this.httpClient.get(DATA_SPACE_ENDPOINT + path);
  }
}
