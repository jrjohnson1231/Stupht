import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { UserService } from '../services/user.service';

      
@Component({
  selector: 'stft-user-profile',
  templateUrl: 'user-profile.component.html'
})
export class UserProfileComponent implements OnInit {
  user: Object
  
  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.userService.getUser(this.route.params['user_id']).subscribe(
      data => this.user = data,
      errors => console.log(errors)
     )
  }

  
}