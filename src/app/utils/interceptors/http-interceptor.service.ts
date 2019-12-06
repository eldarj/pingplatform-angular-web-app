import {tap} from 'rxjs/internal/operators/tap';
import {Observable} from 'rxjs';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(request).pipe(
      map((response: any) => {
        if (response.headers) {
          console.log('Header keys', response.headers.keys());
          console.log('Authorization: ', response.headers.get('authorization'));
        }
        return response;
      }),
    );
  }
}
