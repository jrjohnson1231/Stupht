"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var forms_1 = require('@angular/forms');
var app_component_1 = require('./app.component');
var app_routes_1 = require('./app.routes');
var http_1 = require('@angular/http');
var angular2_jwt_1 = require('angular2-jwt');
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
    app_routes_1.appRouterProviders,
    forms_1.disableDeprecatedForms(),
    forms_1.provideForms(),
    http_1.HTTP_PROVIDERS,
    angular2_jwt_1.AUTH_PROVIDERS,
])
    .catch(function (err) { return console.error(err); });

//# sourceMappingURL=main.js.map
