import { bootstrap }    from '@angular/platform-browser-dynamic';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { AppComponent } from './app.component';
import { appRouterProviders } from './app.routes';
import { HTTP_PROVIDERS } from '@angular/http';
import { AUTH_PROVIDERS } from 'angular2-jwt';

bootstrap(AppComponent, [
  appRouterProviders,
  disableDeprecatedForms(),
  provideForms(),
  HTTP_PROVIDERS,
  AUTH_PROVIDERS,
])
.catch((err: any) => console.error(err));