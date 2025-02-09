import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {PreloadAllModules, provideRouter, withPreloading} from '@angular/router';

import {routes} from './app.routes';
import {provideAuth} from './core/auth/auth.provider';
import {provideHttpClient} from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}), provideRouter(routes, withPreloading(PreloadAllModules)),
    provideAuth(),
    provideHttpClient(),
  ]
};
