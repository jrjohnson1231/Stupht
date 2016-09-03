import { Component, Input, OnInit } from '@angular/core';
import { NgForm }    from '@angular/forms';

import { Post } from '../models/post';
import { User } from '../models/user';

import { PostService } from '../services/post.service';
 
@Component({
  selector: 'stft-new-post-form',
  templateUrl: 'new-post-form.component.html'
})

export class NewPostFormComponent implements OnInit {
  @Input()
  user: User;
  
  post: Post;

  constructor(
    private postService: PostService
    ) { }

  ngOnInit() {
    this.post = new Post;
  }

  onSubmit() {
    this.postService.save(this.post);
  } 
  
}