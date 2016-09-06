import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { Observable, Subscription } from 'rxjs/Rx'

import { AuthService } from '../services/auth.service';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';

import { NewPostFormComponent } from '../forms/new-post-form.component';

import { User } from '../models/user';
import { Post } from '../models/post';


@Component({
  selector: 'stft-user-profile',
  templateUrl: 'user-profile.component.html',
  directives: [NewPostFormComponent]
})
export class UserProfileComponent implements OnInit, OnDestroy {
  user: User;
  routeSub: Subscription;
  editable: boolean;
  editing: string;


  constructor(
    private userService: UserService,
    private postService: PostService,
    private route: ActivatedRoute,
    private authService: AuthService
    ) { }

  deletePost(post: Post) {
    let index = this.user.posts.indexOf(post);
    this.postService.deletePost(post).subscribe(
      data => this.user.posts.splice(index, 1),
      errors => console.log(errors)
      );
  }

  editPost(post: Post) {
    this.editing = post.id;
  }

  ngOnInit() {
    this.editable = false;
    this.routeSub = this.route.params.subscribe(params => {
      this.userService.getUser(params['user_id']).subscribe(
        data => {
          this.user = data;
          this.editable = (this.user.id == this.authService.currentUser.id);
        },
        errors => console.log(errors)
        )
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe()
  }

  onAdded(post: Post) {
    if (post != null) {
      this.user.posts.push(post);
    }
  }

  onUpdated(post: Post) {
    let p = this.user.posts.find(p => {return p.id == post.id});
    if (p) {
      let index = this.user.posts.indexOf(p);
      this.user.posts[index] = post;
    }
    this.editing = null;
  }

  
}