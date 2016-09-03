import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';

import { extractData, handleError } from '../helpers/response-helpers';

import { AuthHttp } from 'angular2-jwt';

import { Post } from '../models/post';

@Injectable()
export class PostService {
  baseUrl = "/api/v1/";

  constructor(
    private authHttp: AuthHttp
    ) { }

  save(post: Post) {
    if (post.id) {
      this.update(post);
    } else {
      this.create(post);
    }
  }

  private update(post: Post) {
    let body = JSON.stringify(post);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let putUrl = this.baseUrl + post.user_id + '/posts/' + post.id;

    return this.authHttp.put(putUrl, body, options)
      .map(extractData)
      .catch(handleError)
  }

  private create(post: Post) {
    let body = JSON.stringify(post);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let postUrl = this.baseUrl + post.user_id + '/posts';

    return this.authHttp.post(postUrl, body, options)
      .map(extractData)
      .catch(handleError)
  }
}