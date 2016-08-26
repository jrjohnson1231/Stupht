import { Routes, RouterModule }        from '@angular/router'
import { LoginFormComponent }  from './login-form.component'
import { SignupFormComponent } from './signup-form.component'

export const authenticationRoutes: Routes = [
  { path: 'login',  component: LoginFormComponent },
  { path: 'register', component: SignupFormComponent }
];