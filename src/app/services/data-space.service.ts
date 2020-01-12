import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {PathUtils} from '../utils/path.utils';

const DATA_SPACE_ENDPOINT = 'http://localhost:8089/api/data-space/';

@Injectable({
  providedIn: 'root'
})
export class DataSpaceService {

  constructor(private httpClient: HttpClient) {
  }

  public getFile(username: string, path: string, filename: string): Observable<any> {
    const params = new HttpParams()
      .set('filename', filename)
      .set('path', path);

    return this.httpClient.get(DATA_SPACE_ENDPOINT + username + '/file', {
      responseType: 'arraybuffer',
      params,
    });
  }

  public getNodes(username: string, path: string): Observable<any> {
    const params = new HttpParams()
      .set('path', path);

    return this.httpClient.get(DATA_SPACE_ENDPOINT + username, {params});
  }

  public createNewDirectory(username: string, path: string, name: string)/*: Observable<any>*/ {
    const newDirectory = {name, path, shared: false};

    return this.httpClient.post(DATA_SPACE_ENDPOINT + username + '/directory', newDirectory);
  }

  public uploadFile(username: string, path: string, formData: FormData): Observable<any> {
    const params = new HttpParams()
      .set('path', path);

    return this.httpClient.post(DATA_SPACE_ENDPOINT + username + '/files', formData, {params});
  }
}
