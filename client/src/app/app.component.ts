import { Component, OnInit }  from '@angular/core';

import { AuthService }        from './services/auth.service';
import { UserService }        from './services/user.service';
import { PostService }        from './services/post.service';
import { Cable }              from './common/cable';

import { LoginFormComponent } from './authentication/login-form.component';
import { SignupFormComponent } from './authentication/signup-form.component';
import { NavbarComponent }    from './navigation/navbar.component';

import {Observable, Subject} from 'rxjs/Rx';

// Add the RxJS Observable operators we need in this app.
import './rxjs-operators';

@Component({
  selector: 'stft-app',
  template: `
  <stft-navbar></stft-navbar>
  <router-outlet></router-outlet>
  `,
  directives: [NavbarComponent]
})

export class AppComponent implements OnInit {
  constructor (private authService: AuthService) { }

  subscription: any = {}

  ngOnInit() {
    this.authService.getToken();

    // If there is a user renew their token
    if (this.authService.currentUser) {
      this.authService.renew();
    }

    let cable = new Cable('ws://0.0.0.0:3000/api/v1/cable',
    {
      channel: "PostChannel",
      email: this.authService.currentUser.email,
      id_token: this.authService.authToken
    })

    let stream = cable.subscribe(
      data => console.log(data),
      errors => console.log(errors)
    )
  }
}