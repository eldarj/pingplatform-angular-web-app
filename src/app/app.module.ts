import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedComponentsModule} from './shared/components/shared-components.module';
import {CookieService} from 'ngx-cookie-service';
import {FacebookModule} from 'ngx-facebook';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpInterceptorService} from './utils/interceptors/http-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedComponentsModule,
    FacebookModule.forRoot()
  ],
  providers: [
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
