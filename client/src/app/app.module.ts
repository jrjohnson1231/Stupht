import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { HTTP_PROVIDERS } from '@angular/http';
import { AUTH_PROVIDERS } from 'angular2-jwt';

import { AppComponent }  from './app.component';
import { routing, appRoutingProviders }  from './app.routes';

import { AuthService }   from './services/auth.service';
import { UserService }   from './services/user.service';
import { PostService }   from './services/post.service';

import { NavbarComponent }  from './navigation/navbar.component';

import { LoginFormComponent }  from './authentication/login-form.component';
import { SignupFormComponent } from './authentication/signup-form.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    routing
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginFormComponent,
    SignupFormComponent,
  ],
  providers: [
    appRoutingProviders,
    HTTP_PROVIDERS,
    AUTH_PROVIDERS,
    AuthService,
    PostService,
    UserService
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
