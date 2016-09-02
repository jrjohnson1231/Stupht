import { Routes, RouterModule }        from '@angular/router';
import { UserProfileComponent }        from './user-profile.component';

export const userRoutes: Routes = [
  { path: 'users/:user_id', component: UserProfileComponent}
];