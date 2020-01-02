import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';

const DATA_SPACE_ENDPOINT = 'http://localhost:8089/api/data-space/';

@Injectable({
  providedIn: 'root'
})
export class DataSpaceService {

  constructor(private httpClient: HttpClient) {
  }

  public getNodes(username: string, path: string): Observable<any> {
    const params = new HttpParams()
      .set('path', path);

    console.log(username);
    console.log(params);
    return this.httpClient.get(DATA_SPACE_ENDPOINT + username, {params});
  }

  public createNewDirectory(username: string, directoryPath: string, directoryName: string)/*: Observable<any>*/ {
    const newDirectory = {
      name: directoryName,
      path: directoryPath,
      shared: false
    };

    return this.httpClient.post(DATA_SPACE_ENDPOINT + username + '/directory', newDirectory);
  }
}
