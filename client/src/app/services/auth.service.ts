import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import { AuthHttp, JwtHelper } from 'angular2-jwt'
import { Headers, RequestOptions } from '@angular/http';

import { Observable }     from 'rxjs/Observable';

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

  getToken() {
    this.authToken = localStorage.getItem('id_token');
    this.setUser();
  }

  login(credentials: any): Observable<any> {
    let body = JSON.stringify(credentials)
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let observable = this.http.post(this.loginUrl, body, options).share()
                      .map(this.extractData)
                      .catch(this.handleError)

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

  register(credentials: any): Observable<any> {
    let body = JSON.stringify(credentials)
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let observable = this.http.post(this.registerUrl, body, options).share()
                       .map(this.extractData)
                       .catch(this.handleError)

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

  confirm() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.authHttp.get(this.confirmUrl, options)
    .subscribe(
      data => console.log(data.json()),
      error => console.log(error)
      );
  }

  logout() {
    localStorage.removeItem('id_token');
    this.currentUser = null;
    this.authToken = null;
  }

  private extractData(res: Response) {
    return res.json();
  }

  private handleError(error: any) {
    return Observable.throw(error.json().error);
  }

  private setUser() {
    if (this.authToken) {
      this.currentUser = this.jwtHelper.decodeToken(this.authToken);
    }
    console.log('Current user is', this.currentUser);
  }
}