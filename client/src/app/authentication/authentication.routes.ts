import { RouterConfig }        from '@angular/router'
import { LoginFormComponent }  from './login-form.component'
import { SignupFormComponent } from './signup-form.component'

export const AuthenticationRoutes: RouterConfig = [
  { path: 'login',  component: LoginFormComponent },
  { path: 'register', component: SignupFormComponent }
];