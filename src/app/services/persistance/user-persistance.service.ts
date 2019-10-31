import {Injectable} from '@angular/core';
import {AccountModel} from '../../shared/models/data/account.model';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserPersistanceService {
  private static USER_TOKEN_KEY = 'USER_TOKEN_KEY';
  constructor(private cookieService: CookieService) {
  }

  public getSessionToken() {
    return this.cookieService.get(UserPersistanceService.USER_TOKEN_KEY);
  }

  public setSessionToken(token: string) {
    this.cookieService.set(UserPersistanceService.USER_TOKEN_KEY, token, 7);
  }

  public deleteSession(token: string) {
    this.cookieService.delete(UserPersistanceService.USER_TOKEN_KEY, token);
  }
}
