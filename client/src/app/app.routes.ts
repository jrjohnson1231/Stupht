import { provideRouter, RouterConfig }  from '@angular/router';

import { PageNotFoundComponent } from './not-found.component';
import { AuthenticationRoutes }  from './authentication/authentication.routes'
import { HomeComponent }         from './home/home.component' 


export const routes: RouterConfig = [
  ...AuthenticationRoutes,
  { path: '', component: HomeComponent},
  { path: '**', component: PageNotFoundComponent }
];

export const appRouterProviders = [
  provideRouter(routes)
];

