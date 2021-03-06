import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

const PROFILE_ENDPOINT = 'http://localhost:8089/api/profile/';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpClient: HttpClient) {
  }

  public getProfile(username: string): Observable<any> {
    return this.httpClient.get(PROFILE_ENDPOINT + username);
  }

  public uploadAvatarImage(formData: FormData): Observable<any> {
    return this.httpClient.post(PROFILE_ENDPOINT + 'eldarja/avatars', formData);
  }

  public uploadCoverImage(formData: FormData): Observable<any> {
    return this.httpClient.post(PROFILE_ENDPOINT + 'eldarja/covers', formData);
  }
}
