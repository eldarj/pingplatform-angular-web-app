import {Observable, throwError} from 'rxjs';
import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, map} from 'rxjs/operators';
import {AuthenticationService} from '../../services/authentication.service';
import {SnackbarService} from '../../services/snackbar.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService,
              private snackbarService: SnackbarService) {
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
      catchError((error: HttpErrorResponse) => {
        console.warn(error);
        if (!!error.error.reason) {
          this.snackbarService.openSnackBar(error.error.reason);
        } else {
          this.snackbarService.openSnackBar('Something went wrong, please try again or contact PING Support.');
        }
        return throwError(error);
      })
    );
  }
}
