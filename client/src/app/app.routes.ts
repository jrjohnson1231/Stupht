import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { PageNotFoundComponent } from './not-found.component';
import { authenticationRoutes }  from './authentication/authentication.routes'
import { userRoutes }            from './user/user.routes'
import { chatRoutes }            from './chat/chat.routes'

import { HomeComponent }         from './home/home.component' 


export const appRoutes = [
  ...authenticationRoutes,
  ...userRoutes,
  ...chatRoutes,
  { path: '', component: HomeComponent},
  { path: '**', component: PageNotFoundComponent }
];

export const appRoutingProviders: any[] = [
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);


