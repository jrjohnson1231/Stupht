import { provideRouter, RouterConfig }  from '@angular/router';

import { PageNotFoundComponent } from './not-found.component';
import { authenticationRoutes } from './authentication/authentication.routes'


export const routes: RouterConfig = [
  ...authenticationRoutes,
  { path: '**', component: PageNotFoundComponent }
];

export const appRouterProviders = [
  provideRouter(routes)
];

