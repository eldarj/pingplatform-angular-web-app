import {tap} from 'rxjs/internal/operators/tap';
import {Observable} from 'rxjs';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {AuthenticationService} from '../../services/authentication.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authenticationService.getToken()}`
      }
    });

    return next.handle(request).pipe(
      map((response: any) => {
        if (response.headers) {
          console.log('Header keys', response.headers.keys());
          console.log('Authorization: ', response.headers.get('authorization'));
        }
        return response;
      }, console.error),
    );
  }
}
