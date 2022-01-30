import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CacheDataInterceptor } from '../interceptors/cache.interceptor';

export const environment = {
  production: true,
  maxAge: 3.6e+6, // 1 hour
  api: {
    base: 'https://some-domain.com/'
  },
  static: {
    endpoint: 'https://raw.githubusercontent.com/eu-digital-green-certificates/dcc-quality-assurance/validation6/qa.json'
  },
  github: {
    acceptUserCredentials: false,
    endpoint: 'https://api.github.com/repos/eu-digital-green-certificates/dcc-quality-assurance/git/trees/validation6?recursive=1',
    // Enable basic authentication for GitHub
    // Increases the API calls limit
    // https://github.com/settings/tokens
    authenticate: false,
    user: 'fbcf454f29a701587efd',
    token: '86f7c6d2348f48c372f09129ea6cbddec8ad97ff'
  },
  providers: [
    // Provider for mock data
    { provide: HTTP_INTERCEPTORS, useClass: CacheDataInterceptor, multi: true }
  ]
};
