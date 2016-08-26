import { Component, OnInit }  from '@angular/core';

import { AuthService }        from './services/auth.service';
import { UserService }        from './services/user.service';
import { PostService }        from './services/post.service';

import { LoginFormComponent } from './authentication/login-form.component';
import { SignupFormComponent } from './authentication/signup-form.component';
import { NavbarComponent }    from './navigation/navbar.component';

// Add the RxJS Observable operators we need in this app.
import './rxjs-operators';

@Component({
  selector: 'stft-app',
  template: `
  <stft-navbar></stft-navbar>
  <router-outlet></router-outlet>
  `
})

export class AppComponent implements OnInit {
  constructor (private authService: AuthService) { }

  ngOnInit() {
    this.authService.getToken();

    // If there is a user renew their token
    if (this.authService.currentUser) {
      this.authService.renew();
    }
  }
}