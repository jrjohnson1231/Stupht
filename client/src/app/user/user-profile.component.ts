import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { Observable, Subscription } from 'rxjs/Rx'

import { UserService } from '../services/user.service';


@Component({
  selector: 'stft-user-profile',
  templateUrl: 'user-profile.component.html'
})
export class UserProfileComponent implements OnInit, OnDestroy {
  user: Object;
  routeSub: Subscription;

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
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