import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private static PROFILE_ENDPOINT = 'http://localhost:8089/api/profile/';

  constructor(private httpClient: HttpClient) {
  }

  public getProfile(username: string): Observable<any> {
    return this.httpClient.get(ProfileService.PROFILE_ENDPOINT + username);
  }
}
