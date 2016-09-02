import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http'
import { Headers, RequestOptions } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import { Observable }     from 'rxjs/Observable';

import { extractData, handleError } from '../helpers/response-helpers'

@Injectable()
export class UserService {
  baseUrl: string = '/api/v1/users'

  constructor(private authHttp: AuthHttp) { }

  getUser(user_id: string) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let getUrl = this.baseUrl + '/' + user_id;

    let thing = this.authHttp.get(getUrl, options)
      .map(extractData)
      .catch(handleError)

    return thing;
  }

}