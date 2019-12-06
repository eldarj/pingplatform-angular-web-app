import {Component, OnInit} from '@angular/core';
import {FacebookService, InitParams, LoginResponse} from 'ngx-facebook';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private fb: FacebookService) {
    const initParams: InitParams = {
      appId: '1689362134700740',
      cookie: true,
      xfbml: true,
      version: 'v2.8',
    };

    fb.init(initParams);

    const loginStatus = this.fb.getLoginStatus();
    console.log(loginStatus);
  }

  ngOnInit() {
    this.fb.login({scope: 'email'})
      .then((response: LoginResponse) => this.handleLogin(response))
      .catch(e => console.error('Error logging in'));
  }


  handleLogin(response) {
    console.log('Logged in', response);

    this.fbparam('email,name');
    this.fbcall('permissions');
    this.fbcall('photos');

    this.fb.api('me')
          .then(console.log)
          .catch(error => {
            console.error('User cancelled login or did not fully authorize.', error);
          });

  }
  fbparam(edge: string) {
    this.fb.api('me?fields=' + edge)
      .then(console.log)
      .catch(console.error);
  }

  fbcall(edge: string) {
    this.fb.api('me/' + edge)
      .then(console.log)
      .catch(console.error);
  }
}
