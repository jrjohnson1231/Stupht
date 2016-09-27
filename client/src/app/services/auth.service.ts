import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import { AuthHttp, JwtHelper } from 'angular2-jwt'
import { Headers, RequestOptions } from '@angular/http';

import { Observable }     from 'rxjs/Observable';

import { extractData, handleError } from '../helpers/response-helpers'

/* Authentication Service
   Handles all login, logout, and registration
   Also handles current user and all JWT handling through localStorage
*/

@Injectable()
export class AuthService {
  constructor (private http: Http, private authHttp: AuthHttp) {}

  jwtHelper = new JwtHelper();

  currentUser: any = null;

  loginUrl: string = 'api/authenticate';
  registerUrl: string = 'api/register';
  confirmUrl: string = 'api/confirm'

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  // JWT used to authenticate requests
  authToken: string;

  // Get token from localStorage
  getToken() {
    this.authToken = localStorage.getItem('id_token');

    if (!this.authToken || this.jwtHelper.isTokenExpired(this.authToken)) {
      this.logout();
    } else {
      this.setUser();
    }
  }

  // Login and return observable as well as save JWT
  login(credentials: any): Observable<any> {
    let body = JSON.stringify(credentials)
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let observable = this.http.post(this.loginUrl, body, options).share()
                      .map(extractData)
                      .catch(handleError)

    observable.subscribe(
        data => {
          this.authToken = data.auth_token || '';
          localStorage.setItem('id_token', this.authToken)
          this.setUser();
        },
        error => { }
      )

    return observable
  }

  // Create new account and save JWT
  register(credentials: any): Observable<any> {
    let body = JSON.stringify(credentials)
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let observable = this.http.post(this.registerUrl, body, options).share()
                       .map(extractData)
                       .catch(handleError)

    observable.subscribe(
        data => {
          this.authToken = data.auth_token || '';
          localStorage.setItem('id_token', this.authToken)
          this.setUser();
        },
        error => { }
      )

    return observable
  }

  renew() {}

  // Helper api endpoint to confirm that JWT is valid
  confirm() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.authHttp.get(this.confirmUrl, options)
    .subscribe(
      data => console.log(data.json()),
      error => console.log(error)
      );
  }

  // Logout and remove JWT from localStorage
  logout() {
    localStorage.removeItem('id_token');
    this.currentUser = null;
    this.authToken = null;
  }

  // Set current user base on JWT
  private setUser() {
    if (this.authToken) {
      this.currentUser = this.jwtHelper.decodeToken(this.authToken);
    }
    console.log('Current user is', this.currentUser);
  }
}