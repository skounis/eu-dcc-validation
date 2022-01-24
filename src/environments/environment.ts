// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MockDataInterceptor } from '../interceptors/mock-data.interceptor';

export const environment = {
  production: false,
  api: {
    base: 'https://some-domain.com/'
  },
  github: {
    endpoint: 'https://api.github.com/repos/eu-digital-green-certificates/dcc-quality-assurance/git/trees/main?recursive=1',
    // Enable basic authentication for GitHub
    // Increases the API calls limit
    // https://github.com/settings/tokens
    authenticate: true,
    user: 'USERNAME',
    token: 'PERSONAL_ACCESS_TOKEN'
  },
  providers: [
    // Provider for mock data
    { provide: HTTP_INTERCEPTORS, useClass: MockDataInterceptor, multi: true }
  ]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
