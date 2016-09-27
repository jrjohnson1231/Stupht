import { Routes, RouterModule }        from '@angular/router';
import { UserProfileComponent }        from './user-profile.component';
import { UserListComponent }           from './user-list.component';

export const userRoutes: Routes = [
  { path: 'users/:user_id', component: UserProfileComponent },
  { path: 'users', component: UserListComponent }
];