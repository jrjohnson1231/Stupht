import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';

import { User } from '../models/user';

@Component({
  selector: 'stft-user-list',
  templateUrl: 'user-list.component.html'
})
export class UserListComponent implements OnInit {
  users: User[];

  constructor(
    private userService: UserService,
    private postService: PostService
    ) { }

  ngOnInit() {
    this.userService.getAll().subscribe(
      data => this.users = data,
      errors => console.log(errors)
      );
  }

  follow(user: User) {
    alert('This will be added soon!')
  }
}