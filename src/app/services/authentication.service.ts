import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private static TOKEN_CACHE_KEY = 'tokenCacheKey';
  private static AUTHENTICATION_ENDPOINT = 'http://localhost:8089/api/authenticate';

  private token: string = null;

  constructor(private cookieService: CookieService, private httpClient: HttpClient) {
  }

  public getToken() {
    if (this.token !== null) {
      return this.token;
    } else {
      return this.cookieService.get(AuthenticationService.TOKEN_CACHE_KEY);
    }
  }

  //
  // Authenticates user, and if successfully, stores token in cache
  //
  public authenticate(phoneNumber, password): Observable<any> {
    return this.httpClient.post(AuthenticationService.AUTHENTICATION_ENDPOINT,
      {phoneNumber, password},
      {observe: 'response'}
    ).pipe(map(
      (response: any) => {
        if (response.headers && response.headers.get('authorization') !== null) {
          const expiresInDays = 30;
          const token = response.headers.get('authorization').replace('Bearer ', '');
          this.cookieService.set(AuthenticationService.TOKEN_CACHE_KEY, token, expiresInDays);

          return {status: 200, data: JSON.parse(response.body.content)};
        }
      }
    ));
  }
}
