import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { Observable, Subscription } from 'rxjs/Rx'

import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

import { NewPostFormComponent } from '../forms/new-post-form.component';


@Component({
  selector: 'stft-user-profile',
  templateUrl: 'user-profile.component.html',
  directives: [NewPostFormComponent]
})
export class UserProfileComponent implements OnInit, OnDestroy {
  user: Object;
  routeSub: Subscription;
  editable: boolean = false;


  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.editable = (params['user_id'] == this.authService.currentUser.id);
      this.userService.getUser(params['user_id']).subscribe(
        data => {this.user = data; console.log(data)},
        errors => console.log(errors)
        )
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe()
  }

  
}