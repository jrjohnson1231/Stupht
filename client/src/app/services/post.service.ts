import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';

import { extractData, handleError } from '../helpers/response-helpers';

import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Rx';

import { Post } from '../models/post';

@Injectable()
export class PostService {
  baseUrl = "api/v1/";

  constructor(
    private authHttp: AuthHttp
    ) { }

  save(post: Post): Observable<any> {
    if (post.id) {
      return this.update(post);
    } else {
      return this.create(post);
    }
  }

  deletePost(post: Post): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let deleteUrl = this.baseUrl + 'users/' + post.user_id + '/posts/' + post.id;

    return this.authHttp.delete(deleteUrl, options)
      .map(extractData)
      .catch(handleError)
  }

  private update(post: Post): Observable<any> {
    let body = JSON.stringify(post);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let putUrl = this.baseUrl + 'users/' + post.user_id + '/posts/' + post.id;

    return this.authHttp.put(putUrl, body, options)
      .map(extractData)
      .catch(handleError)
  }

  private create(post: Post): Observable<any> {
    let body = JSON.stringify(post);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let postUrl = this.baseUrl + 'users/' + post.user_id + '/posts';
    console.log('making new post')
    return this.authHttp.post(postUrl, body, options)
      .map(extractData)
      .catch(handleError)
  }
}