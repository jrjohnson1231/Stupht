import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm }    from '@angular/forms';

import { Post } from '../models/post';
import { User } from '../models/user';

import { PostService } from '../services/post.service';

import './forms.scss';
 
@Component({
  selector: 'stft-new-post-form',
  templateUrl: 'new-post-form.component.html'
})

export class NewPostFormComponent implements OnInit {
  @Input()
  user: User;
  @Input('post')
  original: Post;

  @Output()
  onFinished = new EventEmitter<boolean>();
  
  post: Post;
  error: Error;

  constructor(
    private postService: PostService
    ) { }

  ngOnInit() {
    this.post = new Post;
    if (this.original) {
      for (let key in this.original) {
        this.post[key] = this.original[key];
      }
    }
    this.post.user_id = this.user.id;
  }

  onSubmit() {
    for (let key in this.post) {
      if (!this.post[key] && key != 'id') { 
        console.log(key);
        this.error = new Error("Woops! Don't leave anything blank!")
        return;
      }
    }
    this.error = null;

    this.postService.save(this.post).subscribe(
      data => { this.onFinished.emit(data); this.post = new Post },
      errors => console.log(errors)
      );
  } 

  onCancel() {
    this.onFinished.emit(null);
    this.post = new Post;
    this.error = null;
  }
  
}